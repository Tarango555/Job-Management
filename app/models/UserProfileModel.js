import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewUserModel", // References the User model
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  country: {
    type: String,
  },
},
{
    timestamps: true,
    versionKey: false
  }
);

const UserProfileModel = mongoose.model("UserProfile", profileSchema);

export default UserProfileModel;