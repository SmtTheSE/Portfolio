/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ATPROTO_HANDLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
