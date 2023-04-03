const express = require("express");
const {
  register,
  login,
  logout,
  allUser,
  singleProfile
} = require("../controller/userController");
const authMiddleware = require("../middleware/Auth");

const router = express.Router();

router.post(`/register`, register);
router.post(`/login`, login);
router.get(`/logout`, logout);
router.get(`/users`, authMiddleware, allUser);
router.get(`/single-user/:id`, authMiddleware,singleProfile );

module.exports = router;
