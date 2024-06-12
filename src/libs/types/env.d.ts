export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: any;

            PORT: string;
            SERVER_KEY: string;
            DB_URI: string;
        }
    }
}