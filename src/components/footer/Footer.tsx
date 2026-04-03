import { Translations } from '../../interfaces';
import { Spotify } from '../spotify/Spotify';

const date = new Date();

interface Props {
	translations: Translations;
	language: string;
}

const Footer = ({ translations, language }: Props) => {
	return (
		<footer className='-mx-4 mt-8 w-[calc(100%+2rem)] sm:pb-8 sm:mx-0 sm:w-full'>
			<div className='flex w-full flex-col items-start justify-between gap-4 border-t border-zinc-900/10 bg-white/60 p-4 text-zinc-900 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60 dark:text-zinc-50 sm:flex-row sm:items-start sm:rounded-3xl sm:border'>
				<div>
					<h1 className='mb-2 text-2xl font-normal leading-8'>Yurii Holyda</h1>
					<h2 className='text-xs font-medium leading-6 text-zinc-600 dark:text-zinc-300'>
						Web Developer • {date.getFullYear()}
					</h2>
				</div>
				<Spotify translations={translations} language={language} />
			</div>
		</footer>
	);
};

export default Footer;
