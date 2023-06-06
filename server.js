require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./app/modules/user.routes");
const diaryRoutes = require("./app/modules/diary.routes");

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.use(userRoutes);
router.use(diaryRoutes);

app.use("/api", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
