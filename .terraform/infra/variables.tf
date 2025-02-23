# Variabler
variable "project_id" {
  description = "The Google Cloud project ID"
  type        = string
  default     = "stellar-depth-449813-j8"
}

variable "artifact_repository_id" {
  description = "The Docker Artifact repository ID"
  type        = string
  default     = "stenaapp"
}

variable "region" {
  description = "The Google Cloud region"
  type        = string
  default     = "europe-north1"
}

variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
  default     = "stenaapp-run"
}

variable "db_user" {
  description = "The username for the PostgreSQL database"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "The password for the PostgreSQL database"
  type        = string
  sensitive   = true
  default     = "postgres"
}

variable "project_services" {
  description = "Service APIs to activate"
  type        = map(string)
  default = {
    artifact-registry  = "artifactregistry.googleapis.com",
    service-networking = "servicenetworking.googleapis.com",
    compute            = "compute.googleapis.com",
    vpc-access         = "vpcaccess.googleapis.com"
    run                = "run.googleapis.com"
  }
}