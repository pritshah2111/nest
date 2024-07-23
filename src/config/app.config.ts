import { registerAs } from '@nestjs/config';

console.log('07-22 process.env.APP_ENV: ', process.env.APP_ENV);
export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME || 'appssssss',
  description: process.env.APP_DESCRIPTION,
  version: process.env.APP_VERSION,
  url: process.env.APP_URL,
  port: parseInt(process.env.APP_PORT, 10),
  enablesCors: process.env.ENABLE_CORS === 'true',
}));
