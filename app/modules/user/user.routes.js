const express = require("express");
const router = express.Router();

const { addUser, editUser, getHomeData, getMyProfile } = require("./user.controller");

const authMiddleware = require("../../middleware/auth.middleware");

router.post("/profile", addUser);
router.put("/profile/:id", authMiddleware, editUser);
router.get("/home", authMiddleware, getHomeData);
router.get("/profile", authMiddleware, getMyProfile)

module.exports = router;
