import { and, asc, count, eq, ilike, type SQL } from "drizzle-orm";
import { db } from "../../../database/client.ts";
import { enrollments } from "../../enrollments/db/index.ts";
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
	};
};

export const getCourses = async (
	args: GetCourses.Args,
): Promise<GetCourses.Response> => {
	const { search, orderBy, page } = args;

	const orderByColumn = orderBy === "id" ? courses.id : courses.title;

	const currentPage = page ?? 1;

	const conditions: SQL[] = [];

	if (search) {
		conditions.push(ilike(courses.title, `%${search}%`));
	}

	const [result, total] = await Promise.all([
		db
			.select({
				id: courses.id,
				title: courses.title,
				description: courses.description,
				enrollments: count(enrollments.id),
			})
			.from(courses)
			.leftJoin(enrollments, eq(enrollments.courseId, courses.id))
			.orderBy(asc(orderByColumn))
			.offset((currentPage - 1) * 2)
			.limit(10)
			.where(and(...conditions))
			.groupBy(courses.id),
		db.$count(courses, and(...conditions)),
	]);

	const allCourse = result.map((course) => ({
		...course,
		description: course.description ?? "",
	}));

	return {
		courses: allCourse,
		total,
	};
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
