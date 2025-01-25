const moongose = require("mongoose");

const db = () => {
    moongose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("mongodb connected");
        })
        .catch((err) => {
            console.log("err" + err);
        })
}

module.exports = db;