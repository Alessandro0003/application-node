import { eq } from "drizzle-orm";
import { db } from "../../../database/client.ts";
import { courses } from "../db/index.ts";
import type { CreateCourse, GetCourseById, GetCourses } from "./types.ts";

export const getCourseById = async (
	args: GetCourseById.Args,
): Promise<GetCourseById.Response> => {
	const { id } = args;

	const result = await db.select().from(courses).where(eq(courses.id, id));

	const course = result[0];

	return {
		...course,
		description: course.description || "",
	};
};

export const getCourses = async (): Promise<GetCourses.Response> => {
	const result = await db.select().from(courses);

	return result.map((courses) => ({
		...courses,
		description: courses.description || "",
	}));
};

export const createCourse = async (
	args: CreateCourse.Args,
): Promise<CreateCourse.Response> => {
	const { title, description } = args;

	const course = await db.insert(courses).values({
		title,
		description,
	});

	return course;
};
