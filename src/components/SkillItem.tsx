interface Props {
	skill: string;
}

export const SkillItem = ({ skill }: Props) => {
	return <div className='skill-item'>{skill}</div>;
};
