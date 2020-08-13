variable "papp-name"{
  default = "papp-frontend:latest"
}

variable "papp-port"{
  default = 51005
}

variable "papp-apiurl"{
  default = "http://localhost:51002/otus-rest/v01"
}

variable "preview-address"{
  default = "http://localhost:51001"
}

resource "docker_container" "papp" {
  name = "papp-frontend"
  image = "${var.papp-name}"
  env = ["API_URL=${var.papp-apiurl}", "PREVIEW_ADDRESS=${var.preview-address}"]
  ports {
	internal = 80
	external = "${var.papp-port}"
  }
}
