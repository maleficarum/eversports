export const AppConfig = {
    HTTP_LISTENING_PORT: 3099,
    HTTP_LISTENING_ADDRESS: "0.0.0.0"
} as const satisfies { HTTP_LISTENING_PORT: number, HTTP_LISTENING_ADDRESS: string }