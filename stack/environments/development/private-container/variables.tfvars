ecs_cluster_name = "my-ecs-cluster"
health_check_application = "/health"

container_definition = {
    name = "eversports",
    image = "maleficarum/eversports:latest",
    desired_count = 1,
    port_mapping = [{
      containerPort = 80,
      hostPort      = 80
    }]
}