import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  dbUrl?: string;
  jwtSecret?: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
};


export default config;