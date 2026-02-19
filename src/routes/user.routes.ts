import { Router } from "express";
import {
    createUser,
    getUserById,
    getUsers,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);
userRoutes.get("/:id", getUserById);

export default userRoutes;