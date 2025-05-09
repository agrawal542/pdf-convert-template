// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';
dotenv.config();

export const serverConfig = {
  PORT: Number(process.env.PORT) || 3001
};
