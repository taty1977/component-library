export type { ThemeType } from './theme';
export declare const theme: import('./theme').ThemeType;

export type { ColorTokens } from './colors';
export declare const colors: import('./colors').ColorTokens;

export type { SizeTokens } from './sizes';
export declare const sizes: import('./sizes').SizeTokens;

// Primitive-friendly aliases
export type ColorValue = string;
export type SizeValue = string;

export type ThemeColors = { [K in keyof import('./colors').ColorTokens]: ColorValue };
export type ThemeSizes = { [K in keyof import('./sizes').SizeTokens]: SizeValue };

// Primitive-friendly theme mapping — flattens nested theme objects to string values
export type ThemePrimitive = {
	[K in keyof import('./theme').ThemeType]: import('./theme').ThemeType[K] extends Record<string, any>
		? { [P in keyof import('./theme').ThemeType[K]]: string }
		: string;
};

