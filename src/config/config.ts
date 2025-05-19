/**
 * Application default configuration
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * Configuration with default values. Overrided by its equivalent env vars
 * 
 * @property {number} [HTTP_LISTENING_PORT] - HTTP listening port
 * @property {string} [HTTP_LISTENING_ADDRESS] - HTTP listening address. Default is 0.0.0.0, which means "listen on all available addresses"
 * @property {string} [APPLICATION_ENVIRONMENT] - The running environment; defaults "production"; others environments will work as development
 * @property {string} [EVERSPORTS_API_VERSION] - The current API version. This would be util if we perform changes to the API. 
 */

export const AppConfig = {
    HTTP_LISTENING_PORT: 3099,
    HTTP_LISTENING_ADDRESS: "0.0.0.0",
    APPLICATION_ENVIRONMENT: "production",
    EVERSPORTS_API_VERSION: "1.0.0",
} as const satisfies { HTTP_LISTENING_PORT: number, HTTP_LISTENING_ADDRESS: string, APPLICATION_ENVIRONMENT: string, EVERSPORTS_API_VERSION: string }