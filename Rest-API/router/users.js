const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get('/profile', auth(),authController.getProfileInfo);
router.get('/profile/bookmarks', auth(),authController.userBookmars);
router.put('/profile', auth(),authController.editProfileInfo);

module.exports = router