import mongoose from "mongoose";

const bizSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    }, //O(n) vs O(1) for array vs for map
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Biz = mongoose.model("Biz", bizSchema);

export default Biz;
