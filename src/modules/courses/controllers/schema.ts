import z from "zod";

export const getCourseById = z.object({
	params: z.object({
		id: z.string().uuid("Invalid course ID"),
	}),
});

export const getCourses = z.object({
	query: z.object({
		search: z.string().optional(),
		orderBy: z.enum(["title", "id"]).optional().default("title"),
		page: z.coerce.number().optional(),
	}),
});

export const createCourse = z.object({
	body: z.object({
		title: z.string().min(1, "Title is required"),
		description: z.string().min(1, "Description is required"),
	}),
});
