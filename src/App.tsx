import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Translations } from './interfaces';

import { Header } from './components/header/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Reviews } from './pages/Reviews';
import { Portfolio } from './pages/Portfolio';
import { NotFound } from './pages/NotFound';

import data from './data/data.json';

function App() {
	const translations: Translations = data.translations;

	const [isDark, setIsDark] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem('theme');
		return savedTheme === 'dark';
	});

	const [language, setLanguage] = useState<string>(() => {
		return localStorage.getItem('language') || 'ua';
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
					<Route path='/about' element={<About />} />
					<Route path='/services' element={<Services />} />
					<Route path='/reviews' element={<Reviews />} />
					<Route path='/portfolio' element={<Portfolio />} />
					<Route path='/not-found' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
