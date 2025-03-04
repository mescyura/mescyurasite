import { IconType } from 'react-icons';
import { Tooltip } from 'react-tooltip';

import classes from './TechItem.module.css';

interface TechProps {
	name: string;
	icon: IconType;
}

export const TechItem = ({ name, icon }: TechProps) => {
	return (
		<>
			<span
				className={classes.tech_icon_wrapper}
				data-tooltip-id={name}
				data-tooltip-content={name}
			>
				{icon({ className: classes.tech_icon })}
			</span>
			<Tooltip className={classes.tippy} id={name} />
		</>
	);
};
