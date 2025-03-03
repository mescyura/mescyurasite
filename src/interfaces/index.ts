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
