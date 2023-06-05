const express = require("express")
const router = express.Router()

const { 
  addUser
} = require("./user.controller")

const { authMiddleware } = require("../middleware/auth.middleware")

router.post("/profile", addUser)

module.exports = router
