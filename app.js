const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const taskModel = require("./models/taskmodel");
const app = express();

mongoose.connect(process.env.MONGO_URI);

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

app.post("/add", async(req,res) => {
    const {task} = req.body
    try{
        await taskModel.create({task})
        res.status(200).send({message:"task added successfully"})
    }catch(e){
        res.status(400).send({message:e.message})
    }
})

app.listen(process.env.PORT, () => {
    console.log("App is started...");
});
