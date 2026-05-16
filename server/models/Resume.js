const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    skills: [String],
    experience: Array,
    education: Array
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'Resume',
  ResumeSchema
);