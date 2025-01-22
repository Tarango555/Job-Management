import express from 'express';
const router = express.Router();

import {
    googleSignUp,
    googleLogin,
    emailAuth,
    refreshToken,
    logout,
    forgotPassword,
    resetPassword,
    sendVerificationCode,
    verifyEmail,
    signUp,
} from '../controllers/authControllers.js';
import {
    createJob,
    updateJobById,
    deleteJobById,
    getJobById,
} from '../controllers/clientController.js';

import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

// Route for sign up
router.post('/google-sign-up', googleSignUp);

// Route for google login
router.post('/google-login', googleLogin);

// Route for send-code
router.post('/send-verification-code', sendVerificationCode);

// Route for verify-email
router.post('/verify-email', verifyEmail);

// Route for sign up
router.post('/sign-up', signUp);






// Route for email oAuth
router.post('/email-login', emailAuth);

// Route for refreshToken
router.post('/refreshToken', refreshToken);

// Route for logout
router.post('/logout', verifyAccessToken, logout);

// Route for forgot-password
router.post('/forgot-password', forgotPassword);

// Route for reset-password
router.post('/reset-password/:token', resetPassword);






// Route for create-job
router.post('/create-job', verifyAccessToken, createJob);

// Route for update-job
router.put('/update-job/:jobId', verifyAccessToken, updateJobById);

// Route for delete-job
router.delete('/delete-job/:jobId', verifyAccessToken, deleteJobById);

// Route for get-job
router.get('/get-job/:jobId', verifyAccessToken, getJobById);






export default router;