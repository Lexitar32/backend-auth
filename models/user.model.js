const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    timeZone: {
      type: String
    },
    refreshToken: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.refreshToken;
  delete userObject.__v;
  return userObject;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
