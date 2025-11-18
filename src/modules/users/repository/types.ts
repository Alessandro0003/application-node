export namespace GetUserById {
	export type Args = {
		id: string;
	};

	export type Response = {
		id: string;
		name: string;
		email: string;
		role: string;
	};
}

export namespace GetUsers {
	export type Args = {};

	export type Response = {
		id: string;
		name: string;
		email: string;
	}[];
}

export namespace CreateUser {
	export type Args = {
		name: string;
		email: string;
		password: string;
	};
}
