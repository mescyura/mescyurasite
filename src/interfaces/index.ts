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
		download_cv: string;
		time: string[];
		portfolio: {
			title: string;
			subtitle: string;
			projects: {
				[key: string]: {
					name: string;
					hfer?: string;
					tools: string[];
					description: string;
				};
			};
		};
		contact_me: {
			thanks: string;
			email: string;
			message: string;
			message_placehorder: string;
			send: string;
			error: string;
			error_email: string;
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
