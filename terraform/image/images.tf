###############################################
###               Variables                 ###
###############################################
variable "papp-dockerfile" {
  default = "."
}

variable "papp-name" {
  default = "participant-app"
}

variable "papp-source" {
  default = "source"
}

variable "papp-cleanup" {
  default = "rm -rf dist node_modules package-lock.json"
}

variable "papp-npminstall" {
  default = "npm install"
}

variable "papp-npmtest" {
  default = "npm test"
}

variable "papp-npmbuild" {
  default = "npm run build"
}

variable "papp-npmprune" {
  default = "npm prune --production"
}
###############################################
###  Papp: Build Image Front-End           ###
###############################################
resource "null_resource" "papp-cleanup" {
  provisioner "local-exec" {
    working_dir = "${var.papp-source}"
    command = "${var.papp-cleanup}"
  }
}

resource "null_resource" "papp-install" {
depends_on = [null_resource.papp-cleanup]
  provisioner "local-exec" {
    working_dir = "${var.papp-source}"
    command = "${var.papp-npminstall}"
  }
}

resource "null_resource" "papp-test" {
depends_on = [null_resource.papp-install]
  provisioner "local-exec" {
    working_dir = "${var.papp-source}"
    command = "${var.papp-npmtest}"
  }
}

resource "null_resource" "papp-build" {
depends_on = [null_resource.papp-test]
  provisioner "local-exec" {
    working_dir = "${var.papp-source}"
    command = "${var.papp-npmbuild}"
  }
}

resource "null_resource" "papp-prune" {
depends_on = [null_resource.papp-build]
  provisioner "local-exec" {
    working_dir = "${var.papp-source}"
    command = "${var.papp-npmprune}"
  }
}

resource "null_resource" "papp" {
depends_on = [null_resource.papp-prune]
  provisioner "local-exec" {
    command = "docker build -t ${var.papp-name} ${var.papp-dockerfile}"
  }
}
