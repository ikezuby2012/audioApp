const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config({ path: "./config.env" });
const app = express();

const { textToSpeech } = require("./utils/audio");

//cors
app.use(cors());
//<-- parsing data to the backend
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//ping server
app.get("/", (req, res) => {
    res.send("server its working!");
});

app.post("/api/v1/audio", async (req, res) => {
    let { body } = req.body;
    // body = JSON.parse(body);
    console.log(body)
    try {
        const data = await textToSpeech(body);

        res.status(201).json({
            status: "success",
            data
        })
    } catch (err) {
        res.status(403).json({
            status: "failed",
            message: err.message
        })
    }
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`now listening to ${PORT}`);
});

