import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true
  }
);

userSchema.pre("save", function(next) {
  let user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log("generating salt failed");
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        console.log("Hashing failed");
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, (err, equal) => {
    if (err) {
      return callback(err);
    }
    callback(null, equal);
  });
};

export default mongoose.model("User", userSchema);
