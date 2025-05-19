locals {
    envlocals =  read_terragrunt_config("env.hcl")
}

generate "terraform" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF

  terraform {
    required_version = ">=1.9.7"
    required_providers {

      aws = {
        source  = "hashicorp/aws"
        version = "~> 5.94.1"
      }

    }
  }

  provider "aws" {
    region = "${local.envlocals.locals.region}"
  }

  EOF
}