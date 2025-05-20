include "env" {
  path = "./env.hcl"
  expose = true
  merge_strategy = "no_merge"
}

include "root" {
  path   = find_in_parent_folders("root.hcl")
}

locals {
  //debug = run_cmd("echo", "${jsonencode(include.env)}")
  //debug = run_cmd("echo", "${dependency.network.outputs}")
}

terraform {
  //source = "https://github.com/maleficarum/terraform-aws-container?ref=${include.env.locals.terraform_module_version}"
  source = "../../../modules//terraform-aws-container"

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
  //This should be adjusted pointing to the target subnet , public or private
  target_subnets = dependency.network.outputs.private_subnets
  ecs_tasks = dependency.network.outputs.ecs_tasks
  target_group_arn = dependency.network.outputs.target_group_arn
  region = include.env.locals.region
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

dependency "network" {
  config_path = "../network"
  mock_outputs = {
    container_definition = {
      name = "nginx-app"
      image = "nginx:latest",
      port_mapping = [{
        containerPort = 80,
        hostPort      = 80
      }]
    }
    ecs_tasks = "12"
    public_subnets = ["1","2"]
    private_subnets = ["1","2"]
    target_group_arn = "arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/mock-tg/abc123xyz"
  }  
}