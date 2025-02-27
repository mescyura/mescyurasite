import { IconType } from 'react-icons';

import classes from './TechItem.module.css';

interface TechProps {
	name: string;
	icon: IconType;
}

export const TechItem = ({ icon }: TechProps) => {
	return (
		<span className={classes.tech_icon_wrapper}>
			{icon({ className: classes.tech_icon })}
		</span>
	);
};
