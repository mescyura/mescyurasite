export interface Translations {
	[key: string]: {
		header: {
			home: string;
			portfolio: string;
			contact: string;
		};
		profile: string;
		profile_info: string;
		hobby: string;
		hobby_info: string;
		technologies: string;
		technologies_info: string;
		projects: string;
		projects_info: string;
		chat: string;
		chat_info: string;
		time: string[];
		portfolio: {
			title: string;
			subtitle: string;
		};
		contact_me: {
			thanks: string;
			email: string;
			message: string;
			message_placehorder: string;
			send: string;
		};
	};
}

export interface Skills {
	text: string;
	icon: string;
	color: string;
}

export interface SocialItems {
	href: string;
	icon: string;
}
