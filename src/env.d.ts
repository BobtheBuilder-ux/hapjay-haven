
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Add other env vars as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
