import e from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "../lib/db.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = e();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(e.json());

// Endpoint Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// React build serve
if (process.env.NODE_ENV === "production") {
  app.use(
    e.static(path.join(__dirname, "../../frontend/dist"))
  );

  app.get("/{*rest}", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../frontend/dist/index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
  connectDB();
});