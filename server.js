require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const router = require("./routes");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

try {
    mongoose.connect(config.mongoURI);
    console.log("success connect mongo")
} catch (error) {
    console.log(error)
}

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
