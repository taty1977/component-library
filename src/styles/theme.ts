import { colors } from './colors';
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
    minHeight: '12rem',
    maxHeight: '25rem',
    tabletMaxHeight: '15rem',
    mobileMaxHeight: '10rem',
    tabletBreakpoint: '900px',
    mobileBreakpoint: '640px',
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

export const brandTheme = {
  colors: {
    primary: colors.col_0088cc,
    secondary: colors.col_0169fe,
    tertiary: colors.col_005AEF,
    quaternary: colors.col_383f48,
    text: colors.col_777777,
    surface: colors.col_ffffff,
    surfaceAlt: colors.col_f8fafc,
    border: colors.col_e2e8f0,
    heading: colors.col_0f172a,
    mutedText: colors.col_777777,
    icon: colors.col_64748b,
    danger: colors.col_ff0000,
    ...colors,
  },
  fontFamily: "'Open Sans', sans-serif",
  ...baseTheme,
};

export const lightTheme = {
  colors: {
    primary: colors.col_0088cc,
    secondary: colors.col_0169fe,
    tertiary: colors.col_005AEF,
    quaternary: colors.col_383f48,
    text: colors.col_777777,
    surface: colors.col_ffffff,
    surfaceAlt: colors.col_f8fafc,
    border: colors.col_e2e8f0,
    heading: colors.col_0f172a,
    mutedText: colors.col_777777,
    icon: colors.col_64748b,
    ...colors,
  },
  fontFamily: "'Open Sans', sans-serif",
  ...baseTheme,
};

export const darkTheme = {
  colors: {
    primary: colors.col_0088cc,
    secondary: colors.col_0169fe,
    text: colors.col_383f48,
    surface: '#0f172a',
    surfaceAlt: '#111827',
    border: colors.col_334155,
    heading: colors.col_f8fafc,
    mutedText: colors.col_e2e8f0,
    icon: colors.col_f8fafc,
    ...colors,
  },
  fontFamily: "'Montserrat', sans-serif",
  ...baseTheme,
};

export const theme = brandTheme;
export type ThemeType = typeof theme;

