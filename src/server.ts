import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { coursesRoutes } from "./modules/courses/routes/index.ts";
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

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(usersRoutes, { prefix: "/users" });
app.register(coursesRoutes, { prefix: "/courses" });

app.listen({ port: 3333 }).then(() => {
	console.log("HTTP server running!");
});
