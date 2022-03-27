import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  likes_count: {
    type: Number,
    default: 0,
  },
});

const Comments = mongoose.model("comment", CommentSchema);
export default Comments;
