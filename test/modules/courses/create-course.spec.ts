import { faker } from "@faker-js/faker";
import request from "supertest";
import { expect, test } from "vitest";
import { app } from "../../../src/app.ts";
import { makeAuthenticateUser } from "../../factories/make-users.ts";

test("create a course", async () => {
	await app.ready();

	const { token } = await makeAuthenticateUser("manager");

	const response = await request(app.server)
		.post("/courses")
		.set("Content-Type", "application/json")
		.set("Authorization", token)
		.send({ title: faker.lorem.words(4) });

	expect(response.body).toEqual({
		statusCode: 201,
		message: "Course created successfully",
	});
});
