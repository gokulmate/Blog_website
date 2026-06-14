// server/models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      minlength: [10, 'Description must be at least 10 characters']
    },
    author: {
      type: String,
      default: 'Anonymous'
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x200?text=Blog+Image'
    }
  },
  {
    timestamps: true  // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Blog', blogSchema);