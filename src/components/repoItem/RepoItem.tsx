import { FiExternalLink } from 'react-icons/fi';
import classes from './RepoItem.module.css';

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
			className={classes.project}
			style={{
				borderLeft: `solid 4px ${Languages[language]}`,
			}}
		>
			<h1>{name}</h1>
			<p>{description}</p>
			<div className={classes.links}>
				{homepage === '' ||
				homepage === null ||
				name == 'mescyurasite' ? null : (
					<p className={classes.link}>
						<FiExternalLink />
						<a href={homepage} target='_blank' rel='noreferrer'>
							Website
						</a>
					</p>
				)}
				<p className={classes.link}>
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
