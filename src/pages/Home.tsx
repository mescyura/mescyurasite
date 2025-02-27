import { useState } from 'react';
import { Translations } from '../interfaces';

import img from '../assets/img.webp';
import { ContactModal } from '../components/modal/ContactModal';
import { Spotify } from '../components/spotify/Spotify';
import classes from './Home.module.css';
import { TechItem } from '../components/techItem/TechItem';
import {
	SiCss3,
	SiGit,
	SiHtml5,
	SiJavascript,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiNpm,
	SiReact,
	SiSass,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si';
import { FiFigma } from 'react-icons/fi';
import { VscVscode } from 'react-icons/vsc';

interface Props {
	translations: Translations;
	language: string;
}

export const Home = ({ translations, language }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<>
			<section className={classes.hero}>
				<div className={classes.profile}>
					<img src={img} alt='avatar' className={classes.profile_image} />
					<h1>{translations[language].profile} 👋</h1>
				</div>
				<p className={classes.subtitle}>
					{translations[language].profile_info}
				</p>
				<div className={classes.profile}>
					<h1>{translations[language].title2} 💭</h1>
				</div>
				<p className={classes.subtitle}>{translations[language].subtitle2}</p>
				<div className={classes.profile}>
					<h1>{translations[language].technologies} 💻</h1>
				</div>
				<p className={classes.subtitle}>
					{translations[language].technologies_info}
				</p>
				<div className={classes.tech_list}>
					<TechItem icon={SiHtml5} name='HTML5' />
					<TechItem icon={SiCss3} name='CSS3' />
					<TechItem icon={SiSass} name='Sass' />
					<TechItem icon={SiTailwindcss} name='TailwindCSS' />
					<TechItem icon={SiJavascript} name='JavaScript' />
					<TechItem icon={SiTypescript} name='TypeScript' />
					<TechItem icon={SiReact} name='React.js' />
					<TechItem icon={SiNodedotjs} name='Node.js' />
					<TechItem icon={VscVscode} name='VSCode' />
					<TechItem icon={FiFigma} name='Figma' />
					<TechItem icon={SiNpm} name='Npm' />
					<TechItem icon={SiNextdotjs} name='Next.js' />
					<TechItem icon={SiGit} name='Git' />
					<TechItem icon={SiMongodb} name='MongoDB' />
				</div>
				<div className={classes.profile}>
					<h1>{translations[language].projects} 🛠️</h1>
				</div>
				<p className={classes.subtitle}>
					{translations[language].projects_info}
				</p>

				<Spotify />
			</section>
			<ContactModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				translations={translations}
				language={language}
			/>
		</>
	);
};
