const express = require("express");
const router = express.Router();

const { addUser, editUser, getHomeData } = require("./user.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");

router.post("/profile", addUser);
router.put("/profile/:id", editUser);
router.get("/profile/home", getHomeData);

module.exports = router;
