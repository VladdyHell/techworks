import { Router } from "express";
import auth from "../../../middleware/auth.js";
import PostsCtrl from "../../api/controllers/posts.controller.js";
import multer from "multer";

const router = Router();

router
  .route("/")
  // @route  POST api/v1/posts
  // @desc   Create a post
  // @access Private
  .post(auth, PostsCtrl.apiValidatePost(), PostsCtrl.apiCreatePost)

  // @route  GET api/v1/posts
  // @desc   Get all posts
  // @access Private
  .get(auth, PostsCtrl.apiGetAllPosts);

// @route  GET api/v1/posts/:id
// @desc   Get post by ID
// @access Private
router
  .route("/:id")
  .get(auth, PostsCtrl.apiGetPostById)

  // @route  DELETE api/v1/posts/:id
  // @desc   Delete a post
  // @access Private
  .delete(auth, PostsCtrl.apiDeletePost);

// @route  PUT api/v1/posts/:id/like
// @desc   Like a post
// @access Private
router.put("/:id/like", auth, PostsCtrl.apiLikePost);

// @route  PUT api/v1/posts/:id/unlike
// @desc   Unlike a post
// @access Private
router.put("/:id/unlike", auth, PostsCtrl.apiUnlikePost);

// @route  POST api/v1/posts/:id/comment
// @desc   Comment on a post
// @access Private
router.post(
  "/:id/comment",
  auth,
  PostsCtrl.apiValidateComment(),
  PostsCtrl.apiCreateComment
);

// @route  DELETE api/v1/posts/:id/comment/:comment_id
// @desc   Delete a comment
// @access Private
router.delete("/:id/comment/:comment_id", auth, PostsCtrl.apiDeleteComment);

export default router;
