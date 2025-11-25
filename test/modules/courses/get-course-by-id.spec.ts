import request from "supertest";
import { expect, test } from "vitest";
import { app } from "../../../src/app.ts";
import { makeCourse } from "../../factories/make-course.ts";
import { makeAuthenticateUser } from "../../factories/make-users.ts";

test("get course by id", async () => {
	await app.ready();

	const { token } = await makeAuthenticateUser("student");
	const course = await makeCourse();

	const response = await request(app.server)
		.get(`/courses/${course.id}`)
		.set("Authorization", token);

	expect(response.body).toEqual({
		statusCode: 200,
		message: "Course retrieved successfully",
		data: {
			id: expect.any(String),
			title: expect.any(String),
			description: null,
		},
	});
});
