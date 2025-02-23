data "google_sql_database_instance" "postgres" {
  name = "${var.service_name}-postgres"
}

data "google_sql_database" "database" {
  name     = "${var.service_name}-db"
  instance = data.google_sql_database_instance.postgres.name
}

data "google_vpc_access_connector" "connector" {
  name = "${var.service_name}-connector"
}


resource "google_cloud_run_v2_service" "cloud_run" {
  name                = var.service_name
  location            = var.region
  deletion_protection = false # set to "true" in production

  template {
    containers {
      #       image = var.image_url https://github.com/dlorch/errors.fail/commit/a6b8381f18dae797ae5fd225c390b21eda981f31
      image = "europe-north1-docker.pkg.dev/stellar-depth-449813-j8/stenaapp/stenaapp:latest"
      resources {
        limits = {
          cpu    = "2"
          memory = "1024Mi"
        }
      }
      env {
        name  = "DB_HOST"
        value = data.google_sql_database_instance.postgres.private_ip_address
      }
      env {
        name  = "DB_NAME"
        value = data.google_sql_database.database.name
      }
      env {
        name  = "DB_USER"
        value = var.db_user
      }
      env {
        name  = "DB_PASSWORD"
        value = var.db_password
      }
    }

    vpc_access {
      connector = data.google_vpc_access_connector.connector.id
      egress    = "ALL_TRAFFIC"
    }
  }

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}

resource "google_cloud_run_service_iam_binding" "default" {
  location = var.region
  service  = var.service_name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}