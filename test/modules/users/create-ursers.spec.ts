import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../src/app";

describe("Create a users", async () => {
	await app.ready();

	it("should be able to create a new user", async () => {
		const response = await request(app.server)
			.post("/users")
			.set("Content-Type", "application/json")
			.send({
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
			});

		expect(response.body).toEqual({
			statusCode: 201,
			message: "User created successfully",
		});
	});

	it("should not be able to create a user with an existing email", async () => {
		const email = faker.internet.email();

		await request(app.server)
			.post("/users")
			.set("Content-Type", "application/json")
			.send({
				name: faker.person.fullName(),
				email,
				password: faker.internet.password(),
			});

		const response = await request(app.server)
			.post("/users")
			.set("Content-Type", "application/json")
			.send({
				name: faker.person.fullName(),
				email,
				password: faker.internet.password(),
			});

		expect(response.body).toEqual({
			statusCode: 500,
			message: "Email already exists.",
		});
	});
});
