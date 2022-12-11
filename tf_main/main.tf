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

variable "application_id" {
  type = string
}

variable "module" {
  type = string
}

variable "function_image" {
  type = string
}

terraform {
  backend "s3" {
    bucket   = "terraform-states"
    key      = "tf_trasversal/terraform.tfstate"
    region   = "sa-saopaulo-1"
    endpoint = "https://grkog4hnhyhj.compat.objectstorage.sa-saopaulo-1.oraclecloud.com"
    shared_credentials_file     = "./terraform-states_bucket_credentials"
    skip_region_validation      = true
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    force_path_style            = true
  }

   required_providers {
    circleci = {
      source = "mrolla/circleci"
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

resource "oci_functions_function" "function" {
  #Required
  application_id = var.application_id
  display_name   = var.module
  image          = var.function_image
  memory_in_mbs  = 128
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

resource "circleci_context_environment_variable" "enpdoint" {
  variable   = var.module
  value      = oci_functions_function.function.invoke_endpoint
  context_id = "3d0e7283-446b-482e-8c74-fbaad2f2525e"

  #Optional
#  config = var.function_config
}