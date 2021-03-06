import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  likes_count: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("post", PostSchema);
export default Post;
