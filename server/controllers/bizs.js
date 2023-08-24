import Biz from "../models/Biz.js";
import User from "../models/User.js";

//Create a business
export const createBiz = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newBiz = new Biz({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newBiz.save();

    const biz = await Biz.find();
    res.status(201).json(biz);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//View a business
export const getFeedBizs = async (req, res) => {
  try {
    const biz = await Biz.find();
    res.status(200).json(biz);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Get the user's businesses
export const getUserBizs = async (req, res) => {
  try {
    const { userId } = req.params;
    const biz = await Biz.find({ userId });
    res.status(200).json(biz);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Like the business
export const likeBiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const biz = await Biz.findById(id);
    const isLiked = biz.likes.get(userId);

    if (isLiked) {
      biz.likes.delete(userId);
    } else {
      biz.likes.set(userId, true);
    }

    const updatedBiz = await Biz.findByIdAndUpdate(
      id,
      { likes: biz.likes },
      { new: true }
    );

    res.status(200).json(updatedBiz); //update the frontend
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
