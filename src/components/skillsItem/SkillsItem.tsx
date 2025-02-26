import { Skills } from '../../interfaces';

import classes from './SkillsItem.module.css';
import data from '../../data/data.json';

export const SkillsItem = () => {
	const skills: Skills[] = data.skills;

	return (
		<div className={classes.skills}>
			{skills.map(skill => (
				<div className={classes.skill} key={skill.text}>
					<div className={classes.skillItem}>{skill.text}</div>
					<i
						className={`${classes.skillItemIcon} fab fa-${skill.icon}`}
						style={{ color: skill.color }}
					></i>
				</div>
			))}
		</div>
	);
};
