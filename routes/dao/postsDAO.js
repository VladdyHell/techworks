import Post from "../../models/Post.js";
import Comments from "../../models/Post.Comment.js";
import CustomError from "../../lib/error.js";

export default class PostsDAO {
  static async createPost(userId, postBody, fName, lName, avatar) {
    try {
      const post = new Post({
        // ...postBody,
        text: postBody.text.trim(),
        user: userId,
        firstName: fName,
        lastName: lName,
        avatar: avatar,
      });
      const savedPostRes = await post.save(/*{ upsert: true }*/);
      // .then((p) => p.populate("user", ["email"]));
      // Doesn't need to be populated since it already has its fields
      const createdPostRes = await savedPostRes.populate("user comments", [
        "email",
        "firstName",
        "lastName",
        "avatar",
      ]);
      return createdPostRes;
    } catch (e) {
      console.error(`Unable to create post: ${e.stack}`);
      throw e;
    }
  }

  static async getAllPosts() {
    try {
      const getPostsRes = await Post.find().sort({ date: -1 });

      if (getPostsRes.length == 0) return;

      return getPostsRes;
    } catch (e) {
      console.error(`Unable to get all posts: ${e.stack}`);
      throw e;
    }
  }

  static async getPostById(id) {
    try {
      const getPostRes = await Post.findById(id).populate("comments._id", [
        "text",
        "firstName",
        "lastName",
        "avatar",
      ]);
      return getPostRes;
    } catch (e) {
      console.error(`Unable to get post by ID: ${e.stack}`);
      throw e;
    }
  }

  static async deletePost(userId, postId) {
    try {
      const post = await Post.findById(postId);

      if (!post) return;

      if (post.user.toString() != userId)
        return new CustomError("401", "User not authorized");

      const deletePostRes = await post.deleteOne();

      return deletePostRes;
    } catch (e) {
      console.error(`Unable to delete post ${e.stack}`);
      throw e;
    }
  }

  // @route		Profile
  static async deleteAllPosts(userId) {
    try {
      const deleteAllPostsRes = await deleteMany({ user: userId });
      return deleteAllPostsRes;
    } catch (e) {
      console.error(`Unable to delete all posts: ${e}`);
      throw e;
    }
  }

  static async likePost(userId, postId) {
    try {
      const post = await Post.findById(postId);

      if (!post) return;

      if (post.likes.some((like) => like._id.toString() == userId))
        return new CustomError("400", "Post Already Liked");

      post.likes.unshift({ _id: userId });
      // post.likes_count += 1;
      post.likes_count = post.likes.length;

      const likePostRes = await post.save();

      await likePostRes.populate({
        path: "likes._id",
        // model: "user",
        select: "firstName lastName",
      });

      return likePostRes.likes;
    } catch (e) {
      console.error(`Unable to like post: ${e.stack}`);
      throw e;
    }
  }

  static async unlikePost(userId, postId) {
    try {
      const post = await Post.findById(postId);

      if (!post) return;

      if (!post.likes.some(({ _id }) => _id.toString() == userId))
        return new CustomError("400", "Post Has Not Been Liked");

      post.likes = post.likes.filter(({ _id }) => _id.toString() != userId);
      // post.likes_count -= 1;
      post.likes_count = post.likes.length;

      const unlikePostRes = await post.save();

      await unlikePostRes.populate("likes._id", ["firstName lastName"]);
      return unlikePostRes.likes;
    } catch (e) {
      console.error(`Unable to unlike post: ${e.stack}`);
      throw e;
    }
  }

  static async createComment(
    userId,
    postId,
    commentBody,
    fName,
    lName,
    avatar
  ) {
    try {
      const post = await Post.findById(postId);

      if (!post) throw new CustomError("404", "Post Not Found");

      const comment = new Comments({
        // ...commentBody,
        text: commentBody.text.trim(),
        user: userId,
        post: postId,
        firstName: fName,
        lastName: lName,
        avatar: avatar,
      });

      const createdCommentRes = await comment.save(/*{ upsert: true }*/);

      // const post = await Post.findByIdAndUpdate(postId, {
      //   $push: { comments: { comment: createdCommentRes._id.toString() } },
      // });

      post.comments.push({ _id: createdCommentRes._id.toString() });

      await post.save();

      // createdCommentRes.post = post;
      return createdCommentRes;
    } catch (e) {
      console.error(`Unable to create comment: ${e.stack}`);
      throw e;
    }
  }

  static async deleteComment(userId, postId, commentId) {
    try {
      const post = await Post.findById(postId);
      const comment = await Comments.findById(commentId);

      if (!post) throw new CustomError("404", "Post Not Found");
      if (!comment) throw new CustomError("404", "Comment Not Found");

      if (comment.user.toString() != userId)
        throw new CustomError("401", "User Not Authorized");

      post.comments = post.comments.filter(
        (comment) => comment._id.toString() != commentId
      );

      await post.save();
      const deletedCommentRes = await comment.deleteOne();

      return deletedCommentRes;
    } catch (e) {
      console.error(`Unable to delete comment: ${e.stack}`);
      throw e;
    }
  }
}
