import { Translations } from '../interfaces';
import classes from './Portfolio.module.css';

import dd from '../assets/deren-desktop.webp';
import dm from '../assets/deren-mobile.webp';
import md from '../assets/meyes-desktop.webp';
import mm from '../assets/meyes-mobile.webp';
import { CiDesktop, CiMobile1 } from 'react-icons/ci';
import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface PortfolioProps {
	name: string;
	href: string;
	mobile: string;
	desktop: string;
	tools: string[];
}

export const PortfolioItem = ({
	name,
	href,
	mobile,
	desktop,
	tools,
}: PortfolioProps) => {
	const [view, setView] = useState(false);

	function setPicture(name: string) {
		if (name === 'desktop' && view != false) {
			setView(false);
		}

		if (name === 'mobile' && view != true) {
			setView(true);
		}
	}

	return (
		<div className={classes.portfolio}>
			<h1>{name}</h1>
			<div className={classes.img_container}>
				<img src={view ? mobile : desktop} alt='' />
			</div>
			<div className={classes.info}>
				<div className={classes.view}>
					<CiDesktop
						onClick={() => setPicture('desktop')}
						className={view ? classes.icon : classes.icon_active}
					/>
					<CiMobile1
						onClick={() => setPicture('mobile')}
						className={view ? classes.icon_active : classes.icon}
					/>
				</div>
				<div className={classes.href}>
					<a
						href={href}
						target='_blank'
						rel='noreferrer'
						className={classes.href_a}
					>
						<FiExternalLink className={classes.href_icon} />
					</a>
				</div>
			</div>
			<div className={classes.tools}>
				{tools.map(tool => (
					<div id={tool} className={classes.tool}>
						{tool}
					</div>
				))}
			</div>
		</div>
	);
};

interface Props {
	translations: Translations;
	language: string;
}

export const Portfolio = ({ translations, language }: Props) => {
	return (
		<section className={classes.hero}>
			<div className={classes.profile}>
				<h1>{translations[language].portfolio.title} 💻</h1>
			</div>
			<p className={classes.subtitle}>
				{translations[language].portfolio.subtitle}
			</p>
			<div className={classes.portfolio_list}>
				<PortfolioItem
					name='creo.deren.com.ua'
					href='https://creo.deren.com.ua/'
					mobile={dm}
					desktop={dd}
					tools={['HTML', 'CSS', 'Sass', 'JavaScript']}
				/>
				<PortfolioItem
					name='meyes.app'
					href='https://meyes.app/'
					mobile={mm}
					desktop={md}
					tools={['HTML', 'CSS', 'Sass', 'JavaScript', 'Python']}
				/>
			</div>
		</section>
	);
};
