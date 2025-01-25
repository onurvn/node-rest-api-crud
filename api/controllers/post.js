const PostSchema = require("../models/post");

const createPost = async (req, res) => {
    try {
        const newPost = await PostSchema.create(req.body);

        res.status(201).json({
            newPost
        });

    } catch (error) {
        return res.status(500).json({ message: "error" + error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const getPosts = await PostSchema.find();

        res.status(200).json({
            getPosts
        });

    } catch (error) {
        return res.status(500).json({ message: "error" + error.message });
    }
};

const getDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const detailPost = await PostSchema.findById(id);

        res.status(200).json({
            detailPost
        });

    } catch (error) {
        return res.status(500).json({ message: "error" + error.message });
    }
};

const getUpdate = async (req, res) => {
    const { id } = req.params;

    try {
        const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            updatePost
        });

    } catch (error) {
        return res.status(500).json({ message: "error" + error.message });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        await PostSchema.findByIdAndDelete(id);

        res.status(201).json({
            message: "success"
        });

    } catch (error) {
        return res.status(500).json({ message: "error" + error.message });
    }
};

const searchPost = async (req, res) => {
    const { search, tag } = req.query;
    try {
        const title = new RegExp(search, "i");

        const posts = await PostSchema.find({ $or: [{ title }], tag: { $in: tag.split(",") } });

        res.status(200).json({
            posts
        });


    } catch (error) {
        return res.status(500).json({ message: "error" + error.message });
    }
};

module.exports = { createPost, getPosts, getDetail, getUpdate, deletePost, searchPost };