import type { FastifyReply } from "fastify";
import * as service from "../services/index.ts";
import type {
	CreateUserRequest,
	GetUserByIdRequest,
	GetUsersRequest,
} from "./types.ts";

export const getUserById = async (
	req: GetUserByIdRequest,
	repply: FastifyReply,
) => {
	try {
		const {
			params: { id },
		} = req;
		const user = await service.getUserById({ id });

		return repply.send({
			statusCode: 200,
			message: "User retrieved successfully",
			data: user,
		});
	} catch (error) {
		let message = "Error get user by id";

		if (error instanceof Error) {
			message = error.message;
		}

		return repply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};

export const getUsers = async (_req: GetUsersRequest, reply: FastifyReply) => {
	try {
		const users = await service.getUsers();

		return reply.send({
			statusCode: 200,
			message: "Users retrieved successfully",
			data: users,
		});
	} catch (error) {
		let message = "Error get users";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};

export const createUser = async (
	req: CreateUserRequest,
	reply: FastifyReply,
) => {
	try {
		const {
			body: { name, email, password },
		} = req;

		await service.createUser({ name, email, password });

		return reply.send({
			statusCode: 201,
			message: "User created successfully",
		});
	} catch (error) {
		let message = "Error create user";

		if (error instanceof Error) {
			message = error.message;
		}

			return reply.status(500).send({
				statusCode: 500,
				message,
			});
		}
	};