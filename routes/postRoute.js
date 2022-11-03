const express = require("express");
const protect = require("../middlewares/authMiddleware");

const {
	createPost,
	getAllPosts,
	getOnePost,
	updatePost,
	deletePost,
} = require("../controllers/postController");

const router = express.Router();

// localhost:4000
router.route("/").get(getAllPosts).post(protect, createPost);

router
	.route("/:id")
	.get(getOnePost)
	.patch(protect, updatePost)
	.delete(protect, deletePost);

module.exports = router;
