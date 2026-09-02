import type { ThemeType } from './theme';

export type ControlSize = 'default' | 'sm' | 'md' | 'lg';
export type ControlWidth = 'default' | 'auto' | 'sm' | 'md' | 'lg' | 'full';

export const controlSizeStyles = {
  default: {
    padding: 'md',
  },
  sm: {
    fontSize: 'sm',
    padding: 'sm',
    minHeight: 'sz_200',
  },
  md: {
    fontSize: 'md',
    padding: 'md',
    minHeight: 'sz_250',
  },
  lg: {
    fontSize: 'lg',
    padding: 'lg',
    minHeight: 'sz_300',
  },
} as const satisfies Record<ControlSize, {
  padding: keyof ThemeType['spaces'];
  fontSize?: keyof ThemeType['fontSizes'];
  minHeight?: keyof ThemeType['sizes'];
}>;

export const controlWidthTokens = {
  default: 'auto',
  auto: 'auto',
  sm: 'sz_800',
  md: 'sz_1200',
  lg: 'sz_1600',
} as const satisfies Record<Exclude<ControlWidth, 'full'>, keyof ThemeType['sizes'] | 'auto'>;