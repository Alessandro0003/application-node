import type { FastifyRequest } from "fastify";
import type { z } from "zod";

export type SchemaToRequest<T extends z.ZodSchema> = FastifyRequest<{
	Params: z.infer<T>["params"];
	Body: z.infer<T>["body"];
	Querystring: z.infer<T>["query"];
}>;
