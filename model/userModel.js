const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please Required Email"],
  },

  password: {
    type: String,
    trim: true,
    required: [true, "Please Required Password"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT, {
    expiresIn: "24h", // expires in 24 hours
  });
};

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
