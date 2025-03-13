import { Translations } from '../interfaces';
import classes from './Portfolio.module.css';

import dd from '../assets/deren-desktop.webp';
import dm from '../assets/deren-mobile.webp';
import md from '../assets/meyes-desktop.webp';
import mm from '../assets/meyes-mobile.webp';
import sbd from '../assets/shopbakery-desktop.webp';
import sbm from '../assets/shopbakery-mobile.webp';
import doed from '../assets/doe-desktop.webp';
import { CiDesktop, CiMobile1 } from 'react-icons/ci';
import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface PortfolioItemModalProps {
	isOpen: boolean;
	view: boolean;
	mobile?: string;
	desktop?: string;
	setPicture: (name: string) => void;
	onClose: () => void;
}

export const PortfolioItemModal = ({
	isOpen,
	view,
	mobile,
	desktop,
	setPicture,
	onClose,
}: PortfolioItemModalProps) => {
	return (
		<div
			className={`${classes.modal_overlay} ${isOpen ? '' : classes.is_hidden}`}
		>
			<div className={classes.modal}>
				<button className={classes.modal_close} onClick={onClose}>
					×
				</button>
				<div className={classes.view}>
					{desktop && (
						<CiDesktop
							onClick={() => setPicture('desktop')}
							className={view ? classes.icon : classes.icon_active}
						/>
					)}
					{mobile && (
						<CiMobile1
							onClick={() => setPicture('mobile')}
							className={view ? classes.icon_active : classes.icon}
						/>
					)}
				</div>
				<div className={classes.modal_img_container}>
					<img src={view ? mobile : desktop} alt='' />
				</div>
			</div>
		</div>
	);
};

interface PortfolioProps {
	project: {
		name: string;
		href?: string;
		tools: string[];
		description: string;
	};
	mobile?: string;
	desktop?: string;
}

export const PortfolioItem = ({ project, mobile, desktop }: PortfolioProps) => {
	const [view, setView] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	function modalOpen() {
		setIsModalOpen(true);
		document.body.classList.toggle('is-scroll-disabled');
	}

	function modalCLose() {
		setIsModalOpen(false);
		document.body.classList.toggle('is-scroll-disabled');
	}

	function setPicture(name: string) {
		if (name === 'desktop' && view != false) {
			setView(false);
		}

		if (name === 'mobile' && view != true) {
			setView(true);
		}
	}

	return (
		<>
			<div className={classes.portfolio}>
				<div className={classes.href}>
					<h1>{project.name}</h1>
					<a
						href={project.href}
						target='_blank'
						rel='noreferrer'
						className={classes.href_a}
					>
						{project.href ? (
							<FiExternalLink className={classes.href_icon} />
						) : (
							<FiExternalLink className={classes.href_icon_nolink} />
						)}
					</a>
				</div>
				<div className={classes.img_container} onClick={modalOpen}>
					<img src={view ? mobile : desktop} alt='' />
				</div>
				<div className={classes.info}>
					<div className={classes.view}>
						{desktop && (
							<CiDesktop
								onClick={() => setPicture('desktop')}
								className={view ? classes.icon : classes.icon_active}
							/>
						)}
						{mobile && (
							<CiMobile1
								onClick={() => setPicture('mobile')}
								className={view ? classes.icon_active : classes.icon}
							/>
						)}
					</div>
				</div>
				<div className={classes.tools}>
					{project.tools.map(tool => (
						<div key={tool} className={classes.tool}>
							{tool}
						</div>
					))}
				</div>
				<p className={classes.description}>{project.description}</p>
			</div>
			{isModalOpen && (
				<PortfolioItemModal
					isOpen={isModalOpen}
					view={view}
					mobile={mobile}
					desktop={desktop}
					setPicture={setPicture}
					onClose={modalCLose}
				/>
			)}
		</>
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
					project={translations[language].portfolio.projects['deren']}
					mobile={dm}
					desktop={dd}
				/>
				<PortfolioItem
					project={translations[language].portfolio.projects['meyes']}
					mobile={mm}
					desktop={md}
				/>
				<PortfolioItem
					project={translations[language].portfolio.projects['doe']}
					desktop={doed}
				/>
				<PortfolioItem
					project={translations[language].portfolio.projects['shop-bakery']}
					mobile={sbm}
					desktop={sbd}
				/>
			</div>
		</section>
	);
};
