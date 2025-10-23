import * as repository from "../repository/index.ts";
import type { CreateCourse, GetCourse } from "./types.ts";

export const getCourses = async (): Promise<GetCourse.Response> => {
	const courses = await repository.getCourses();

	return courses;
};

export const createCourse = async (
	args: CreateCourse.Args,
): Promise<CreateCourse.Response> => {
	const { title, description } = args;

	const courses = await repository.getCourses();
	const isTitleExists = courses.some((course) => course.title === title);

	if (isTitleExists) {
		throw new Error("Title already exists");
	}

	const course = await repository.createCourse({
		title,
		description,
	});

	return course;
};
