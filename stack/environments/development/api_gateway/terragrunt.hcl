include "env" {
  path = "./env.hcl"
  expose = true
  merge_strategy = "no_merge"
}

include "root" {
  //path= find_in_parent_folders(get_env("CLOUD_PROVIDER"))
  path   = find_in_parent_folders("root.hcl")
}

locals {
  //debug = run_cmd("echo", "${jsonencode(include.env)}")
}

terraform {
  source = "https://github.com/maleficarum/terraform-aws-api-gateway?ref=${include.env.locals.terraform_module_version}"
  //source = "../../../modules//terraform-aws-api-gateway"

  include_in_copy = ["variables.tfvars"]

  before_hook "tflint" {
    commands     = ["apply", "plan"]
    execute      = ["tflint"]
  }

  extra_arguments "custom_vars" {
    commands = [
      "apply",
      "plan",
      "destroy"
    ]

    required_var_files = ["variables.tfvars"]
  }
}

inputs = {
  public_dns_name = dependency.network.outputs.public_alb_dns_name
  environment = include.env.locals.environment
}

remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket = "sinformex-terraform-state-1"

    key = "${path_relative_to_include("root")}/terraform.tfstate"
    region         = include.env.locals.s3_region
    encrypt        = false
  }
}
/*
remote_state {
  backend = "http"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    update_method = "PUT"
    address       = "https://objectstorage.us-phoenix-1.oraclecloud.com/p/CZM27stAvBwo0zvR2zGNDJXtBGuyb7ycaX_qtZipE1BQzH1lgM7kIdiue2Mt6reG/n/idi1o0a010nx/b/terraform-state/o/${path_relative_to_include("root")}/terraform.tfstate"
  }
}
*/
dependency "network" {
  config_path = "../network"
  mock_outputs = {
    public_alb_dns_name = "test"
  }  
}