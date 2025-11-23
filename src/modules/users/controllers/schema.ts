import { z } from "zod";

export const getUserById = z.object({
	params: z.object({
		id: z.string().uuid(),
	}),
});

export const getUsers = z.object({});

export const createUser = z.object({
	body: z.object({
		name: z.string().min(1),
		email: z.string(),
		password: z.string().min(6),
		role: z.enum(["student", "manager"]).optional(),
	}),
});
