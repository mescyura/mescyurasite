import { IconType } from 'react-icons';
import { Tooltip } from 'react-tooltip';

interface TechProps {
	name: string;
	icon: IconType;
}

export const TechItem = ({ name, icon }: TechProps) => {
	return (
		<>
			<span
				className='flex items-center justify-center p-2'
				data-tooltip-id={name}
				data-tooltip-content={name}
			>
				{icon({ className: 'h-7 w-7' })}
			</span>
			<Tooltip
				className='rounded-lg! bg-zinc-900! px-2! py-1! text-xs! text-white! dark:bg-zinc-100! dark:text-zinc-900!'
				id={name}
			/>
		</>
	);
};
