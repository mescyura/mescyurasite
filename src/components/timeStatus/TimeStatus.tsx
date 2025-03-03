import { useState, useEffect } from 'react';
import classes from './TimeStatus.module.css';
import { Translations } from '../../interfaces';

interface Props {
	translations: Translations;
	language: string;
}

const TimeStatus = ({ translations, language }: Props) => {
	const [time, setTime] = useState<string>('00:00');
	const [awake, setAwake] = useState<boolean>(true);

	function updateTime() {
		const current = new Date().toLocaleTimeString('uk-UA', {
			timeZone: 'Europe/Kyiv',
			hour: '2-digit',
			minute: '2-digit',
		});
		setTime(current);

		const hours = new Date().toLocaleTimeString('uk-UA', {
			timeZone: 'Europe/Kyiv',
			hour: '2-digit',
			hour12: false,
		});
		setAwake(Number(hours) >= 7);

		setTimeout(updateTime, 60 * 1000);
	}

	useEffect(() => {
		updateTime();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<p className={classes.time_status}>
			{translations[language].time[0]}{' '}
			<span className={classes.span}>{time} </span>
			{translations[language].time[1]}{' '}
			<span className={classes.span}>
				{awake
					? translations[language].time[2]
					: translations[language].time[3]}
			</span>
			{translations[language].time[4]}
		</p>
	);
};

export default TimeStatus;
