import { colors } from './colors'
import { breakpoints } from './breakpoints'
import { sizes } from './sizes'

const baseTheme = {
  boxShadow: {
    bs_01: `0 1px 2px ${colors.col_0f172a0d}`,
    bs_02: `0 0 0 3px ${colors.col_0f172a0d}`,
    bs_03: `0 8px 20px ${colors.col_0f172a0d}`,
    bs_04: `0 8px 20px ${colors.col_0f172a1f}`,
  },
  carouselImageGallery: {
    borderRadius: '62.438rem',
    maxWidth: '60rem',
    minHeight: '25rem',
    maxHeight: '25rem',
    tabletMaxHeight: '15rem',
    mobileMaxHeight: '10rem',
    modalMaxWidth: '64rem',
    modalTabletMaxWidth: '48rem',
    modalMaxHeight: '90dvh',
    modalTabletMaxHeight: '92dvh',
    modalMobileMaxHeight: '100dvh',
    tabletBreakpoint: breakpoints.tablet,
    mobileBreakpoint: breakpoints.mobile,
  },
  fontFamilies: {
    merriweather: "'Merriweather', serif",
    openSans: "'Open Sans', sans-serif",
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
    semiBold: 600,
    bold: 700,
    extraBold: 800,
  },
  headingSizes: {
    h1: sizes.sz_300,
    h2: sizes.sz_250,
    h3: sizes.sz_200,
    h4: sizes.sz_175,
    h5: sizes.sz_150,
    h6: sizes.sz_125,
  },
  textTransforms: {
    none: 'none',
    capitalize: 'capitalize',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
  },
  actionColors: {
    Primary: colors.col_377eb3,
    Secondary: colors.col_132c3e,
    success: colors.col_15803d,
    danger: colors.col_dc3545,
    info: colors.col_17a2b8,
    warning: colors.col_ffcc00,
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
}

// Brand Theme Generated using https://accessibility.build/tools/color-palette-generator
// Base color: #7aaed6
// Color Harmony: Monochromatic
// Accessibility: WCAG AA compliant contrast ratios for text and interactive elements

const brandThemeColors = {
  // Primary color palette - Blue tones with accessible contrast
  primary: {
    base: colors.col_367caf,
    text: colors.col_ffffff,
    hover: colors.col_2e6894,
    focus: colors.col_255a7a,
    focusBorder: colors.col_d8e7f3,
    border: colors.col_367caf,
    disabled: colors.col_dedfe3,
    disabledText: colors.col_111827,
    surface: colors.col_edf5fb,
  },

  // Secondary color palette - Dark teal tones with accessible contrast
  secondary: {
    base: colors.col_132c3e,
    text: colors.col_ffffff,
    hover: colors.col_0d1f2f,
    focus: colors.col_081018,
    focusBorder: colors.col_9fbdd0,
    border: colors.col_132c3e,
    disabled: colors.col_dedfe3,
    disabledText: colors.col_111827,
    surface: colors.col_fbf4f9,
  },

  // Nature color palette - Light blue tones with accessible contrast
  nature: {
    base: colors.col_8ab7db,
    text: colors.col_ffffff,
    hover: colors.col_7aa8d1,
    focus: colors.col_6a99c7,
    focusBorder: colors.col_e8f0f8,
    border: colors.col_8ab7db,
    disabled: colors.col_dedfe3,
    disabledText: colors.col_111827,
    surface: colors.col_f1f7fc,
  },

  // Neutral color palette - Dark gray tones with accessible contrast
  neutral: {
    base: colors.col_3c4048,
    text: colors.col_ffffff,
    hover: colors.col_2f353b,
    focus: colors.col_242930,
    focusBorder: colors.col_d0d4db,
    border: colors.col_3c4048,
    disabled: colors.col_dedfe3,
    disabledText: colors.col_111827,
    surface: colors.col_f1f2f4,
  },

  // Shared neutral surfaces and semantic feedback colors.
  surface: colors.col_ffffff,
  surfaceAlt: colors.col_f4f9fb,
  border: colors.col_e2e8f0,
  title: colors.col_0d3f48,
  text: colors.col_4f545f,
  mutedText: colors.col_57757d,
  overlay: colors.col_0d4b57,
  focusBorder: colors.col_0369a1,
  focusRing: colors.col_0284c747,
  activeRing: colors.col_3b82f640,
  overlayBackdrop: colors.col_0f172a99,
}

export const brandTheme = {
  ...baseTheme,
  colors: brandThemeColors,
  fontFamily: baseTheme.fontFamilies.openSans,
}

export const theme = brandTheme
export type ThemeType = typeof theme
