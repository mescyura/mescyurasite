import { Skills } from '../App';

export const SkillItem = ({ text, icon, color }: Skills) => {
	return (
		<div className='skill'>
			<div className='skill-item'>{text}</div>
			<i
				className={`skill-item-icon fab fa-${icon}`}
				style={{ color: color }}
			></i>
		</div>
	);
};
