variable "otus-app-name"{
  default = "otus-app"
}

variable "otus-app-port"{
  default = 51003
}

variable "otus-app-apiurl"{
  default = "http://localhost:51006"
}

variable "otus-app-version"{
  default = "otus-app:latest"
}

resource "docker_container" "otus-app" {
  name = "otus-app"
  image = "${var.otus-app-version}"
  env = ["API_URL=${var.otus-app-apiurl}"]
  ports {
	internal = 80
	external = "${var.otus-app-port}"
  }
}
