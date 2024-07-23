import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  expireIn: process.env.JWT_EXPIRE, //'7d'
  ignoreTokenExpiration: false,
}));
