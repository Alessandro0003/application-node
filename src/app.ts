import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { coursesRoutes } from "./modules/courses/routes/index.ts";
import { enrollmentsRoutes } from "./modules/enrollments/routes/index.ts";
import { usersRoutes } from "./modules/users/routes/index.ts";

const app = fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "0.0.1",
	methods: "*",
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Api Documentation",
			version: "1.0.0",
			description: "This is the API documentation for our Fastify server.",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(usersRoutes, { prefix: "/users" });
app.register(coursesRoutes, { prefix: "/courses" });
app.register(enrollmentsRoutes, { prefix: "/enrollments" });

export { app };
