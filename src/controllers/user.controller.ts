import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
        return;
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, name, email, password } = req.body;

        if (!username || !name || !email || !password) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const existingUser = await prisma.user.findUnique({
            where: { username, email },
        });

        if (existingUser) {
            res
                .status(409)
                .json({ error: "User with username or email already exists" });
            return;
        }

        const newUser = await prisma.user.create({
            data: {
                username: username,
                name: name,
                email: email,
                password: password,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
        return;
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: String(id) },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
        return;
    }
};