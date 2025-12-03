declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string
    NEXTAUTH_SECRET: string
    NEXT_PUBLIC_BASE_URL: string
    OPENAI_API_KEY: string
  }
}
