import axios from 'axios';
import { downloadImage } from '../utils/imageDownloader.js';
import path from 'path';
import { oauth2Client } from '../utils/googleClient.js';
import crypto from 'crypto';
import SendEmail from '../utils/emailUtilityEthereal.js';
import NewUserModel from '../models/newUserModel.js';
import UserProfileModel from "../models/UserProfileModel.js";
import { REFRESH_TOKEN_SECRET_KEY, FRONTEND_URL } from '../config/config.js';
import { CreateAccessToken, CreateRefreshToken, StoreRefreshTokenInCookie, TokenDecode } from '../utils/tokenUtility_2.js';


export const googleSignUp = async (req, res) => {

    const { code, role } = req.body;
    if(!code || !role){
      return res.status(400).json({ message: "Both code and role are required." }); //400 Bad request
    }
  
    try {
        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
  
        // Retrieve user information from Google
        const { data } = await axios.get(
            'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
            {
                headers: { Authorization: `Bearer ${tokens.access_token}` },
            }
        );
  
        const { email, name, picture } = data;
  
        // Check if the user exists, create if not
        let existingUser = await NewUserModel.findOne({ email });
        if (existingUser) {
          if(existingUser.isGoogleAuth){
            // Prevent login if the google account is registered already. 409 Conflict
            return res.status(409).json({
              status: 'fail',
              message: 'This email is registered already. Please login with your google account.',
            });
          } else {
            return res.status(409).json({
              status: 'fail',
              message: 'This email is registered manually with an email. Please use email/password login system.',
            });
          }
        }

        // Save the image to the server
        const imagePath = path.join('storage', 'images', `${email}.jpg`);
        await downloadImage(picture, imagePath);

        // Create new user
        const user = new NewUserModel({
          email,
          role,
          status: "verified",
          isGoogleAuth: true,
        });
        await user.save();
      
        // Create profile
        const profile = new UserProfileModel({
          userId: user._id, // Link profile to user
          name,
          image: imagePath,
        });
        await profile.save();
  
        return res.status(201).json({        // 201 created
            status: 'success',
            message: 'Account created successfully. Please log in.',
            user: {
              email,
              role,
            },
        });
    } catch (err) {
        console.error("Error during Google sign-up:", err);
        if (err.response && err.response.data) {
          // Handle Google-specific errors
          return res.status(400).json({
            status: "error",
            message: err.response.data.error_description || "Google authentication failed.",
          });
        }
        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
    }
};


export const googleLogin = async (req, res) => {
  const { code } = req.body;

  if (!code) {
      return res.status(400).json({
          status: "fail",
          message: "Google code is missing.",
      });
  }

  try {
      // Exchange code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Retrieve user information from Google
      const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
              headers: { Authorization: `Bearer ${tokens.access_token}` },
          }
      );

      const { email } = data;

      // Check if the user exists
      const user = await NewUserModel.findOne({ email });
      if (!user) {
          return res.status(404).json({
              status: "fail",
              message: "You do not have an account yet. Please sign up first.",
          });
      }

      // Prevent manual accounts from using Google login
      if (!user.isGoogleAuth) {
          return res.status(403).json({
              status: "fail",
              message: "This email is registered manually. Please use email/password login.",
          });
      }

      // Fetch additional user data from the profile collection
      const userProfile = await UserProfileModel.findOne({ userId: user._id });

      // Generate tokens
      const accessToken = CreateAccessToken(user.email, user._id, user.role);
      const refreshToken = CreateRefreshToken(user.email, user._id, user.role);

      // Store refresh token in a secure HTTP-only cookie
      StoreRefreshTokenInCookie(res, "refreshToken", refreshToken);

      return res.status(200).json({
          status: "success",
          message: "Authentication successful",
          accessToken,
          user: {
              email: user.email,
              role: user.role,
              image: userProfile?.image || 'User',
              name: userProfile?.name || null,
          },
      });
  } catch (err) {
      console.error("Google login error:", err.message || err);
      return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
      });
  }
};


export const sendVerificationCode = async (req, res) => {

  const {email} = req.body;

  if(!email){
    return res.status(400).json({
      message: "Email is required" 
    });
  }

  try {
    const existingUser = await NewUserModel.findOne({email});

    if (existingUser) {
      if (existingUser.status === "completed") {
        return res.status(400).json({ message: "User already completed registration. Please Sign in." });
      } else if (existingUser.status === "verified") {
        return res.status(400).json({ message: "Email verified. Please complete the sign-up process." });
      }
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Set code expiry time (e.g., 15 minutes from now)
    const codeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Create or update user with the verification code
    const user = existingUser || new NewUserModel({ email });
    user.code = code;
    user.codeExpiry = codeExpiry;
    user.status = "pending";
    await user.save();

    // Send the code via email
    await SendEmail(
      email,
      "Your Verification Code",
      `Your verification code is: ${code}`,
    );

    return res.status(200).json({
      status: 'success',
      message: "Verification code sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const verifyEmail = async (req, res) => {
  const { email, code } = req.body; // Email will be passed from frontend global state.

  if (!email || !code) {
    return res.status(400).json({ message: "Email and code are required." });
  }

  try {
    // Find the user by email and code
    const user = await NewUserModel.findOne({ email, code });

    if (!user) {
      return res.status(400).json({ message: "Invalid code or email." });
    }

    // Check if the code is expired
    if (new Date() > user.codeExpiry) {
      await NewUserModel.deleteOne({ email }); // Remove expired user entry
      return res.status(400).json({
        message: "Code has expired. Please request a new code."
      });
    }

    // Mark verification as successful
    user.code = undefined; // Remove the verification code
    user.codeExpiry = undefined; // Remove the expiry time
    user.status = "verified"; // Update the role
    await user.save();

    return res.status(200).json({
      message: "Verification successful. Proceed to sign up."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong during verification." });
  }
};


export const signUp = async (req, res) => {
  const { name, password, role, email } = req.body;

  // Validate inputs
  if (!name || !password || !role || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find the user
    const user = await NewUserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please restart the registration process." });
    }

    // Check if the user has already completed the sign-up process
    if (user.status === "completed") {
      return res.status(400).json({ message: "User already completed registration. Please log in." });
    }

    // Update the user model with password, role, and status
    user.password = password; // Password will be hashed automatically by the pre-save hook
    user.role = role;
    user.status = "completed";
    await user.save();

    // Create a profile for the user
    const profile = new UserProfileModel({
      userId: user._id,
      name,
    });
    await profile.save();

    return res.status(201).json({
      message: "Sign-up completed successfully. Please log in."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during sign-up." });
  }
};


export const emailAuth = async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Look for the user in the database and include the password field for comparison
    const user = await NewUserModel.findOne({ email }).select("+password");

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first." });
    }

    // Check if the user is linked with Google
    if (user.isGoogleAuth) {
      return res.status(403).json({
        message: "This account is linked to Google. Please log in using Google.",
      });
    }

    // Validate the provided password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Fetch additional user data from the profile collection
    const userProfile = await UserProfileModel.findOne({ userId: user._id });

    // Generate access and refresh tokens
    const accessToken = CreateAccessToken(user.email, user._id, user.role);
    const refreshToken = CreateRefreshToken(user.email, user._id, user.role);

    // Store the refresh token in a secure cookie
    StoreRefreshTokenInCookie(res, "refreshToken", refreshToken);

    // Return success response with user information
    return res.status(200).json({
      status: "success",
      message: "Authentication successful",
      accessToken,
      user: {
        email: user.email,
        role: user.role,
        // image: userProfile?.image,
        name: userProfile?.name || null,
      },
    });
  } catch (error) {
    console.error("Error in emailAuth:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


export const refreshToken = async (req, res) => {
    
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      status: 'fail',
      message: 'No refresh token provided',
    });
  }

  try {
    // Verify the refresh token
    const decoded = TokenDecode(refreshToken, REFRESH_TOKEN_SECRET_KEY);

    // Generate a new access token
    const newAccessToken = CreateAccessToken(decoded.email, decoded._id, decoded.role);

    return res.status(200).json({
      status: 'success',
      message: 'New access token generated',
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({
      status: 'fail',
      message: 'Invalid or expired refresh token',
    });
  }
};


export const logout = async (req, res) => {
    try {
        // Check if the refresh token exists in cookies
        if (!req.cookies || !req.cookies.refreshToken) {
            return res.status(400).json({ status: "fail", message: "No refresh token to log out." });
        }

        // Clear the refresh token from the cookies
        res.clearCookie('refreshToken', {
            httpOnly: true,  // Ensures the cookie is not accessible from JavaScript
            secure: true,    // Ensures the cookie is sent over HTTPS (ensure your app uses HTTPS)
            sameSite: 'Strict', // Optional, helps prevent CSRF attacks
        });

        return res.status(200).json({
            status: 'success',
            message: 'Successfully logged out.',
        });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to log out.',
        });
    }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // Check if the user exists
    const user = await NewUserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist.' });
    }

    if(user.isGoogleAuth){
      return res.status(404).json({ message: 'This email does not need password. It is linked with google.' });
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash and save the reset token in the database
    user.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetTokenExpiry = Date.now() + 3600000; // 1-hour expiry
    await user.save();

    // Generate the reset URL
    const resetURL = `${FRONTEND_URL}/reset-password/${resetToken}`; //'reset-password' should match the frontend routing path.

    // Send the reset email
    await SendEmail(
      email,
      'Password Reset Request',
      `You requested a password reset. Please click the link below to reset your password:\n\n${resetURL}\n\nIf you did not request this, please ignore this email.`
    );

    // Return the reset link in response (for development/testing purposes)
    return res.status(200).json({
      status: 'success',
      message: 'Password reset link has been sent.',
      resetURL, // For testing only; not in production
    });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required.' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    // Hash the received token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find the user with the token and ensure it's not expired
    const user = await NewUserModel.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Update the user's password
    user.password = password; // Pre-save middleware will hash it
    user.resetToken = undefined; // Clear the token
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password has been reset successfully. You can now log in with your new password.' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};