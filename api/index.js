require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const Auth = require("./routes/auth");
const Post = require("./routes/post");

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", Auth);
app.use("/", Post);

const PORT = process.env.PORT || 5001;

// app.get("/", (req, res) => {
//     res.json({ message: "server test" });
// });

db();

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
});
