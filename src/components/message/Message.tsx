import { useState } from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { ImSpinner2 } from 'react-icons/im';
import { motion } from 'framer-motion';
import classes from './Message.module.css';
import { Translations } from '../../interfaces';

const groupId = import.meta.env.VITE_GROUP_ID;
const botId = import.meta.env.VITE_BOT_ID;

interface Props {
	translations: Translations;
	language: string;
}

const Message = ({ translations, language }: Props) => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [sending, setSending] = useState<boolean>(false);
	const [errMsg, setErrMsg] = useState<string>('');
	const [messageSent, setMessageSent] = useState<boolean>(false);

	const emailRegex = new RegExp(
		// eslint-disable-next-line no-useless-escape
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

	const sendMessage = () => {
		if (email.trim() == '' || message.trim() == '')
			return setErrMsg('Please fill out all fields!');
		if (!emailRegex.test(email))
			return setErrMsg("Hmm, that doesn't look like an email.");

		setSending(true);

		const telegramUrl = `https://api.telegram.org/bot${botId}/sendMessage`;
		const text = `New message from: ${email}\nMessage: ${message}`;

		fetch(telegramUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: groupId,
				text: text,
			}),
		})
			.then(response => response.json())
			.then(() => {
				setTimeout(() => {
					setMessageSent(true);
					setEmail('');
					setMessage('');
				}, 1000);
				setTimeout(() => {
					setMessageSent(false);
					setSending(false);
				}, 3000);
			})
			.catch(error => {
				console.error('Error:', error);
				setEmail('');
				setMessage('');
				setTimeout(() => {
					setSending(false);
				}, 3000);
			})
			.finally(() => {
				setTimeout(() => {
					setSending(false);
					setErrMsg('');
				}, 3000);
			});
	};

	return (
		<div className={classes.message_wrapper}>
			{messageSent && (
				<motion.div
					key={'contactThankYou'}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.25, ease: 'easeOut' }}
					className={classes.message_sended}
				>
					{translations[language].contact_me.thanks}
				</motion.div>
			)}

			{!messageSent && (
				<motion.div
					key={'contactForm'}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25, ease: 'easeOut' }}
				>
					<h1 className={classes.message_label}>
						{translations[language].contact_me.email}
					</h1>
					<input
						placeholder='example@gmail.com'
						type='text'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className={classes.message_input}
					/>

					<h1 className={classes.message_label}>
						{translations[language].contact_me.message}
					</h1>
					<textarea
						placeholder={translations[language].contact_me.message_placehorder}
						value={message}
						onChange={e => setMessage(e.target.value)}
						className={classes.message_textarea}
					/>

					<div className={classes.message_btn_wrapper}>
						<p className={classes.message_text}>{errMsg}</p>

						<button onClick={sendMessage} className={classes.message_btn}>
							<span className='mt-[2px]'>
								{translations[language].contact_me.send}
							</span>
							{!sending && (
								<RiSendPlane2Fill className={classes.message_btn_icon_send} />
							)}
							{sending && (
								<ImSpinner2 className={classes.message_btn_icon_spinner} />
							)}
						</button>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default Message;
