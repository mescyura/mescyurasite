import { useState, useRef, useCallback, CSSProperties, useEffect } from 'react';

interface TiltSettings {
	max?: number;
	perspective?: number;
	scale?: number;
	speed?: number;
	mobileDisabled?: boolean; // Додаємо опцію вимкнення
}

export const useTilt = (settings: TiltSettings = {}) => {
	const {
		max = 15,
		perspective = 1000,
		scale = 1.01,
		speed = 150,
		mobileDisabled = true,
	} = settings;

	const [style, setStyle] = useState<CSSProperties>({});
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	// Перевірка на розмір екрана при монтуванні та ресайзі
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024); // 1024px - стандарт для Tailwind 'lg'
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const onMouseMove = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			// Якщо мобільний і вимкнення активне — нічого не робимо
			if (mobileDisabled && isMobile) return;
			if (!elementRef.current) return;

			const el = elementRef.current;
			const rect = el.getBoundingClientRect();

			const xFactor = (e.clientX - rect.left) / rect.width - 0.5;
			const yFactor = (e.clientY - rect.top) / rect.height - 0.5;

			// Нахил "вниз" до мишки
			const rotateX = yFactor * max * 2;
			const rotateY = -xFactor * max * 2;

			setStyle({
				transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
				transition: `transform ${speed}ms ease-out`,
				zIndex: 50,
				position: 'relative',
			});
		},
		[max, perspective, scale, speed, isMobile, mobileDisabled],
	);

	const onMouseLeave = useCallback(() => {
		setStyle({
			transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
			transition: `transform 500ms ease-in-out`,
		});
	}, [perspective]);

	return {
		ref: elementRef,
		style: mobileDisabled && isMobile ? {} : style, // Скидаємо стилі для мобільних
		onMouseMove,
		onMouseLeave,
	};
};
