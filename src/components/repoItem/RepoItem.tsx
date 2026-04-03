import { FiExternalLink } from 'react-icons/fi';

const Languages = {
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	HTML: '#d25735',
	CSS: '#663399',
};

interface RepoProps {
	name: string;
	description: string;
	stars: number;
	forks: number;
	language: 'TypeScript' | 'JavaScript' | 'HTML' | 'CSS';
	homepage: string;
}

const RepoItem = ({ name, description, language, homepage }: RepoProps) => {
	return (
		<div
			className='flex h-36 flex-col items-start rounded-3xl border border-zinc-900/10 bg-white/60 p-4 text-zinc-900 backdrop-blur-xl transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-zinc-950/60 dark:text-zinc-50'
			style={{
				borderLeft: `solid 4px ${Languages[language]}`,
			}}
		>
			<h1 className='mb-1 text-base font-semibold leading-5'>{name}</h1>
			<p className='text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2'>
				{description}
			</p>
			<div className='mt-auto flex items-center gap-2'>
				{homepage === '' ||
				homepage === null ||
				name == 'mescyurasite' ? null : (
					<p className='inline-flex items-center gap-1 rounded-full border border-zinc-900/10 bg-black/5 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-900/30 dark:border-white/10 dark:bg-white/10 dark:text-zinc-50 dark:hover:border-white/30'>
						<FiExternalLink />
						<a href={homepage} target='_blank' rel='noreferrer'>
							Website
						</a>
					</p>
				)}
				<p className='inline-flex items-center gap-1 rounded-full border border-zinc-900/10 bg-black/5 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-900/30 dark:border-white/10 dark:bg-white/10 dark:text-zinc-50 dark:hover:border-white/30'>
					<FiExternalLink />
					<a
						href={`https://github.com/mescyura/${name}`}
						target='_blank'
						rel='noreferrer'
					>
						Github
					</a>
				</p>
			</div>
		</div>
	);
};

export default RepoItem;
