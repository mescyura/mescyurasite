import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Translations } from './interfaces';

import { Header } from './components/header/Header';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { NotFound } from './pages/NotFound';

import data from './data/data.json';
import { Contact } from './pages/Contact';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
	const translations: Translations = data.translations;

	const [isDark, setIsDark] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem('mescyurasite-theme');
		return savedTheme === 'dark';
	});

	const [language, setLanguage] = useState<string>(() => {
		return localStorage.getItem('mescyurasite-language') || 'en';
	});

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
					<Route path='/portfolio' element={<Portfolio />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<Analytics />
			<SpeedInsights />
		</div>
	);
}

export default App;
