export interface Translations {
	[key: string]: {
		profile: string;
		profile_info: string;
		title2: string;
		subtitle2: string;
		technologies: string;
		technologies_info: string;
		projects: string;
		projects_info: string;
		viewWork: string;
		contact: string;
		darkMode: string;
		lightMode: string;
		contactForm: string;
		name: string;
		message: string;
		send: string;
		close: string;
		success: string;
		error: string;
		tryAgain: string;
		allGood: string;
		ok: string;
		header: {
			home: string;
			portfolio: string;
			contact: string;
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
