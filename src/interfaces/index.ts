export interface Translations {
	[key: string]: {
		title: string;
		subtitle: string;
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
