resource "google_project_service" "project_services" {
  for_each                   = var.project_services
  service                    = each.value
  disable_dependent_services = true
}

resource "google_artifact_registry_repository" "docker-repo" {
  depends_on    = [google_project_service.project_services]
  location      = var.region
  repository_id = var.artifact_repository_id
  description   = "Docker Image Repository"
  format        = "DOCKER"
  cleanup_policies {
    id     = "keep-minimum-versions"
    action = "KEEP"
    most_recent_versions {
      keep_count = 5
    }
  }
}

resource "google_compute_network" "vpc_network" {
  depends_on              = [google_project_service.project_services]
  name                    = "${var.service_name}-vpc"
  auto_create_subnetworks = false
}


resource "google_compute_subnetwork" "subnet" {
  depends_on    = [google_compute_network.vpc_network]
  name          = "${var.service_name}-subnet"
  ip_cidr_range = "10.2.0.0/28"
  region        = var.region
  network       = google_compute_network.vpc_network.id
}

resource "google_compute_global_address" "private_ip_address" {
  depends_on    = [google_compute_network.vpc_network]
  name          = "${var.service_name}-private-ip"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc_network.id
}

resource "google_vpc_access_connector" "connector" {
  depends_on    = [google_compute_network.vpc_network]
  name          = "${var.service_name}-connector"
  region        = var.region
  machine_type  = "e2-micro"
  min_instances = 2
  max_instances = 3
  subnet {
    name = google_compute_subnetwork.subnet.name
  }
}

resource "google_service_networking_connection" "private_vpc_connection" {
  depends_on              = [google_compute_global_address.private_ip_address]
  network                 = google_compute_network.vpc_network.id
  service                 = var.project_services["service-networking"]
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
}


resource "google_sql_database_instance" "postgres" {
  depends_on          = [google_service_networking_connection.private_vpc_connection]
  name                = "${var.service_name}-postgres"
  database_version    = "POSTGRES_16"
  region              = var.region
  deletion_protection = false #Set to true in production

  settings {
    tier    = "db-f1-micro"
    edition = "ENTERPRISE"

    backup_configuration {
      enabled                        = true
      start_time                     = "04:00"
      location                       = var.region
      point_in_time_recovery_enabled = true
    }

    ip_configuration {
      ssl_mode        = "ENCRYPTED_ONLY"
      ipv4_enabled    = false
      private_network = google_compute_network.vpc_network.id
    }
  }
}

resource "google_sql_database" "database" {
  name     = "${var.service_name}-db"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "user" {
  name     = var.db_user
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}