terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.23.1"
    }
  }
}

provider "docker" {
  host = "tcp://gru.ocir.io:443"

    # -> specify either
  cert_path = pathexpand("./.docker")

  registry_auth {
    address  = "https://gru.ocir.io"
    username = "oracleidentitycloudservice/christian.rodriguez.mt@usa.edu.co"
    password = "GF0js.I.OOsxa[uQ[ihK"
  }
}

resource "docker_registry_image" "helloworld" {
  name = "https://sa-saopaulo-1.ocir.io/grkog4hnhyhj/registry-def:latest"

  build {
    context = "../module_main"
  }
}