import type { SchemaToRequest } from "../../../types/request";
import type { createUser, getUserById, getUsers } from "./schema";

export type GetUserByIdRequest = SchemaToRequest<typeof getUserById>;
export type GetUsersRequest = SchemaToRequest<typeof getUsers>;
export type CreateUserRequest = SchemaToRequest<typeof createUser>;
