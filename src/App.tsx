import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

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

const HOSTNAME = window.location.hostname;

function App() {
	const translations: Translations = data.translations;

	const [isDark, setIsDark] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem(`${HOSTNAME}-theme`);
		if (savedTheme) {
			return savedTheme === 'dark';
		}

		const systemTheme = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		return systemTheme;
	});

	const [language, setLanguage] = useState<string>(() => {
		return localStorage.getItem(`${HOSTNAME}-language`) || 'en';
	});

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		localStorage.setItem(`${HOSTNAME}-theme`, isDark ? 'dark' : 'light');
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	useEffect(() => {
		localStorage.setItem(`${HOSTNAME}-language`, language);
	}, [language]);

	const toggleTheme = () => {
		setIsDark(!isDark);
	};

	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'ua' : 'en');
	};

	return (
		<div className='relative min-h-dvh overflow-hidden bg-linear-to-br from-white to-zinc-200 text-zinc-900 transition-colors duration-300 dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-50'>
			{/* Tech background layers */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 opacity-70 dark:opacity-60'
				style={{
					backgroundImage:
						'repeating-linear-gradient(to right, rgba(15, 23, 42, 0.08) 0, rgba(15, 23, 42, 0.08) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 0, rgba(15, 23, 42, 0.08) 1px, transparent 1px, transparent 28px)',
				}}
			/>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 hidden dark:block'
				style={{
					backgroundImage:
						'repeating-linear-gradient(to right, rgba(255, 255, 255, 0.06) 0, rgba(255, 255, 255, 0.06) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 0, rgba(255, 255, 255, 0.06) 1px, transparent 1px, transparent 28px)',
				}}
			/>
			<div className='relative z-10 mx-auto w-full max-w-3xl px-4'>
				<AnimatePresence>
					{!isLoading && (
						<Loader onFinish={() => setIsLoading(true)} language={language} />
					)}
				</AnimatePresence>
				{isLoading && (
					<MotionConfig reducedMotion='user'>
						<BrowserRouter
							future={{
								v7_startTransition: true,
								v7_relativeSplatPath: true,
							}}
						>
							<Header
								toggleTheme={toggleTheme}
								toggleLanguage={toggleLanguage}
								isDark={isDark}
								translations={translations}
								language={language}
							/>

							<AnimatePresence mode='wait'>
								<Routes>
									<Route
										path='/'
										element={
											<motion.div
												key='home'
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -8 }}
												transition={{ duration: 0.25, ease: 'easeOut' }}
											>
												<Home translations={translations} language={language} />
											</motion.div>
										}
									/>
									<Route
										path='/portfolio'
										element={
											<motion.div
												key='portfolio'
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -8 }}
												transition={{ duration: 0.25, ease: 'easeOut' }}
											>
												<Portfolio
													translations={translations}
													language={language}
												/>
											</motion.div>
										}
									/>
									<Route
										path='/contact'
										element={
											<motion.div
												key='contact'
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -8 }}
												transition={{ duration: 0.25, ease: 'easeOut' }}
											>
												<Contact
													translations={translations}
													language={language}
												/>
											</motion.div>
										}
									/>
									<Route
										path='/*'
										element={
											<motion.div
												key='notfound'
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -8 }}
												transition={{ duration: 0.25, ease: 'easeOut' }}
											>
												<NotFound
													translations={translations}
													language={language}
												/>
											</motion.div>
										}
									/>
								</Routes>
							</AnimatePresence>

							<div className='-mx-4 w-[calc(100%+2rem)] sm:mx-0 sm:w-full'>
								<LetterGlitch
									glitchSpeed={50}
									centerVignette={false}
									outerVignette={true}
									smooth={true}
								/>
							</div>
							<Footer translations={translations} language={language} />
						</BrowserRouter>
					</MotionConfig>
				)}
				<Analytics />
				<SpeedInsights />
			</div>
		</div>
	);
}

export default App;
