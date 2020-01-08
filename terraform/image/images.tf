###############################################
###               Variables                 ###
###############################################
variable "otus-app-dockerfile" {
  default = "."
}

variable "otus-app-name" {
  default = "otus-app"
}

variable "otus-app-source" {
  default = "source"
}

variable "otus-app-cleanup" {
  default = "rm -rf dist node_modules package-lock.json"
}

variable "otus-app-npminstall" {
  default = "npm install"
}

variable "otus-app-npmtest" {
  default = "npm test"
}

variable "otus-app-npmbuild" {
  default = "ng build"
}

variable "otus-app-npmprune" {
  default = "npm prune --production"
}
###############################################
###  OTUS APP: Build Image Front-End           ###
###############################################
resource "null_resource" "otus-app-cleanup" {
  provisioner "local-exec" {
    working_dir = "${var.otus-app-source}"
    command = "${var.otus-app-cleanup}"
  }
}

resource "null_resource" "otus-app-install" {
depends_on = [null_resource.otus-app-cleanup]
  provisioner "local-exec" {
    working_dir = "${var.otus-app-source}"
    command = "${var.otus-app-npminstall}"
  }
}

resource "null_resource" "otus-app-test" {
depends_on = [null_resource.otus-app-install]
  provisioner "local-exec" {
    working_dir = "${var.otus-app-source}"
    command = "${var.otus-app-npmtest}"
  }
}

resource "null_resource" "otus-app-build" {
depends_on = [null_resource.otus-app-test]
  provisioner "local-exec" {
    working_dir = "${var.otus-app-source}"
    command = "${var.otus-app-npmbuild}"
  }
}

resource "null_resource" "otus-app-prune" {
depends_on = [null_resource.otus-app-build]
  provisioner "local-exec" {
    working_dir = "${var.otus-app-source}"
    command = "${var.otus-app-npmprune}"
  }
}

resource "null_resource" "otus-app" {
depends_on = [null_resource.otus-app-prune]
  provisioner "local-exec" {
    command = "docker build -t ${var.otus-app-name} ${var.otus-app-dockerfile}"
  }
}
