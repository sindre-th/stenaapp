# Variabler
variable "project_id" {
  description = "The Google Cloud project ID"
  type        = string
  default     = "stellar-depth-449813-j8"
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

variable "image_url" {
  description = "The URL of the container image to deploy"
  type        = string
  default     = ""
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
