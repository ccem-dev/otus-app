variable "Papp-name"{
  default = "participant-app"
}

variable "Papp-port"{
  default = 51005
}

variable "Papp-apiurl"{
  default = "http://localhost:51002/otus-rest/v01"
}

variable "preview-address"{
  default = "http://localhost:51001"
}

variable "Papp-version"{
  default = "participant-app:latest"
}

resource "docker_container" "participant-app" {
  name = "participant-app"
  image = "${var.Papp-version}"
  env = ["API_URL=${var.Papp-apiurl}", "PREVIEW_ADDRESS=${var.preview-address}"]
  ports {
	internal = 80
	external = "${var.Papp-port}"
  }
}
