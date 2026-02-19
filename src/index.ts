import express, { type Request, type Response } from "express";
import { prisma } from "./lib/prisma";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8081;

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/users", userRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.send({
    status: "OK",
    timestamp: new Date().toISOString(),
    env: process.env.ENV!,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
