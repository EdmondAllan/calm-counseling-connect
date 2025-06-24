export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Calm Counseling Connect',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  auth: {
    tokenKey: 'userInfo',
  },
};

export default config; 