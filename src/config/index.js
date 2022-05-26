import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "3000";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error(`⚠️  Couldn't find .env file  ⚠️`);
}

export default {
  port: parseInt(process.env.PORT, 10),
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  db: {
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
  },
  aws: {
    bucket: process.env.AWS_BUCKET,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION,
  },
};
