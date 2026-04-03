// import Message from '../components/message/Message';
import { SiDiscord, SiTelegram } from 'react-icons/si';
import ContactLink from '../components/message/ContactLink';
import Message from '../components/message/Message';
import TimeStatus from '../components/timeStatus/TimeStatus';
import { Translations } from '../interfaces';
import { FiMail, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Props {
	translations: Translations;
	language: string;
}

export const Contact = ({ translations, language }: Props) => {
	return (
		<motion.section
			className='w-full pb-8 pt-32 text-zinc-900 dark:text-zinc-50'
			initial='hidden'
			animate='show'
			variants={{
				hidden: { opacity: 0 },
				show: { opacity: 1, transition: { staggerChildren: 0.08 } },
			}}
		>
			<motion.div
				className='mb-4 flex items-center gap-2'
				variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
			>
				<h1 className='text-[26px] leading-none'>
					{translations[language].chat} 💬
				</h1>
			</motion.div>
			<motion.p
				className='mb-5 text-base text-zinc-700 dark:text-zinc-300'
				variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
			>
				{translations[language].chat_info}
			</motion.p>
			<motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
				<TimeStatus translations={translations} language={language} />
			</motion.div>
			<motion.div
				className='flex flex-col-reverse items-start gap-4 md:flex-row'
				variants={{
					hidden: { opacity: 0 },
					show: { opacity: 1, transition: { staggerChildren: 0.08 } },
				}}
			>
				<motion.div
					className='w-full flex-1'
					variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
				>
					<Message translations={translations} language={language} />
				</motion.div>
				<motion.div
					className='flex w-full flex-col gap-4 md:w-auto md:flex-none'
					variants={{
						hidden: { opacity: 0 },
						show: { opacity: 1, transition: { staggerChildren: 0.06 } },
					}}
				>
					<motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
						<ContactLink
							name='@mescyura'
							icon={<SiDiscord className='h-6 w-6' style={{ color: '#5865F2' }} />}
							link='https://discord.com/users/316947490991636482'
						/>
					</motion.div>

					<motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
						<ContactLink
							name='@mescyura'
							icon={<SiTelegram className='h-6 w-6' style={{ color: '#24A1DE' }} />}
							link='https://t.me/mescyura'
						/>
					</motion.div>

					<motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
						<ContactLink
							name='mescyura@gmail.com'
							icon={<FiMail className='h-6 w-6 text-zinc-500 dark:text-zinc-400' />}
							link='mailto:mescyura@gmail.com'
						/>
					</motion.div>

					<motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
						<ContactLink
							name={translations[language].download_cv}
							icon={
								<FiDownload className='h-6 w-6 text-zinc-500 dark:text-zinc-400' />
							}
							link='/Holyda_Yurii_CV.pdf'
						/>
					</motion.div>
				</motion.div>
			</motion.div>
		</motion.section>
	);
};
