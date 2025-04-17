const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  links: [
    {
      title: { type: String },
      link: { type: String },
      shortCode: { type: String, unique: true },
      status: { type: String, enum: ['active', 'inactive'], default: 'active' },
      createdAt: { type: Date, default: Date.now },
      clicks: { type: Number, default: 0 }
    },
  ],
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
