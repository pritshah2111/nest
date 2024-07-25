import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dbConnection: process.env.DATABASE_CONNECTION,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASS,
  connectionString:
    'mongodb://' +
    process.env.DATABASE_HOST +
    ':' +
    process.env.DATABASE_PORT +
    '/' +
    process.env.DATABASE_NAME +
    '?authSource=admin',
  //   initalUser: {
  //     name: 'Demo User',
  //     lastName: 'User',
  //     phone: '9456895689',
  //     userRole: 'admin',
  //     email: 'demouser@agileinfoways.com',
  //     password: 'Admin@123',
  //     isActive: true,
  //     isDeleted: false,
  //   },
}));
