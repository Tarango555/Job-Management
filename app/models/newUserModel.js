import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["client", "freelancer", "both"], // Example roles
  },
  status: {
    type: String,
    enum: ["pending", "verified", "completed"],
    default: "pending",
  },
  code: {
    type: String, // Temporary code for email verification
  },
  codeExpiry: {
    type: Date, // Expiration time for the verification code
  },
  isGoogleAuth: {
    type: Boolean,
    default: false,
  },
  resetToken: {
    type: String,
    select: false, // Do not include in queries unless explicitly requested
  },
  resetTokenExpiry: {
    type: Date,
    select: false,
  },
},
{
  timestamps: true,
  versionKey: false
}
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified("password")) return next();

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err); // Pass errors to the next middleware
  }
});

// Add a method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// TTL index to auto-delete unverified users
userSchema.index({ codeExpiry: 1 }, { expireAfterSeconds: 0 });

const NewUserModel = mongoose.model('NewUser', userSchema);

export default NewUserModel;