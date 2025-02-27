import { useState } from 'react';
import { Translations } from '../interfaces';

import img from '../assets/img.jpg';
import { ContactModal } from '../components/modal/ContactModal';
import { SkillsItem } from '../components/skillsItem/SkillsItem';
import { SocialLinks } from '../components/socialLink/SocialLink';
import { Spotify } from '../components/spotify/Spotify';

interface Props {
	translations: Translations;
	language: string;
}

export const Home = ({ translations, language }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<>
			<section className='hero'>
				<div className='content'>
					<img src={img} alt='avatar' className='profile-image' />
					<h1>{translations[language].title}</h1>
					<p className='title'>{translations[language].subtitle}</p>

					<SkillsItem />

					<div>
						<button className='cta-button'>
							<a href='https://github.com'>{translations[language].viewWork}</a>
						</button>
						<button onClick={() => setIsModalOpen(true)} className='cta-button'>
							{translations[language].contact}
						</button>
					</div>

					<SocialLinks />
					<Spotify />
				</div>
			</section>
			<ContactModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				translations={translations}
				language={language}
			/>
		</>
	);
};
