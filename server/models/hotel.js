import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const hotelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
      unique: [true, "Hotel already exists"],
    },
    content: {
      type: String,
      required: "Content is required",
      maxlength: 10000,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    bed: {
      type: Number,
    },
    orderedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
