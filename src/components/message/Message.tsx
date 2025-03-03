import { FormEvent, useRef, useState } from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { ImSpinner2 } from 'react-icons/im';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Message.module.css';

const Message = () => {
	const email = useRef<string>('');
	const message = useRef<string>('');
	const [sending, setSending] = useState<boolean>(false);
	const [errMsg, setErrMsg] = useState<string>('');
	const [messageSent, setMessageSent] = useState<boolean>(false);

	const emailRegex = new RegExp(
		// eslint-disable-next-line no-useless-escape
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

	// const sendMessage = async () => {
	// 	if (email.current == '' || message.current == '')
	// 		return setErrMsg('Please fill out all fields!');
	// 	if (!emailRegex.test(email.current))
	// 		return setErrMsg("Hmm, that doesn't look like an email.");

	// 	setSending(true);

	// 	// let response = await axios.post("/api/send", {
	// 	//     email: email.current,
	// 	//     message: message.current,
	// 	// });

	// 	// if (response.data.result === "FIELD_EMPTY") return setErrMsg("Please fill out all fields!");
	// 	// if (response.data.result === "DISCORD_API_ERROR") return setErrMsg("Something went wrong...");

	// 	setSending(false);

	// 	return setMessageSent(true);
	// };

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

		if (email.current == '' || message.current == '')
			return setErrMsg('Please fill out all fields!');
		if (!emailRegex.test(email.current))
			return setErrMsg("Hmm, that doesn't look like an email.");

		setSending(true);

			e.preventDefault();
			const telegramUrl = `https://api.telegram.org/bot${botId}/sendMessage`;
			const text = `New message from: ${name}\nMessage: ${message}`;
	
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
					setE('');
					setMessage('');
					setFeedback({ type: 'success' });
					setTimeout(() => {
						setFeedback(null);
						onClose();
					}, 3000);
				})
				.catch(error => {
					console.error('Error:', error);
					setFeedback({ type: 'error' });
					setName('');
					setMessage('');
				});
		};

	return (
		<div className={classes.message_wrapper}>
			<AnimatePresence>
				{/* {messageSent && (
					<motion.p
						key={'contactThankYou'}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.25, ease: 'easeOut' }}
						className='flex items-center justify-center w-full h-full text-sm text-gray-400'
					>
						Thanks for reaching out! I'll get back to you soon.
					</motion.p>
				)} */}
				{!messageSent && (
					<motion.div
						key={'contactForm'}
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25, ease: 'easeOut' }}
					>
						<h1 className={classes.message_label}>EMAIL</h1>
						<input
							placeholder='example@gmail.com'
							type='text'
							onChange={e => (email.current = e.target.value)}
							className={classes.message_input}
						/>

						<h1 className={classes.message_label}>MESSAGE</h1>
						<textarea
							placeholder="Hi Conrad, what's up?"
							onChange={e => (message.current = e.target.value)}
							className={classes.message_textarea}
						/>

						<div className={classes.message_btn_wrapper}>
							<p className={classes.message_text}>{errMsg}</p>

							<button onClick={sendMessage} className={classes.message_btn}>
								<span className='mt-[2px]'>Send</span>
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
			</AnimatePresence>
		</div>
	);
};

export default Message;
