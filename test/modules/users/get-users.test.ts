import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../src/app";
import { db } from "../../../src/database/client";
import { schema } from "../../../src/database/schema";
import { makeUsers } from "../../factories/make-users";

describe("Get Users", async () => {
	await app.ready();

	const { users } = schema;

	beforeEach(async () => {
		await db.delete(users);
	});

	it("should be able to get a list of users", async () => {
		const user = await makeUsers({});

		const response = await request(app.server).get("/users");

		expect(response.body).toEqual({
			statusCode: 200,
			message: "Users retrieved successfully",
			data: [
				{
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			],
		});
	});
});
