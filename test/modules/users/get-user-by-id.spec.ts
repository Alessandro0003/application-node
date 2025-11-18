import { randomUUID } from "node:crypto";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../src/app";
import { db } from "../../../src/database/client";
import { schema } from "../../../src/database/schema";
import { makeUsers } from "../../factories/make-users";

describe("GetById User", async () => {
	await app.ready();

	const { users } = schema;

	beforeEach(async () => {
		await db.delete(users);
	});

	it("should be able to get a user by id", async () => {
		const { user } = await makeUsers();

		const response = await request(app.server).get(`/users/${user.id}`);

		expect(response.body).toEqual({
			statusCode: 200,
			message: "User retrieved successfully",
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	});

	it("should not be able to get a user not existing", async () => {
		// const { user } = await makeUsers();

		const userIdNotExisti = randomUUID();

		const response = await request(app.server).get(`/users/${userIdNotExisti}`);

		expect(response.body).toEqual({
			statusCode: 500,
			message: "User not found.",
		});
	});
});
