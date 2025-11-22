import { z } from "zod";

export const jwt = z.object({
	JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});
