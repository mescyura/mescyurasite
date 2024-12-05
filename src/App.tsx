import { useEffect, useState } from 'react';
import img from './assets/img.jpg';
import { LanguageToggle } from './ui/LanguageToggle';
import { ThemeToggle } from './ui/ThemeToggle';
import { SkillItem } from './components/SkillItem';
import { SocialLink } from './components/SocialLink';

export interface Translations {
	[key: string]: {
		title: string;
		subtitle: string;
		viewWork: string;
		contact: string;
		darkMode: string;
		lightMode: string;
	};
}

const translations: Translations = {
	en: {
		title: 'Frontend Developer',
		subtitle: 'Crafting Beautiful & Interactive Web Experiences',
		viewWork: 'View My Work',
		contact: 'Contact Me',
		darkMode: 'Dark Mode',
		lightMode: 'Light Mode',
	},
	ua: {
		title: 'Фронтенд Розробник',
		subtitle: 'Створюю Красиві та Інтерактивні Веб-Рішення',
		viewWork: 'Мої Роботи',
		contact: "Зв'язатися",
		darkMode: 'Темна Тема',
		lightMode: 'Світла Тема',
	},
};

const skills: string[] = [
	'HTML5',
	'CSS3',
	'JavaScript',
	'React',
	'Responsive Design',
];

interface SocialLinks {
	href: string;
	icon: string;
}

const socialLinks: SocialLinks[] = [
	{ href: 'https://github.com/mescyura', icon: 'github' },
	{ href: 'https://linkedin.com/in/yura-holyda', icon: 'linkedin' },
	{ href: 'https://twitter.com/mescyuraa', icon: 'twitter' },
	{ href: 'https://t.me/mescyura', icon: 'telegram' },
];

function App() {
	const [isDark, setIsDark] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem('theme');
		return savedTheme === 'dark';
	});

	const [language, setLanguage] = useState<string>(() => {
		return localStorage.getItem('language') || 'en';
	});

	useEffect(() => {
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		document.documentElement.setAttribute(
			'data-theme',
			isDark ? 'dark' : 'light'
		);
	}, [isDark]);

	useEffect(() => {
		localStorage.setItem('language', language);
	}, [language]);

	const toggleTheme = () => {
		setIsDark(!isDark);
		document.documentElement.setAttribute(
			'data-theme',
			!isDark ? 'dark' : 'light'
		);
	};

	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'ua' : 'en');
	};

	return (
		<>
			<header className='header'>
				<ThemeToggle
					toggleTheme={toggleTheme}
					isDark={isDark}
					translations={translations}
					language={language}
				/>
				<LanguageToggle toggleLanguage={toggleLanguage} language={language} />
			</header>
			<section className='hero'>
				<div className='content'>
					<img
						src={img}
						alt='Professional headshot of a young man with short dark hair wearing a dark crewneck sweatshirt'
						className='profile-image'
					/>
					<h1>{translations[language].title}</h1>
					<p className='title'>{translations[language].subtitle}</p>

					<div className='skills'>
						{skills.map((skill, index) => (
							<SkillItem key={index} skill={skill} />
						))}
					</div>

					<div>
						<a href='https://github.com' className='cta-button'>
							{translations[language].viewWork}
						</a>
						<a href='mailto:mescyura@gmail.com' className='cta-button'>
							{translations[language].contact}
						</a>
					</div>

					<div className='social-links'>
						{socialLinks.map((link, index) => (
							<SocialLink key={index} href={link.href} icon={link.icon} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default App;
