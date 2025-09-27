const fastify = require("fastify");
const crypto = require("node:crypto");

const server = fastify();

const courses = [
	{ id: "1", name: "Node.js" },
	{ id: "2", name: "React.js" },
	{ id: "3", name: "React Native" },
];

server.get("/courses", () => {
	return { courses, page: 1 };
});

server.post("/courses", (request, reply) => {
	const courseId = crypto.randomUUID();
	courses.push({ id: courseId, name: "TypeScript" });

	return reply.status(201).send({
		id: courseId,
		name: "TypeScript",
	});
});

server.listen({ port: 3333 }).then(() => {
	console.log("Server running on http://localhost:3333");
});
