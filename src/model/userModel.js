const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: String,
  githubId: { type: String, sparse: true },
  googleId: { type: String, sparse: true },
  avatar: { type: String },
  links: [
    {
      title: { type: String },
      link: { type: String },
      shortCode: { type: String },
      status: { type: String, enum: ['active', 'inactive'], default: 'active' },
      createdAt: { type: Date, default: Date.now },
      clicks: { type: Number, default: 0 }
    },
  ],
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
