
import User from "../models/user.model.js";


import bcrypt from "bcryptjs";

import { v2 as cloudinary } from "cloudinary";

import Notification from "../models/notification.model.js";
export const getUserProfile = async (req, res) => {

const { username } = req.params;
try{
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
        return res.status(404).json({
        error: "User not found",
      });
    }
    res.status(200).json(user);

}catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}



export const followUnfollowUser = async (req, res) => {
  
  try {
     const { id } = req.params;
     const userToModify = await User.findById(id);
     const currentUser = await User.findById(req.user._id);
     if (id == req.user._id) {
        return res.status(400).json({
          error: "You cannot follow/unfollow yourself",
        });
      }
      if (!userToModify || !currentUser) return res.status(404).json({ error: "User not found" });
      const isFollowing = currentUser.following.includes(id);

      if (isFollowing) {
        //unfollow the user
        await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
        await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
        res.status(200).json({ message: "User unfollowed successfully" });
       
      } else {
        //follow the user
        await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
        await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
        //send notification to the user that they have a new follower
        const notification = new Notification({
          from: req.user._id,
          to: userToModify._id,
          type: "follow"
        });
        await notification.save();
        res.status(200).json({ message: "User followed successfully" });
      }
  }catch (error) {
    console.error("Error in followUnfollowUser:", error);
    res.status(500).json({
        error: "Internal Server Error",
    });
}
}


export const getSuggestedUsers = async (req, res) => {
    try{

        const usersFollowedByMe = await User.findById(req.user._id).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $nin: [...usersFollowedByMe.following, req.user._id] }
                }
            },
            {
                $sample: { size: 10 }
            }
        ]);
        const filteredUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id) && user._id.toString() !== req.user._id.toString());
        const suggestedUsers = filteredUsers.slice(0, 4)
        suggestedUsers.forEach(user => {
            user.password = null;
        });
        res.status(200).json(suggestedUsers);
    }catch(error){
        console.error("Error in getSuggestedUsers:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}



export const updateUserProfile = async (req, res) => {
  const {
    fullName,
    email,
    username,
    currentPassword,
    newPassword,
    bio,
    link,
  } = req.body;

  let { profileImg, coverImg } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Password change validation
    if ((!newPassword && currentPassword) || (newPassword && !currentPassword)) {
      return res.status(400).json({
        error: "Both current and new passwords are required",
      });
    }

    if (newPassword && currentPassword) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          error: "Current password is incorrect",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error: "New password must be at least 6 characters long",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
    }

    // Profile Image Upload
    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    // Cover Image Upload
    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }

    // Update fields
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();

    user.password = null;

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};