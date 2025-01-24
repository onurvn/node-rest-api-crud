require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.json({ message: "server test" });
});

app.listen(PORT, () => {
    console.log(`Server is runnnig ${PORT}`)
});
