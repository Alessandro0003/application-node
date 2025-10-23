export namespace GetCourseById {
	export type Args = {
		id: string;
	};

	export type Response = {
		id: string;
		title: string;
		description: string;
	};
}

export namespace GetCourse {
	export type Args = {};
	export type Response = {
		id: string;
		title: string;
		description: string;
	}[];
}
export namespace CreateCourse {
	export type Args = {
		title: string;
		description: string;
	};
	export type Response = {};
}
