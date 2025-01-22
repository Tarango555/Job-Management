import { ID, SECRET } from '../config/config.js';
import { google } from 'googleapis';

if (!ID || !SECRET) {
    throw new Error('Missing Google OAuth environment variables');
}

export const oauth2Client = new google.auth.OAuth2(
    ID,
    SECRET,
    'postmessage' // or your redirect URL
);