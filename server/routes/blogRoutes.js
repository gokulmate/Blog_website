// server/routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllBlog,
  getAllBlogId,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

router.get('/', getAllBlog);
router.post('/', createBlog);
router.get('/:id', getAllBlogId);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;