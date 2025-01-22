import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; // Use 'join' from 'path'
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './app/routes/api.js';
import {
  PORT,
  DB_CONN,
  MAX_JSON_SIZE,
  REQUEST_LIMIT_TIME,
  REQUEST_LIMIT_NUMBER,
  MESSAGE,
  URL_ENCODED,
  WEB_CACHE
} from './app/config/config.js';

// Fix __dirname issue in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files (images) from the 'storage' folder
app.use('/storage', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Set CORP header
  next();
}, express.static(join(__dirname, 'storage')));

// App use default middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://job-management-vrec.vercel.app/'], // Allow requests from this origin (your frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow GET and POST methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Preflight handling
app.options('*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(helmet());
app.use(cookieParser());

// App use limiter
const limiter = rateLimit({
  windowMs: REQUEST_LIMIT_TIME,
  max: REQUEST_LIMIT_NUMBER,
  message: MESSAGE
});
app.use(limiter);

// Cache
app.set('etag', WEB_CACHE);

// Database connection
mongoose.connect(DB_CONN, { autoIndex: true })
  .then(() => {
    console.log("MongoDB connected");
  }).catch(() => {
    console.log("MongoDB disconnected");
  });

app.use("/auth", router);

// Set the location of 'dist' folder from frontend
app.use(express.static('client/dist'));

// Add react frontend routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'dist', 'index.html'));
});

// Handle 404 errors for all routes that are not defined
app.all('*', (req, res) => {
  console.log(`404 error for route: ${req.originalUrl}`); // Add logging for better debugging
  res.status(404).json({ message: `Can't find ${req.originalUrl} on the server` });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
