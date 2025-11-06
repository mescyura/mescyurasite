import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Translations } from './interfaces';

import { Header } from './components/header/Header';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import Footer from './components/footer/Footer';
import Loader from './components/loader/Loader';

import data from './data/data.json';
import LetterGlitch from './ui/LetterGlitch/LetterGlitch';

function App() {
	const translations: Translations = data.translations;

	const [isDark, setIsDark] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem('mescyurasite-theme');
		if (savedTheme) {
			return savedTheme === 'dark';
		}

		const systemTheme = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;
		return systemTheme;
	});

	const [language, setLanguage] = useState<string>(() => {
		return localStorage.getItem('mescyurasite-language') || 'en';
	});

	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		localStorage.setItem('mescyurasite-theme', isDark ? 'dark' : 'light');
		document.documentElement.setAttribute(
			'data-theme',
			isDark ? 'dark' : 'light'
		);
	}, [isDark]);

	useEffect(() => {
		localStorage.setItem('mescyurasite-language', language);
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
		<div className='main-content'>
			{isLoading && <Loader />}
			<BrowserRouter>
				<Header
					toggleTheme={toggleTheme}
					toggleLanguage={toggleLanguage}
					isDark={isDark}
					translations={translations}
					language={language}
				/>

				<Routes>
					<Route
						path='/'
						element={<Home translations={translations} language={language} />}
					></Route>
					<Route
						path='/portfolio'
						element={
							<Portfolio translations={translations} language={language} />
						}
					/>
					<Route
						path='/contact'
						element={
							<Contact translations={translations} language={language} />
						}
					/>
					<Route path='/*' element={<NotFound />} />
				</Routes>
				<LetterGlitch
					glitchSpeed={50}
					centerVignette={false}
					outerVignette={true}
					smooth={true}
				/>
				<Footer />
			</BrowserRouter>
			<Analytics />
			<SpeedInsights />
		</div>
	);
}

export default App;
