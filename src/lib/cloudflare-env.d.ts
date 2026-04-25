interface CloudflareEnv {
  // Add your Cloudflare environment variables here
  GOOGLE_SHEET_CSV_URL: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CloudflareEnv {}
  }
}

export {};
