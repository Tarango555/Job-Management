// Import and Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// PORT (app.js)
export const PORT = process.env.PORT;

// MongoDB database connection string (app.js)
export const DB_CONN = process.env.DB_CONN;

// Google console
export const ID = process.env.GOOGLE_CLIENT_ID;
export const SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Access Token (tokenUtility_2.js)
export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
export const ACCESS_TOKEN_EXPIRY_TIME = process.env.ACCESS_TOKEN_EXPIRY_TIME;

// Refresh Token (tokenUtility_2.js)
export const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
export const REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME;

// Refresh Token cookieOptions (tokenUtility_2.js)
export const HTTP_ONLY = process.env.COOKIE_HTTP_ONLY === 'true';
export const IS_PRODUCTION = process.env.COOKIE_IS_PRODUCTION === 'true';
export const MAX_AGE = parseInt(process.env.COOKIE_MAX_AGE, 10);
export const SAME_SITE = process.env.COOKIE_SAME_SITE;

//Email Configuration
export const EMAIL_HOST=process.env.EMAIL_HOST;
export const EMAIL_PORT=process.env.EMAIL_PORT;
export const EMAIL_SECURITY=process.env.EMAIL_SECURITY;
export const EMAIL_AUTH_USER=process.env.EMAIL_AUTH_USER;
export const EMAIL_AUTH_PASS=process.env.EMAIL_AUTH_PASS;

// url for forgot-password reset link
export const FRONTEND_URL = process.env.FRONTEND_URL;

// Web cache (app.js)
export const WEB_CACHE = false;

// Maximum JSON size (app.js)
export const MAX_JSON_SIZE = "10MB";

//URL encode (app.js)
export const URL_ENCODED = true;

// App use limiter (express-rate-limit) (app.js)
export const REQUEST_LIMIT_TIME = 15*60*1000;  // 15 minutes
export const REQUEST_LIMIT_NUMBER = 1000;     // Limit to 1000 requests per 15 minutes per IP
export const MESSAGE = "Too many requests, please try again later.";
