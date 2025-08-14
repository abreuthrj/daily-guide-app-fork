declare module '@env' {
  export const ENV_MODE: 'development' | 'staging' | 'production';
  export const API_URL: string;
  export const CROWDIN_PROJECT_ID: number;
  export const CROWDIN_TOKEN: string;
}
