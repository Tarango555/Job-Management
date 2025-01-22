import NewUserModel from '../models/newUserModel.js';
import JobModel from './../models/JobModel.js';

export const createJob = async (req, res) => {
    const { email, _id, role } = req.user; // Extract user details from request
    const {
        title,
        description,
        skillsRequired,
        budget,
        timeline,
        experienceLevel,
        category,
        visibility,
        additionalFiles,
    } = req.body; // Extract job details from request body

    // Ensure the user is authenticated
    if (!email || !_id || !role) {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not authenticated.',
        });
    }

    try {
        // Validate the user exists in the database
        const user = await NewUserModel.findOne({ email, _id, role });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found.',
            });
        }

        // Create a new job posting
        const newJob = new JobModel({
            clientId: _id,
            title,
            description,
            skillsRequired,
            budget: {
                type: budget.type, // 'fixed' or 'hourly'
                amount: budget.amount,
                hourlyRateRange: budget.hourlyRateRange, // Optional for hourly jobs
            },
            timeline: {
                startDate: timeline.startDate,
                endDate: timeline.endDate,
            },
            experienceLevel,
            category,
            visibility,
            additionalFiles, // Expecting an array of files with {url, filename}
        });

        // Save the job posting to the database
        const savedJob = await newJob.save();

        // Send success response
        return res.status(201).json({
            status: 'success',
            message: 'Job created successfully!',
            data: savedJob,
        });
    } catch (error) {
        console.error('Error creating job:', error);

        // Handle server errors
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while creating the job.',
        });
    }
};


export const updateJobById = async (req, res) => {
  const { email, _id, role } = req.user;
  const { jobId } = req.params;
  const updatedData = req.body;

  if (!email || !_id || !role) {
    return res.status(400).json({
      status: 'fail',
      message: 'You are not authenticated.',
    });
  }

  try {
    // Find the job by ID and client ownership
    const job = await JobModel.findOne({ _id: jobId, clientId: _id });

    if (!job) {
      return res.status(404).json({
        status: 'fail',
        message: 'Job not found or you are not authorized to update this job.',
      });
    }

    // Update job details
    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Job updated successfully!',
      data: updatedJob,
    });
  } catch (error) {
    console.error('Error updating job:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the job.',
    });
  }
};


export const deleteJobById = async (req, res) => {
  const { email, _id, role } = req.user;
  const { jobId } = req.params;

  if (!email || !_id || !role) {
    return res.status(400).json({
      status: 'fail',
      message: 'You are not authenticated.',
    });
  }

  try {
    // Find the job by ID and client ownership
    const job = await JobModel.findOne({ _id: jobId, clientId: _id });

    if (!job) {
      return res.status(404).json({
        status: 'fail',
        message: 'Job not found or you are not authorized to delete this job.',
      });
    }

    // Delete the job
    await JobModel.findByIdAndDelete(jobId);

    res.status(200).json({
      status: 'success',
      message: 'Job deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting job:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while deleting the job.',
    });
  }
};


export const getJobById = async (req, res) => {
  const { email, _id, role } = req.user;
  const { jobId } = req.params;

  if (!email || !_id || !role) {
    return res.status(400).json({
      status: 'fail',
      message: 'You are not authenticated.',
    });
  }

  try {
    // Find the job by ID
    const job = await JobModel.findOne({ _id: jobId });

    if (!job) {
      return res.status(404).json({
        status: 'fail',
        message: 'Job not found.',
      });
    }

    // Authorization check: Ensure the client owns the job or job is public
    if (job.clientId.toString() !== _id && job.visibility !== 'public') {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to view this job.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: job,
    });
  } catch (error) {
    console.error('Error retrieving job:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving the job.',
    });
  }
};
