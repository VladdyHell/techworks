import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import auth from "./routes/api/auth.js";
import posts from "./routes/api/posts.js";
import profile from "./routes/api/profile.js";
import users from "./routes/api/users.js";

const app = express();

connectDB();

const port = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/posts", posts);
app.use("/api/v1/profile", profile);
app.use("/api/v1/users", users);

app.listen(port, () => console.log(`Server started on port ${port}`));

// For separating listen method when the database connected
export default app;
