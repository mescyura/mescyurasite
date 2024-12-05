import { FormEvent } from 'react';
import { Translations } from '../App';

const groupId = import.meta.env.VITE_GROUP_ID;
const botId = import.meta.env.VITE_BOT_ID;

console.log(groupId);
console.log(botId);

interface Props {
	isOpen: boolean;
	onClose: () => void;
	translations: Translations;
	language: string;
}

export const ContactModal = ({
	isOpen,
	onClose,
	translations,
	language,
}: Props) => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(e);
		// const name = e.target.name.value;
		// const message = e.target.message.value;
		const target = e.target as typeof e.target & {
			name: { value: string };
			message: { value: string };
		};
		const telegramUrl = `https://api.telegram.org/bot${botId}/sendMessage`;
		const text = `New message from: ${target.name}\nMessage: ${target.message}`;

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
				console.log(translations.success);

				alert(translations[language].success);
				onClose();
				target.name.value = '';
				target.message.value = '';
			})
			.catch(error => {
				console.error('Error:', error);
				alert(translations[language].error);
				target.name.value = '';
				target.message.value = '';
			});
	};

	return (
		<div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
			<div className='modal'>
				<button className='modal-close' onClick={onClose}>
					×
				</button>
				<h2>{translations[language].contactForm}</h2>
				<form className='contact-form' onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='name'>{translations[language].name}</label>
						<input type='text' id='name' name='name' required />
					</div>
					<div className='form-group'>
						<label htmlFor='message'>{translations[language].message}</label>
						<textarea id='message' name='message' rows={4} required></textarea>
					</div>
					<button type='submit' className='submit-button'>
						{translations[language].send}
					</button>
				</form>
			</div>
		</div>
	);
};
