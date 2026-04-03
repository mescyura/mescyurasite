/// <reference types="vite/client" />

import 'react';

declare module 'react' {
	interface ImgHTMLAttributes {
		/** Специфікація HTML; React у dev може лаятись на camelCase `fetchPriority`. */
		fetchpriority?: 'high' | 'low' | 'auto' | undefined;
	}
}
