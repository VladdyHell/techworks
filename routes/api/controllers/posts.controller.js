import PostsDAO from "../../dao/postsDAO.js";
import UsersDAO from "../../dao/usersDAO.js";
import { check, validationResult } from "express-validator";
import CustomError from "../../../lib/error.js";

export default class PostsCtrl {
  static apiValidatePost() {
    return [check("text", "Text is required").notEmpty()];
  }
  static async apiCreatePost(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        throw new CustomError("400", "Validation Error", errors.array());

      const user = await UsersDAO.getUserById(req.user.id);

      // req.body.text.trim();

      const post = await PostsDAO.createPost(
        req.user.id,
        req.body,
        user.firstName,
        user.lastName,
        user.avatar
      );

      res.json(post);
    } catch (e) {
      if (e.kind == "400") return res.status(e.kind).json(e);
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static async apiGetAllPosts(req, res) {
    try {
      const postsRes = await PostsDAO.getAllPosts();

      if (!postsRes) throw new CustomError("404", "Not a Single Post Found");

      res.json(postsRes);
    } catch (e) {
      if (e.kind == "404") return res.status(e.kind).json(e);
      res.status(500).json({ msg: "Server Error", error: e.toString() });
    }
  }

  static async apiGetPostById(req, res) {
    try {
      const postRes = await PostsDAO.getPostById(req.params.id);

      if (!postRes) throw new CustomError("404", "Post not found");

      res.json(postRes);
    } catch (e) {
      switch (e.kind) {
        case "404": {
          return res.status(404).json(e);
        }
        case "ObjectId": {
          return res
            .status(404)
            .json({ kind: e.kind, msg: "Post not found", error: e.toString() });
        }
        default:
          res
            .status(500)
            .json({ kind: "500", msg: "Server Error", error: e.toString() });
      }
    }
  }

  static async apiDeletePost(req, res) {
    try {
      const postRes = await PostsDAO.deletePost(req.user.id, req.params.id);

      if (!postRes) throw new CustomError("404", "Post Not Found");

      if (postRes.isError) throw postRes;

      res.json(postRes);
    } catch (e) {
      switch (e.kind) {
        case "404":
        case "401": {
          return res.status(e.kind).json(e);
        }
        case "ObjectId": {
          return res
            .status(404)
            .json({ kind: e.kind, msg: "Post Not Found", error: e.toString() });
        }
        default:
          res
            .status(500)
            .json({ kind: e.kind, msg: "Server Error", error: e.toString() });
      }
    }
  }

  static async apiLikePost(req, res) {
    try {
      const postRes = await PostsDAO.likePost(req.user.id, req.params.id);

      if (!postRes) throw new CustomError("404", "Post Not Found");

      if (postRes.isError) throw postRes;

      res.json(postRes);
    } catch (e) {
      switch (e.kind) {
        case "404":
        case "400": {
          return res.status(e.kind).json(e);
        }
        case "ObjectId": {
          return res
            .status(404)
            .json({ kind: e.kind, msg: "Post Not Found", error: e.toString() });
        }
        default:
          res.status(500).json({ msg: "Server Error", error: e.toString() });
      }
    }
  }
  static async apiUnlikePost(req, res) {
    try {
      const postRes = await PostsDAO.unlikePost(req.user.id, req.params.id);

      if (!postRes) throw new CustomError("404", "Post Not Found");

      if (postRes.isError) throw postRes;

      res.json(postRes);
    } catch (e) {
      switch (e.kind) {
        case "404":
        case "400": {
          return res.status(e.kind).json(e);
        }
        case "ObjectId": {
          return res
            .status(404)
            .json({ kind: e.kind, msg: "Post Not Found", error: e.toString() });
        }
        default:
          res.status(500).json({ msg: "Server Error", error: e.toString() });
      }
    }
  }

  static apiValidateComment() {
    return [check("text", "Text is required").notEmpty()];
  }

  static async apiCreateComment(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        throw new CustomError("400", "Validation Error", errors.array());

      const user = await UsersDAO.getUserById(req.user.id);

      const commentsRes = await PostsDAO.createComment(
        req.user.id,
        req.params.id,
        req.body,
        user.firstName,
        user.lastName,
        user.avatar
      );

      res.json(commentsRes);
    } catch (e) {
      if (e.kind == "400" || e.kind == "404") return res.status(e.kind).json(e);
      if (e.kind == "ObjectId")
        return res.status(404).json({
          kind: e.kind,
          msg: "Post Not Found",
          error: e.toString(),
        });
      res
        .status(500)
        .json({ kind: "500", msg: "Server Error", error: e.toString() });
    }
  }
  static async apiDeleteComment(req, res) {
    try {
      const commentRes = await PostsDAO.deleteComment(
        req.user.id,
        req.params.id,
        req.params.comment_id
      );
      res.json(commentRes);
    } catch (e) {
      switch (e.kind) {
        case "404":
        case "401": {
          res.status(e.kind).json(e);
        }
        case "ObjectId": {
          return res.status(404).json({
            kind: e.kind,
            msg: "404 Not Found",
            error: e.toString(),
          });
        }
        default: {
          console.error(`API: ${e}`);
          res.status(500).json({
            kind: "500",
            msg: "Server Error",
            error: e.toString(),
          });
        }
      }
    }
  }
}
