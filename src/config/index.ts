export const config = {
  api: {
    baseURL: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.API_BASE_URL) || '/api',
    timeout: 10000,
  },
  app: {
    name: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_APP_NAME) || 'Calm Counseling Connect',
    version: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_APP_VERSION) || '1.0.0',
  },
  auth: {
    tokenKey: 'userInfo',
  },
};

export default config; 