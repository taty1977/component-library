import { colors } from './colors';
import { sizes } from './sizes';

export const theme = {
  colors: {
    primary: colors.col_0070f3,
    secondary: colors.col_1fa1f2,
    text: colors.col_333333,
    surface: colors.col_ffffff,
    surfaceAlt: colors.col_f8fafc,
    border: colors.col_e2e8f0,
    heading: colors.col_0f172a,
    mutedText: colors.col_334155,
    icon: colors.col_64748b,
  },
  space: {
    xs: sizes.sz_025,
    sm: sizes.sz_050,
    md: sizes.sz_100,
    lg: sizes.sz_150,
    xl: sizes.sz_200,
  },
  headingSizes: {
    h1: sizes.sz_200,
    h2: sizes.sz_175,
    h3: sizes.sz_150,
    h4: sizes.sz_125,
    h5: sizes.sz_100,
    h6: sizes.sz_075,
  },
  fontSizes: {
    sm: sizes.sz_100,
    md: sizes.sz_125,
    lg: sizes.sz_150,
    xl: sizes.sz_200,
  },
};

export type ThemeType = typeof theme;