import type { SchemaToRequest } from "../../../types/request";
import type { createUser, getUsers } from "./schema";

export type GetUsersRequest = SchemaToRequest<typeof getUsers>;
export type CreateUserRequest = SchemaToRequest<typeof createUser>;
