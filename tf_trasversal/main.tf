variable "tenancy_ocid" {
  type = string
}

variable "user_ocid" {
  type = string
}

variable "fingerprint" {
  type = string
}

variable "compartment_ocid" {
  type = string
}

variable "region" {
  type = string
}

variable "private_key_path" {
  type = string
}

variable "namespace" {
  type = string
}

variable "modules" {
  type = list(string)
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

/* Network */

resource "oci_core_virtual_network" "vcn" {
  cidr_block     = "10.1.0.0/16"
  compartment_id = var.compartment_ocid
  display_name   = "vcn-def"
  dns_label      = "vcn"
}

resource "oci_core_subnet" "subnet" {
  cidr_block        = "10.1.1.0/24"
  display_name      = "Subnet-def"
  dns_label         = "subnet"
  security_list_ids = [oci_core_security_list.security_list.id]
  compartment_id    = var.compartment_ocid
  vcn_id            = oci_core_virtual_network.vcn.id
  route_table_id    = oci_core_route_table.route_table.id
  dhcp_options_id   = oci_core_dhcp_options.dhcp_options.id
}

resource "oci_core_dhcp_options" "dhcp_options" {
  #Required
  compartment_id = var.compartment_ocid
  options {
    type        = "DomainNameServer"
    server_type = "VcnLocalPlusInternet"
  }

  options {
    type                = "SearchDomain"
    search_domain_names = ["MTC4.loc"]
  }

  vcn_id = oci_core_virtual_network.vcn.id

  #Optional
  display_name = "dhcp_options-def"
}

resource "oci_core_internet_gateway" "internet_gateway" {
  compartment_id = var.compartment_ocid
  display_name   = "internet_gateway-def"
  vcn_id         = oci_core_virtual_network.vcn.id
}

resource "oci_core_route_table" "route_table" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_virtual_network.vcn.id
  display_name   = "route_table-def"

  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.internet_gateway.id
  }
}

resource "oci_core_security_list" "security_list" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_virtual_network.vcn.id
  display_name   = "security_list-def"

  egress_security_rules {
    protocol    = "6"
    destination = "0.0.0.0/0"
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"

    tcp_options {
      max = "443"
      min = "443"
    }
  }

#  ingress_security_rules {
#    protocol = "6"
#    source   = "0.0.0.0/0"
#
#    tcp_options {
#      max = "3000"
#      min = "3000"
#    }
#  }

#  ingress_security_rules {
#    protocol = "6"
#    source   = "0.0.0.0/0"
#
#    tcp_options {
#      max = "3005"
#      min = "3005"
#    }
#  }

#  ingress_security_rules {
#    protocol = "6"
#    source   = "0.0.0.0/0"
#
#    tcp_options {
#      max = "80"
#      min = "80"
#    }
#  }
}

/* Containers */

resource "oci_artifacts_container_repository" "container_repository" {
    for_each   = toset(var.modules)
    #Required
    compartment_id = var.compartment_ocid
    display_name = lower("${each.key}")

    #Optional
    is_immutable = false
#    is_public = true
}

/*
resource "oci_functions_application" "application" {
  #Required
  compartment_id = var.compartment_ocid
  display_name   = "application-def"
  subnet_ids     = [oci_core_subnet.subnet.id]

}

#resource "oci_functions_function" "function_main" {
  #Required
#  application_id = oci_functions_application.application.id
#  display_name   = "function_main"
#  image          = var.function_image
#  memory_in_mbs  = 128
#}

resource "oci_apigateway_gateway" "gateway" {
    #Required
    display_name = "gateway-def"
    compartment_id = var.compartment_ocid
    endpoint_type = "PUBLIC"
    subnet_id = oci_core_subnet.subnet.id
}

resource "oci_logging_log_group" "log_group" {
    #Required
    compartment_id = var.compartment_ocid
    display_name = "loggroup-def"
}

*/

/* Buckets */

resource "oci_objectstorage_bucket" "private_bucket" {
    #Required
    compartment_id = var.compartment_ocid
    name = "private_bucket-def"
    namespace = "${var.namespace}"
    access_type = "NoPublicAccess"
}

resource "oci_objectstorage_bucket" "public_bucket" {
    #Required
    compartment_id = var.compartment_ocid
    name = "public_bucket-def"
    namespace = "${var.namespace}"
    access_type = "ObjectReadWithoutList"
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
resource "circleci_context_environment_variable" "application_id" {
  variable   = "application_id"
  value      = oci_functions_application.application.id
  context_id = "e4730023-fbf9-4b23-bcd7-62b5e8bc9a6a"
}

resource "circleci_context_environment_variable" "gateway_id" {
  variable   = "gateway_id"
  value      = oci_apigateway_gateway.gateway.id
  context_id = "e4730023-fbf9-4b23-bcd7-62b5e8bc9a6a"
}

resource "circleci_context_environment_variable" "loggroup_id" {
  variable   = "loggroup_id"
  value      = oci_logging_log_group.log_group.id
  context_id = "e4730023-fbf9-4b23-bcd7-62b5e8bc9a6a"
}

*/

resource "circleci_context_environment_variable" "repo" {
  for_each   = toset(var.modules)
  variable   = "Repo_MT_C4_UNAB_${each.key}"
  value      = lower(each.key)
  context_id = "e4730023-fbf9-4b23-bcd7-62b5e8bc9a6a"
}

resource "circleci_context_environment_variable" "namespace" {
  variable   = "namespace"
  value      = var.namespace
  context_id = "e4730023-fbf9-4b23-bcd7-62b5e8bc9a6a"
}

resource "circleci_context_environment_variable" "region" {
  variable   = "region"
  value      = var.region
  context_id = "e4730023-fbf9-4b23-bcd7-62b5e8bc9a6a"
}

resource "circleci_context_environment_variable" "subnet" {
  variable   = "subnet"
  value      = oci_core_subnet.subnet.id
  context_id = "e4730023-fbf9-4b23-bcd7-62b5e8bc9a6a"
}