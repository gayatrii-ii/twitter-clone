import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("==============");
    console.log("Logged in user:", userId);

    const allNotifications = await Notification.find();
    console.log("All notifications:", allNotifications);

    const notifications = await Notification.find({
      to: userId,
    });

    console.log("Matching notifications:", notifications);

    res.status(200).json(notifications);

  } catch (error) {
    console.log("Error in getNotifications controller:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({
      to: userId,
    });

    res.status(200).json({
      message: "Notifications deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteNotifications controller:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};





export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        error: "Notification not found",
      });
    }

    await Notification.findByIdAndDelete(id);

    res.status(200).json({
      message: "Notification deleted successfully",
    });

  } catch (error) {
    console.log("Error in deleteNotification controller:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};