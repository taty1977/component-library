import { colors } from './colors';
import { breakpoints } from './breakpoints';
import { sizes } from './sizes';

const baseTheme = {
  boxShadow: {
    bs_01: `0 1px 2px ${colors.col_0f172a0d}`,
    bs_02: `0 0 0 3px ${colors.col_0f172a0d}`,
    bs_03: `0 8px 20px ${colors.col_0f172a0d}`,
  },
  carouselImageGallery: {
    borderRadius: '62.438rem',
    maxWidth: '60rem',
    minHeight: '25rem',
    maxHeight: '25rem',
    tabletMaxHeight: '15rem',
    mobileMaxHeight: '10rem',
    tabletBreakpoint: breakpoints.tablet,
    mobileBreakpoint: breakpoints.mobile,
  },
  fontSizes: {
    xs: sizes.sz_075,
    sm: sizes.sz_0875,
    md: sizes.sz_100,
    lg: sizes.sz_125,
    xl: sizes.sz_150,
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  headingSizes: {
    h1: sizes.sz_300,
    h2: sizes.sz_250,
    h3: sizes.sz_200,
    h4: sizes.sz_175,
    h5: sizes.sz_150,
    h6: sizes.sz_125,
  },
  sizes: {
    ...sizes,
  },
  spaces: {
    xs: sizes.sz_025,
    sm: sizes.sz_050,
    md: sizes.sz_100,
    lg: sizes.sz_150,
    xl: sizes.sz_200,
  },
};

const brandThemeColors = {
  primary: colors.col_0284c7,
  secondary: colors.col_0284c7,
  tertiary: colors.col_0284c7,
  heartActive: colors.col_0369a1,
  activeBorder: colors.col_0369a1,
  focusBorder: colors.col_0369a1,
  quaternary: '#123b4a',
  text: '#123b4a',
  surface: '#ffffff',
  surfaceAlt: '#f4f9fb',
  border: colors.col_e2e8f0,
  heading: '#0d3f48',
  mutedText: '#57757d',
  icon: '#446a73',
  danger: colors.col_dc3545,
  overlay: '#0d4b57',
  badgeBackground: '#f3f4f6',
  badgeBorder: '#d1d5db',
  badgeText: '#4b5563',
};

export const brandTheme = {
  ...baseTheme,
  colors: brandThemeColors,
  fontFamily: "'Open Sans', sans-serif",
};

export const theme = brandTheme;
export type ThemeType = typeof theme;

