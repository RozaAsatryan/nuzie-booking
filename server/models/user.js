import mongoose from "mongoose";
import bcrypt from "bcrypt";
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
      validate: [validator.isEmail, "Enter valid email"],
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    image: {
      type: String,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);


userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      return next(err, false);
    }
    return next(null, match); 
  });
};

export default mongoose.model("User", userSchema);
