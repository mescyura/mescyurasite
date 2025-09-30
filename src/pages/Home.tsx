import { useEffect, useState } from 'react';
import { FiFigma } from 'react-icons/fi';
import { VscVscode } from 'react-icons/vsc';
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
	SiVercel,
	SiBootstrap,
} from 'react-icons/si';

import { TechItem } from '../components/techItem/TechItem';
import RepoItem from '../components/repoItem/RepoItem';
import { Translations } from '../interfaces';

import img from '../assets/img.webp';
import classes from './Home.module.css';

const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

async function getStaticProps() {
	const repos = await fetch(
		`https://api.github.com/users/mescyura/repos?type=owner&per_page=100`,
		{
			headers: {
				Authorization: `token ${githubToken}`, // ось тут додаєш
			},
		}
	).then(res => res.json());

	const selectedRepoNames = [
		'task-manager-app',
		'react-calculator',
		'mescyurasite',
		'rock-paper-scissors',
		'tetris',
		'shop-bakery',
	];

	const topRepos = repos.filter((repo: { name: string }) =>
		selectedRepoNames.includes(repo.name)
	);

	return {
		props: { topRepos },
		revalidate: 3600,
	};
}

interface Props {
	translations: Translations;
	language: string;
}

export const Home = ({ translations, language }: Props) => {
	const [topRepos, setTopRepos] = useState([]);

	useEffect(() => {
		getStaticProps().then(data => setTopRepos(data.props.topRepos));
	}, []);

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
					<h1>{translations[language].hobby} 💭</h1>
				</div>
				<p className={classes.subtitle}>{translations[language].hobby_info}</p>
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
					<TechItem icon={SiTailwindcss} name='Tailwind' />
					<TechItem icon={SiBootstrap} name='Bootstrap' />
					<TechItem icon={SiJavascript} name='JavaScript' />
					<TechItem icon={SiTypescript} name='TypeScript' />
					<TechItem icon={SiReact} name='React.js' />
					<TechItem icon={SiNodedotjs} name='Node.js' />
					<TechItem icon={SiNextdotjs} name='Next.js' />
					<TechItem icon={VscVscode} name='VSCode' />
					<TechItem icon={FiFigma} name='Figma' />
					<TechItem icon={SiVercel} name='Vercel' />
					<TechItem icon={SiNpm} name='Npm' />
					<TechItem icon={SiGit} name='Git' />
					<TechItem icon={SiMongodb} name='MongoDB' />
				</div>
				<div className={classes.profile}>
					<h1>{translations[language].projects} 🛠️</h1>
				</div>
				<p className={classes.subtitle}>
					{translations[language].projects_info}
				</p>
				<div className={classes.projects_list}>
					{topRepos.length !== 0
						? // eslint-disable-next-line @typescript-eslint/no-explicit-any
						  topRepos.map((repo: Record<string, any>) => {
								return (
									<RepoItem
										key={repo.name}
										name={repo.name}
										description={repo.description}
										stars={repo.stargazers_count}
										forks={repo.forks_count}
										language={repo.language}
									/>
								);
						  })
						: 'Loading...'}
				</div>
			</section>
		</>
	);
};
