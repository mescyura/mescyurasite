import { useState } from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { ImSpinner2 } from 'react-icons/im';
import { motion } from 'framer-motion';
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
			return setErrMsg(translations[language].contact_me.error);
		if (!emailRegex.test(email))
			return setErrMsg(translations[language].contact_me.error_email);

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
		<div className='relative min-h-86 w-full flex-1 rounded-3xl border border-zinc-900/10 bg-white/60 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60'>
			{messageSent && (
				<motion.div
					key={'contactThankYou'}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.25, ease: 'easeOut' }}
					className='absolute inset-0 z-10 flex items-center justify-center rounded-3xl p-4 text-center text-zinc-900 dark:text-zinc-50'
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
					<h1 className='mb-2 text-sm font-bold leading-5 text-zinc-900 dark:text-zinc-50'>
						{translations[language].contact_me.email}
					</h1>
					<input
						placeholder='example@gmail.com'
						type='text'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='mb-4 w-full rounded-3xl border border-zinc-900/10 bg-black/5 p-4 text-sm leading-5 text-zinc-900 outline-none transition-colors focus:border-zinc-900/30 dark:border-white/10 dark:bg-white/10 dark:text-zinc-50 dark:focus:border-white/30'
					/>

					<h1 className='mb-2 text-sm font-bold leading-5 text-zinc-900 dark:text-zinc-50'>
						{translations[language].contact_me.message}
					</h1>
					<textarea
						placeholder={translations[language].contact_me.message_placehorder}
						value={message}
						onChange={e => setMessage(e.target.value)}
						className='mb-4 min-h-36 w-full rounded-3xl border border-zinc-900/10 bg-black/5 p-4 text-sm leading-5 text-zinc-900 outline-none transition-colors focus:border-zinc-900/30 dark:border-white/10 dark:bg-white/10 dark:text-zinc-50 dark:focus:border-white/30'
					/>

					<div className='flex w-full items-center justify-between gap-3'>
						<p className='text-xs leading-5 text-red-500/80'>{errMsg}</p>

						<button
							onClick={sendMessage}
							className='flex items-center justify-center gap-1 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-zinc-50 dark:text-zinc-900'
						>
							<span className='mt-[2px]'>
								{translations[language].contact_me.send}
							</span>
							{!sending && (
								<RiSendPlane2Fill />
							)}
							{sending && (
								<ImSpinner2 className='ml-2 h-4 w-4 animate-spin' />
							)}
						</button>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default Message;
