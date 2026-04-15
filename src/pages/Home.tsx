import { useEffect, useState } from 'react';
import { FiFigma } from 'react-icons/fi';
import { VscVscode } from 'react-icons/vsc';
import {
	SiCss,
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
	SiSupabase,
	SiPostgresql,
	SiExpress,
} from 'react-icons/si';
import { motion } from 'framer-motion';

import { TechItem } from '../components/techItem/TechItem';
import RepoItem from '../components/repoItem/RepoItem';
import { Translations } from '../interfaces';

import img from '../assets/img.webp';

const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

async function getStaticProps() {
	const repos = await fetch(
		`https://api.github.com/users/mescyura/repos?type=owner&per_page=100`,
		{
			headers: {
				Authorization: `token ${githubToken}`, // ось тут додаєш
			},
		},
	).then(res => res.json());

	const orderedRepos = [
		'mescyurasite',
		'calc-daily-flow',
		'todo-list-app',
		'quick-notes-app',
		'react-calculator',
		'rock-paper-scissors',
		'tetris',
		'shop-bakery',
		'agency-react-tw',
		'pokemon-dex',
	];

	const topRepos = repos
		.filter((repo: { name: string }) => orderedRepos.includes(repo.name))
		.sort(
			(a: { name: string }, b: { name: string }) =>
				orderedRepos.indexOf(a.name) - orderedRepos.indexOf(b.name),
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
			<motion.section
				className='w-full pb-8 pt-32 text-zinc-900 dark:text-zinc-50'
				initial='hidden'
				animate='show'
				variants={{
					hidden: { opacity: 0 },
					show: { opacity: 1, transition: { staggerChildren: 0.06 } },
				}}
			>
				<motion.div
					className='mb-4 flex items-center gap-2'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					<img
						src={img}
						alt='avatar'
						className='h-12 w-12 rounded-full border border-zinc-900/10 object-cover dark:border-white/10'
					/>
					<h1 className='text-[26px] leading-none'>
						{translations[language].profile} 👋
					</h1>
				</motion.div>
				<motion.p
					className='mb-8 text-sm text-zinc-700 dark:text-zinc-300'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					{translations[language].profile_info}
				</motion.p>
				<motion.div
					className='mb-4 flex items-center gap-2'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					<h1 className='text-[26px] leading-none'>
						{translations[language].hobby} 💭
					</h1>
				</motion.div>
				<motion.p
					className='mb-8 text-sm text-zinc-700 dark:text-zinc-300'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					{translations[language].hobby_info}
				</motion.p>
				<motion.div
					className='mb-4 flex items-center gap-2'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					<h1 className='text-[26px] leading-none'>
						{translations[language].technologies} 💻
					</h1>
				</motion.div>
				<motion.p
					className='mb-8 text-sm text-zinc-700 dark:text-zinc-300'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					{translations[language].technologies_info}
				</motion.p>
				<motion.div
					className='mb-8 flex flex-wrap items-center justify-center gap-2 rounded-3xl border border-zinc-900/10 bg-white/60 p-2 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					<TechItem icon={SiHtml5} name='HTML5' />
					<TechItem icon={SiCss} name='CSS3' />
					<TechItem icon={SiSass} name='Sass' />
					<TechItem icon={SiTailwindcss} name='Tailwind' />
					<TechItem icon={SiBootstrap} name='Bootstrap' />
					<TechItem icon={SiJavascript} name='JavaScript' />
					<TechItem icon={SiTypescript} name='TypeScript' />
					<TechItem icon={SiReact} name='React.js' />
					<TechItem icon={SiNextdotjs} name='Next.js' />
					<TechItem icon={SiNodedotjs} name='Node.js' />
					<TechItem icon={SiExpress} name='Express.js' />
					<TechItem icon={VscVscode} name='VSCode' />
					<TechItem icon={FiFigma} name='Figma' />
					<TechItem icon={SiVercel} name='Vercel' />
					<TechItem icon={SiNpm} name='Npm' />
					<TechItem icon={SiGit} name='Git' />
					<TechItem icon={SiSupabase} name='Supabase' />
					<TechItem icon={SiMongodb} name='MongoDB' />
					<TechItem icon={SiPostgresql} name='Postgresql' />
				</motion.div>
				<motion.div
					className='mb-4 flex items-center gap-2'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					<h1 className='text-[26px] leading-none'>
						{translations[language].projects} 🛠️
					</h1>
				</motion.div>
				<motion.p
					className='mb-8 text-sm text-zinc-700 dark:text-zinc-300'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					{translations[language].projects_info}
				</motion.p>
				<motion.div
					className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2'
					variants={{
						hidden: { opacity: 0 },
						show: { opacity: 1, transition: { staggerChildren: 0.06 } },
					}}
				>
					{topRepos.length !== 0
						? // eslint-disable-next-line @typescript-eslint/no-explicit-any
							topRepos.map((repo: Record<string, any>, idx: number) => {
								const isLast = idx === topRepos.length - 1;
								const shouldSpanFull = isLast && topRepos.length % 2 === 1;

								return (
									<motion.div
										key={repo.name}
										className={shouldSpanFull ? 'col-span-full' : undefined}
										variants={{
											hidden: { opacity: 0, y: 10 },
											show: { opacity: 1, y: 0 },
										}}
									>
										<RepoItem
											name={repo.name}
											description={repo.description}
											stars={repo.stargazers_count}
											forks={repo.forks_count}
											language={repo.language}
											homepage={repo.homepage}
										/>
									</motion.div>
								);
							})
						: 'Loading...'}
				</motion.div>
			</motion.section>
		</>
	);
};
