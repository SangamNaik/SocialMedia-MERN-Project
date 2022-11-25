const express = require('express');
const {
  register,
  login,
  followAndUnfollowUser,
  logout,
  updatePassword,
  updateProfile,
  deleteMyAccount,
  myAccount,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMyPosts,
  getUserPosts,
  getUserProfile,
} = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/follow/:id').get(isAuthenticated, followAndUnfollowUser);

router.route('/update/password').put(isAuthenticated, updatePassword);

router.route('/update/profile').put(isAuthenticated, updateProfile);

router.route('/myAccount').get(isAuthenticated, myAccount);

router.route('/deleteMyAccount').delete(isAuthenticated, deleteMyAccount);

router.route('/user/:id').get(isAuthenticated, getUserProfile);

router.route('/myAccount/posts').get(isAuthenticated, getMyPosts);

router.route('/userPosts/:id').get(isAuthenticated, getUserPosts);

router.route('/users').get(isAuthenticated, getAllUsers);

router.route('/forgot/password').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

module.exports = router;
