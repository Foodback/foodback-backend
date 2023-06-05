const express = require("express");
const router = express.Router();

const { addUser, editUser } = require("./user.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/profile", addUser);
router.put("/profile/:id", editUser);

module.exports = router;
