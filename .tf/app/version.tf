terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~>6.19.0"
    }
  }
  #   backend "gcs" {
  #     bucket = "${PROJECT_ID}-terraform-state"  # Navnet på bucketen du opprettet
  #     prefix = "terraform/state"    # En mappe i bucketen for å organisere state-filer
  #   }
}