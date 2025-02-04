# Outputs
output "service_url" {
  value = google_cloud_run_v2_service.default.uri
}

output "db_connection_name" {
  value = google_sql_database_instance.postgres.connection_name
}