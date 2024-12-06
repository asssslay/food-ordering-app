const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      _id: false // Disable auto-generated _id
    }
  );

module.exports = mongoose.model("User", userSchema);