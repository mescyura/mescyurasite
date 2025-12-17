import { motion } from 'framer-motion';
import { AiOutlineStar } from 'react-icons/ai';
import { BiGitRepoForked } from 'react-icons/bi';
import { FiExternalLink } from 'react-icons/fi';
import classes from './RepoItem.module.css';

const Languages = {
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	HTML: '#d25735',
};

interface RepoProps {
	name: string;
	description: string;
	stars: number;
	forks: number;
	language: 'TypeScript' | 'JavaScript';
	homepage: string;
}

const RepoItem = ({
	name,
	description,
	stars,
	forks,
	language,
	homepage,
}: RepoProps) => {
	return (
		<div className={classes.project}>
			<h1>{name}</h1>
			<p>{description}</p>
			<div className={classes.links}>
				{homepage === '' ||
				homepage === null ||
				name == 'mescyurasite' ? null : (
					<>
						<p>
							<FiExternalLink />
							<a href={homepage} target='_blank' rel='noreferrer'>
								live
							</a>
						</p>
						<span>/</span>
					</>
				)}
				<p>
					<FiExternalLink />
					<a
						href={`https://github.com/mescyura/${name}`}
						target='_blank'
						rel='noreferrer'
					>
						source
					</a>
				</p>
			</div>

			<div className={classes.language_data}>
				<div className={classes.language}>
					<motion.div
						className={classes.language_color}
						style={{
							background: Languages[language],
							border: `solid 3px ${Languages[language]}`,
						}}
					/>
					{language}
				</div>

				<div className={classes.stats}>
					<AiOutlineStar className='mr-1 w-4 h-4' /> {stars}
				</div>
				<div className={classes.stats}>
					<BiGitRepoForked className='mr-1 w-4 h-4' /> {forks}
				</div>
			</div>
		</div>
	);
};

export default RepoItem;
