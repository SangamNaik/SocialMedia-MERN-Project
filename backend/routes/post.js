const express = require('express');
const {
  createPost,
  likeAndDislikePost,
  updateCaption,
  deletePost,
  getPostOfFollowing,
  commentOnPost,
  deleteComment,
} = require('../controllers/post');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/post/upload').post(isAuthenticated, createPost);

router
  .route('/post/:id')
  .get(isAuthenticated, likeAndDislikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router.route('/posts').get(isAuthenticated, getPostOfFollowing);

router
  .route('/post/comment/:id')
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
