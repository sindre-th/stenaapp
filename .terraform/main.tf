# VPC Network og Subnet
resource "google_compute_network" "vpc_network" {
  name                    = "${var.service_name}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${var.service_name}-subnet"
  ip_cidr_range = "10.2.0.0/28"
  region        = var.region
  network       = google_compute_network.vpc_network.id
}

# Cloud SQL med privat IP
resource "google_sql_database_instance" "postgres" {
  name             = "${var.service_name}-postgres"
  database_version = "POSTGRES_16"
  region           = var.region

  settings {
    tier = "db-f1-micro"

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.vpc_network.id
    }
  }

  depends_on = [google_service_networking_connection.private_vpc_connection]
}

# Service Networking API
resource "google_project_service" "service_networking" {
  service = "servicenetworking.googleapis.com"
}

# Privat VPC-tilkobling
resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.vpc_network.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]

  depends_on = [google_project_service.service_networking]
}

# Reserver privat IP
resource "google_compute_global_address" "private_ip_address" {
  name          = "${var.service_name}-private-ip"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc_network.id
}

# PostgreSQL-database og bruker
resource "google_sql_database" "database" {
  name     = "${var.service_name}_db"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "user" {
  name     = var.db_user
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}

# VPC-connector for Cloud Run
resource "google_vpc_access_connector" "connector" {
  name          = "${var.service_name}-connector"
  region        = var.region
  ip_cidr_range = "10.8.0.0/28"
  network       = google_compute_network.vpc_network.name
}

# Cloud Run-tjeneste med VPC-connector
resource "google_cloud_run_v2_service" "default" {
  name     = var.service_name
  location = var.region

  template {
    containers {
      image = var.image_url

      env {
        name  = "DB_HOST"
        value = google_sql_database_instance.postgres.private_ip_address
      }
      env {
        name  = "DB_NAME"
        value = google_sql_database.database.name
      }
      env {
        name  = "DB_USER"
        value = google_sql_user.user.name
      }
      env {
        name  = "DB_PASSWORD"
        value = google_sql_user.user.password
      }
    }

    vpc_access {
      connector = google_vpc_access_connector.connector.id
      egress    = "ALL_TRAFFIC"
    }
  }

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}