const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const taskModel = require("./models/taskmodel");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

app.post("/add", async (req, res) => {
  const { task } = req.body;
  try {
    await taskModel.create({ task });
    res.status(200).send({ message: "task added successfully" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// Connect to MongoDB first, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`App is started on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
