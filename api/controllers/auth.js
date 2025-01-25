const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await Auth.findOne({ email });

        if (user) {
            return res.status(500).json({ message: "Email already exists." });
        }

        if (password.length < 6) {
            return res.status(500).json({ message: "Password must be longer than 6 characters." });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await Auth.create({ username, email, password: passwordHash });

        const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

        res.status(201).json({
            status: "OK",
            newUser,
            userToken
        });

    } catch (error) {
        return res.status(500).json({ message: "error" + error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(500).json({ message: "User not found." })
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(500).json({ message: "Wrong password." })
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

        res.status(200).json({
            status: "OK",
            user,
            token
        });

    } catch (error) {
        return res.status(500).json({ message: "error" + error.message });
    }
}

module.exports = { register, login };