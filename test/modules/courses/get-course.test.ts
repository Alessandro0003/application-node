import { randomUUID } from "node:crypto";
import request from "supertest";
import { expect, test } from "vitest";
import { app } from "../../../src/app.ts";
import { makeCourse } from "../../factories/make-course.ts";

test("get courses", async () => {
	await app.ready();

	const titleId = randomUUID();

	const course = await makeCourse(titleId);

	const response = await request(app.server).get(`/courses?search=${titleId}`);

	expect(response.body).toEqual({
		statusCode: 200,
		message: "Courses retrieved successfully",
		data: {
			courses: [
				{
					id: expect.any(String),
					title: titleId,
					description: expect.any(String),
					enrollments: 0,
				},
			],
			total: 1,
		},
	});
});
