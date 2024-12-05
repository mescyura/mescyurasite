import { useEffect, useState } from 'react';
import img from './assets/img.jpg';
import { LanguageToggle } from './ui/LanguageToggle';
import { ThemeToggle } from './ui/ThemeToggle';
import { SkillItem } from './components/SkillItem';
import { SocialLink } from './components/SocialLink';
import { ContactModal } from './components/ContactModal';

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
		success: string;
		error: string;
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
		contactForm: 'Contact Form',
		name: 'Telegram nickname',
		message: 'Message',
		send: 'Send Message',
		success: 'Message sent successfully!',
		error: 'Failed to send message. Please try again.',
	},
	ua: {
		title: 'Фронтенд Розробник',
		subtitle: 'Створюю Красиві та Інтерактивні Веб-Рішення',
		viewWork: 'Мої Роботи',
		contact: "Зв'язатися",
		darkMode: 'Темна Тема',
		lightMode: 'Світла Тема',
		contactForm: "Форма Зв'язку",
		name: 'Нік в телеграм',
		message: 'Повідомлення',
		send: 'Надіслати',
		success: 'Повідомлення надіслано!',
		error: 'Помилка. Спробуйте ще раз',
	},
};

export interface Skills {
	text: string;
	icon: string;
	color: string;
}

const skills: Skills[] = [
	{ text: 'HTML5', icon: 'html5', color: '#dd683b' },
	{ text: 'CSS3', icon: 'css3', color: '#3f69e9' },
	{ text: 'JavaScript', icon: 'js', color: '#ebd94d' },
	{ text: 'React', icon: 'react', color: '#79c4da' },
	{ text: 'Figma', icon: 'figma', color: '#63cf8d' },
	{ text: 'Responsive Design', icon: 'code', color: '#ef7e6e' },
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
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
							<SkillItem
								key={index}
								text={skill.text}
								icon={skill.icon}
								color={skill.color}
							/>
						))}
					</div>

					<div>
						<button className='cta-button'>
							<a href='https://github.com'>{translations[language].viewWork}</a>
						</button>
						<button onClick={() => setIsModalOpen(true)} className='cta-button'>
							{translations[language].contact}
						</button>
					</div>

					<div className='social-links'>
						{socialLinks.map((link, index) => (
							<SocialLink key={index} href={link.href} icon={link.icon} />
						))}
					</div>
				</div>
			</section>
			<ContactModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				translations={translations}
				language={language}
			/>
		</>
	);
}

export default App;
