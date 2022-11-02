const Post = require("../models/postModels");

exports.getAllPosts = async (req, res, next) => {
	try {
		const posts = await Post.find();
		res.status(200).json({
			status: "getAllPosts success",
			results: posts.length,
			data: {
				posts: posts,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "getAllPosts fail",
		});
	}
};

exports.getOnePost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json({
			status: "getOnePost success",
			data: {
				post,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "getOnePost fail",
		});
	}
};

exports.createPost = async (req, res, next) => {
	try {
		const post = await Post.create(req.body);

		res.status(200).json({
			status: "createPost success",
			data: {
				post,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "createPost fail",
		});
	}
};

exports.updatePost = async (req, res, next) => {
	try {
		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: "updatePost success",
			data: {
				post,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "updatePost fail",
		});
	}
};

exports.deletePost = async (req, res, next) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: "deletePost success",
		});
	} catch (err) {
		res.status(400).json({
			status: "deletePost fail",
		});
	}
};
