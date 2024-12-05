interface Props {
	href: string;
	icon: string;
}

export const SocialLink = ({ href, icon }: Props) => {
	return (
		<a href={href} target='_blank' rel='noopener noreferrer'>
			<i className={`fab fa-${icon}`}></i>
		</a>
	);
};
