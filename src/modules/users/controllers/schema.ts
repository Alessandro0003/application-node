import { z } from "zod";

export const createUser = z.object({
	body: z.object({
		name: z.string().min(1),
		email: z.string(),
	}),
});
