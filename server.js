import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import auth from "./routes/api/routing/auth.route.js";
import posts from "./routes/api/routing/posts.route.js";
import profile from "./routes/api/routing/profile.route.js";
import users from "./routes/api/routing/users.route.js";

const app = express();

connectDB();

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/posts", posts);
app.use("/api/v1/profile", profile);
app.use("/api/v1/users", users);

app.listen(port, () => console.log(`Server started on port ${port}`));

// For separating listen method when the database gets connected
export default app;
