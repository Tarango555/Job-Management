import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming 'User' is the name of the client model
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Job title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    skillsRequired: {
      type: [String], // Array of skill names (e.g., ['React', 'Node.js'])
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one skill is required',
      },
    },
    budget: {
      type: {
        type: String,
        enum: ['fixed', 'hourly'], // Specify budget type
        required: [true, 'Budget type is required'],
      },
      amount: {
        type: Number,
        required: [true, 'Budget amount is required'],
        min: [0, 'Budget amount must be positive'],
      },
      hourlyRateRange: {
        min: { type: Number, min: 0 }, // Minimum hourly rate
        max: { type: Number, min: 0 }, // Maximum hourly rate
      },
    },
    timeline: {
      startDate: { type: Date, required: [true, 'Start date is required'] },
      endDate: { type: Date, required: [true, 'End date is required'] },
    },
    experienceLevel: {
      type: String,
      enum: ['Junior', 'Mid-level', 'Senior'],
      required: [true, 'Experience level is required'],
    },
    category: {
      type: String,
      required: [true, 'Job category is required'],
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
      required: [true, 'Job visibility is required'],
    },
    additionalFiles: {
      type: [
        {
          url: { type: String, required: true },
          filename: { type: String, required: true },
        },
      ],
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'closed'],
      default: 'draft',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false
  }
);

// Pre-save hook to update updatedAt timestamp
jobSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const JobModel = mongoose.model('Job', jobSchema);

export default JobModel;