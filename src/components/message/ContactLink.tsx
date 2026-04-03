import { ReactElement } from 'react';
import { FiExternalLink } from 'react-icons/fi';

import { Link } from 'react-router-dom';

const ContactLink = ({
	name,
	icon,
	link,
}: {
	name: string;
	icon: ReactElement;
	link: string;
}) => {
	return (
		<Link
			to={link}
			target='_blank'
			className='flex items-center justify-start gap-3 rounded-3xl border border-zinc-900/10 bg-white/60 p-4 text-zinc-600 backdrop-blur-xl transition-transform hover:scale-[1.01] hover:border-zinc-900/30 dark:border-white/10 dark:bg-zinc-950/60 dark:text-zinc-300 dark:hover:border-white/30'
		>
			{icon}
			<h1 className='text-sm leading-5 text-zinc-700 dark:text-zinc-200'>
				{name}
			</h1>
			<FiExternalLink />
		</Link>
	);
};

export default ContactLink;
