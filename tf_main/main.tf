variable "region" {
  type = string
}

variable "tenancy_ocid" {
  type = string
}

variable "user_ocid" {
  type = string
}

variable "fingerprint" {
  type = string
}

variable "private_key_path" {
  type = string
}

variable "application_id" {
  type = string
}

variable "gateway_id" {
  type = string
}

variable "loggroup_id" {
  type = string
}

variable "compartment_ocid" {
  type = string
}

variable "module" {
  type = string
}

variable "image" {
  type = string
}

variable "subnet_ocid" {
  type = string
}

variable "registry_endpoint" {
  type = string
}

variable "registry_username" {
  type = string
}

variable "registry_password" {
  type = string
}

terraform {
  backend "s3" {
    bucket                      = "terraform-states"
    key                         = "tf_main/terraform.tfstate"
    region                      = "sa-saopaulo-1"
    endpoint                    = "https://grkog4hnhyhj.compat.objectstorage.sa-saopaulo-1.oraclecloud.com"
    shared_credentials_file     = "./terraform-states_bucket_credentials"
    skip_region_validation      = true
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    force_path_style            = true
  }

  required_providers {
    circleci = {
      source  = "mrolla/circleci"
      version = "0.6.1"
    }
  }
}

/* provider OCI */

provider "oci" {
  region           = var.region
  tenancy_ocid     = var.tenancy_ocid
  user_ocid        = var.user_ocid
  fingerprint      = var.fingerprint
  private_key_path = var.private_key_path
}

/*Container*/

resource "oci_container_instances_container_instance" "container_instance" {
  #Required
  availability_domain = "RgyX:SA-SAOPAULO-1-AD-1"
  compartment_id      = var.compartment_ocid
  containers {
    #Required
    image_url = var.image

    #Optional
    #additional_capabilities = var.container_instance_containers_additional_capabilities
    #arguments = var.container_instance_containers_arguments
    #command = var.container_instance_containers_command
    #defined_tags = var.container_instance_containers_defined_tags
    display_name = "backend"
    #environment_variables = var.container_instance_containers_environment_variables
    #freeform_tags = var.container_instance_containers_freeform_tags
    #health_checks {
    #Required
    #health_check_type = var.container_instance_containers_health_checks_health_check_type

    #Optional
    #command = var.container_instance_containers_health_checks_command
    #failure_action = var.container_instance_containers_health_checks_failure_action
    #failure_threshold = var.container_instance_containers_health_checks_failure_threshold
    #headers {

    #Optional
    #name = var.container_instance_containers_health_checks_headers_name
    #value = var.container_instance_containers_health_checks_headers_value
    #}
    #initial_delay_in_seconds = var.container_instance_containers_health_checks_initial_delay_in_seconds
    #interval_in_seconds = var.container_instance_containers_health_checks_interval_in_seconds
    #name = var.container_instance_containers_health_checks_name
    #path = var.container_instance_containers_health_checks_path
    #port = var.container_instance_containers_health_checks_port
    #success_threshold = var.container_instance_containers_health_checks_success_threshold
    #timeout_in_seconds = var.container_instance_containers_health_checks_timeout_in_seconds
    #}
    #is_resource_principal_disabled = var.container_instance_containers_is_resource_principal_disabled
    resource_config {

      #Optional
      memory_limit_in_gbs = 4
      vcpus_limit         = 2
    }
    #volume_mounts {
    #Required
    #mount_path = var.container_instance_containers_volume_mounts_mount_path
    #volume_name = var.container_instance_containers_volume_mounts_volume_name

    #Optional
    #is_read_only = var.container_instance_containers_volume_mounts_is_read_only
    #partition = var.container_instance_containers_volume_mounts_partition
    #sub_path = var.container_instance_containers_volume_mounts_sub_path
    #}
    #working_directory = var.container_instance_containers_working_directory
  }
  shape = "CI.Standard.E4.Flex"
  shape_config {
    #Required
    ocpus = 3

    #Optional
    memory_in_gbs = 6
  }
  vnics {
    #Required
    subnet_id = var.subnet_ocid

    #Optional
    #defined_tags = var.container_instance_vnics_defined_tags
    #display_name = var.container_instance_vnics_display_name
    #freeform_tags = var.container_instance_vnics_freeform_tags
    #hostname_label = var.container_instance_vnics_hostname_label
    #is_public_ip_assigned = var.container_instance_vnics_is_public_ip_assigned
    #nsg_ids = var.container_instance_vnics_nsg_ids
    #private_ip = var.container_instance_vnics_private_ip
    #skip_source_dest_check = var.container_instance_vnics_skip_source_dest_check
  }

  #Optional
  #container_restart_policy = var.container_instance_container_restart_policy
  #defined_tags = {"foo-namespace.bar-key"= "value"}
  display_name = "container_instance-def"
  #dns_config {

  #Optional
  #nameservers = var.container_instance_dns_config_nameservers
  #options = var.container_instance_dns_config_options
  #searches = var.container_instance_dns_config_searches
  #}
  #fault_domain = var.container_instance_fault_domain
  #freeform_tags = {"bar-key"= "value"}
  #graceful_shutdown_timeout_in_seconds = var.container_instance_graceful_shutdown_timeout_in_seconds
  image_pull_secrets {
  #Required
  registry_endpoint = var.registry_endpoint
  secret_type = "BASIC"

  #Optional
  password = var.registry_password
  #secret_id = oci_vault_secret.test_secret.id
  username = var.registry_username
  }
  #volumes {
  #Required
  #name = var.container_instance_volumes_name
  #volume_type = var.container_instance_volumes_volume_type

  #Optional
  #backing_store = var.container_instance_volumes_backing_store
  #configs {

  #Optional
  #data = var.container_instance_volumes_configs_data
  #file_name = var.container_instance_volumes_configs_file_name
  #path = var.container_instance_volumes_configs_path
  #}
  #}
}

/*

resource "oci_functions_function" "function" {
  #Required
  application_id = var.application_id
  display_name   = var.module
  image          = var.function_image
  memory_in_mbs  = 512
}

resource "oci_functions_invoke_function" "test_invoke_function" {
  #Required
  function_id = oci_functions_function.function.id
}

output "funtion_invoke" {
  value = oci_functions_invoke_function.test_invoke_function
}

resource "oci_apigateway_deployment" "deployment" {
  #Required
  compartment_id = var.compartment_ocid
  gateway_id     = var.gateway_id
  display_name   = "main-deployment"
  path_prefix    = "/"
  specification {
    #Optional
    logging_policies {

      #Optional
      access_log {

        #Optional
        is_enabled = true
      }
      execution_log {

        #Optional
        is_enabled = true
        log_level  = "INFO"
      }
    }
    routes {
      backend {
        type        = "ORACLE_FUNCTIONS_BACKEND"
        function_id = oci_functions_function.function.id
      }
      logging_policies {

        #Optional
        access_log {

          #Optional
          is_enabled = true
        }
        execution_log {

          #Optional
          is_enabled = true
          log_level  = "INFO"
        }
      }
      path    = "/hello"
      methods = ["GET"]

    }
  }
}

resource "oci_apigateway_deployment" "weather-deployment" {
  #Required
  compartment_id = var.compartment_ocid
  gateway_id     = var.gateway_id
  display_name   = "weather-deployment"
  path_prefix    = "/weather"
  specification {
    #Optional
    logging_policies {

      #Optional
      access_log {

        #Optional
        is_enabled = true
      }
      execution_log {

        #Optional
        is_enabled = true
        log_level  = "INFO"
      }
    }
    routes {
      backend {
        type        = "HTTP_BACKEND"
        url = "https://api.weather.gov"
      }
      logging_policies {

        #Optional
        access_log {

          #Optional
          is_enabled = true
        }
        execution_log {

          #Optional
          is_enabled = true
          log_level  = "INFO"
        }
      }
      path    = "/test"
      methods = ["GET"]

    }
  }
}

resource "oci_logging_log" "log_access" {
  #Required
  display_name       = "${oci_apigateway_deployment.deployment.display_name}_access"
  log_group_id       = var.loggroup_id
  log_type           = "SERVICE"
  is_enabled         = true
  retention_duration = 30

  #Optional
  configuration {
    #Required
    source {
      #Required
      category    = "access"
      resource    = oci_apigateway_deployment.deployment.id
      service     = "apigateway"
      source_type = "OCISERVICE"
    }

    #Optional
    compartment_id = var.compartment_ocid
  }
}

resource "oci_logging_log" "log_execution" {
  #Required
  display_name       = "${oci_apigateway_deployment.deployment.display_name}_execution"
  log_group_id       = var.loggroup_id
  log_type           = "SERVICE"
  is_enabled         = true
  retention_duration = 30

  #Optional
  configuration {
    #Required
    source {
      #Required
      category    = "execution"
      resource    = oci_apigateway_deployment.deployment.id
      service     = "apigateway"
      source_type = "OCISERVICE"
    }

    #Optional
    compartment_id = var.compartment_ocid
  }
}

/* provider  CircleCI*/

variable "api_token" {
  type = string
}

variable "organization" {
  type = string
}

provider "circleci" {
  api_token    = var.api_token
  vcs_type     = "github"
  organization = var.organization
}
/*

resource "circleci_context_environment_variable" "enpdoint" {
  variable   = var.module
  value      = oci_functions_function.function.invoke_endpoint
  context_id = "3d0e7283-446b-482e-8c74-fbaad2f2525e"

  #Optional
  #  config = var.function_config
}
*/
