variable "otus-app-name"{
  default = "otus-app"
}

variable "otus-app-port"{
  default = 51005
}

variable "otus-app-apiurl"{
  default = "http://localhost:51002/otus-rest/v01"
}

variable "preview-address"{
  default = "http://localhost:51001"
}

variable "otus-app-version"{
  default = "otus-app:latest"
}

resource "docker_container" "otus-app" {
  name = "otus-app"
  image = "${var.otus-app-version}"
  env = ["API_URL=${var.otus-app-apiurl}", "PREVIEW_ADDRESS=${var.preview-address}"]
  ports {
	internal = 80
	external = "${var.otus-app-port}"
  }
}
