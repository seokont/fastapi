import { Request } from "express";
import winston from "winston";
import WinstonMysql from "winston-mysql";
import "dotenv/config";

const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME,
    table: "app_logs",
  },
};

export const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new WinstonMysql(options.db),
  ],
  exitOnError: false,
});

export const dbLogger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "./logs/db.log",
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

export const psa = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "./logs/psa.log",
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

export const logError = (error: any, request: Request): void => {
  logger.error(error.message, {
    stack: error.stack,
    request: getRequestData(request),
  });
};

function getRequestData({
  headers,
  query,
  originalUrl,
  body,
  method,
  path,
  baseUrl,
  protocol,

}: Request) {
  return {
    headers,
    query,
    originalUrl,
    body,
    method,
    path,
    baseUrl,
    protocol,
    
  };
}
