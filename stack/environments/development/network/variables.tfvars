vpc_definition = {
    cidr_block = "10.0.0.0/16",
    vpc_name = "VPC",
    public_subnets = 2,
    private_subnets = 2,
    internet_gateway_name = "my-internet-gwy"
}

health_check_application = "/health"