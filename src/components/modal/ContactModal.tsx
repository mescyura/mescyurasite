// import { FormEvent, useState } from 'react';
// import { Translations } from '../../interfaces';

// import { FeedbackModal } from './FeedbackModal';

// import classes from './ContactModal.module.css';

// const groupId = import.meta.env.VITE_GROUP_ID;
// const botId = import.meta.env.VITE_BOT_ID;

// interface Props {
// 	isOpen: boolean;
// 	onClose: () => void;
// 	translations: Translations;
// 	language: string;
// }

// interface Feedback {
// 	type: 'error' | 'success';
// }

// export const ContactModal = ({
// 	isOpen,
// 	onClose,
// 	translations,
// 	language,
// }: Props) => {
// 	const [feedback, setFeedback] = useState<Feedback | null>(null);

// 	const [name, setName] = useState('');
// 	const [message, setMessage] = useState('');

// 	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		const telegramUrl = `https://api.telegram.org/bot${botId}/sendMessage`;
// 		const text = `New message from: ${name}\nMessage: ${message}`;

// 		fetch(telegramUrl, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				chat_id: groupId,
// 				text: text,
// 			}),
// 		})
// 			.then(response => response.json())
// 			.then(() => {
// 				setName('');
// 				setMessage('');
// 				setFeedback({ type: 'success' });
// 				setTimeout(() => {
// 					setFeedback(null);
// 					onClose();
// 				}, 3000);
// 			})
// 			.catch(error => {
// 				console.error('Error:', error);
// 				setFeedback({ type: 'error' });
// 				setName('');
// 				setMessage('');
// 			});
// 	};

// 	const handleCloseFeedback = () => {
// 		setFeedback(null);
// 		if (feedback) {
// 			if (feedback.type === 'success') {
// 				onClose();
// 			}
// 		}
// 	};

// 	return (
// 		<div className={`${classes.modalOverlay} ${isOpen ? classes.active : ''}`}>
// 			{feedback ? (
// 				''
// 			) : (
// 				<div className={classes.modal}>
// 					<button
// 						className={classes.modalClose}
// 						onClick={() => {
// 							onClose();
// 							setName('');
// 							setMessage('');
// 						}}
// 					>
// 						×
// 					</button>
// 					<h2>{translations[language].contactForm}</h2>
// 					<form className={classes.contactForm} onSubmit={handleSubmit}>
// 						<div className={classes.formGroup}>
// 							<label htmlFor='name'>{translations[language].name}</label>
// 							<input
// 								type='text'
// 								id='name'
// 								name='name'
// 								required
// 								value={name}
// 								onChange={e => setName(e.target.value)}
// 							/>
// 						</div>
// 						<div className={classes.formGroup}>
// 							<label htmlFor='message'>{translations[language].message}</label>
// 							<textarea
// 								id='message'
// 								name='message'
// 								rows={4}
// 								required
// 								value={message}
// 								onChange={e => setMessage(e.target.value)}
// 							></textarea>
// 						</div>
// 						<button type='submit' className={classes.submitButton}>
// 							{translations[language].send}
// 						</button>
// 					</form>
// 				</div>
// 			)}
// 			{feedback && (
// 				<FeedbackModal
// 					type={feedback.type}
// 					onClose={handleCloseFeedback}
// 					translations={translations}
// 					language={language}
// 				/>
// 			)}
// 		</div>
// 	);
// };
