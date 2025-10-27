import { faker } from "@faker-js/faker";
import request from "supertest";
import { expect, test } from "vitest";
import { app } from "../../../src/app.ts";

test("create a course", async () => {
	await app.ready();

	const response = await request(app.server)
		.post("/courses")
		.set("Content-Type", "application/json")
		.send({ title: faker.lorem.words(3) });

	expect(response.body).toEqual({
		statusCode: 201,
		message: "Course created successfully",
	});
});
