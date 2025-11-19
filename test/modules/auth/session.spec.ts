import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../src/app";
import { makeUsers } from "../../factories/make-users";

describe("Session User", async () => {
	await app.ready();

	it("should be able to sign in a user", async () => {
		const { user, passwordBeforeHash } = await makeUsers();

		const response = await request(app.server)
			.post("/auth/sessions")
			.set("Content-Type", "application/json")
			.send({
				email: user.email,
				password: passwordBeforeHash,
			});

		expect(response.status).toEqual(200);
		expect(response.body).toEqual({
			statusCode: 200,
			message: "ok",
		});
	});
});
