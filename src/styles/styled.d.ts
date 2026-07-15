import 'styled-components';
import type { ThemeType } from './theme';

declare module 'styled-components' {
  // Extend DefaultTheme with our ThemeType so styled-components typings match
  export interface DefaultTheme extends ThemeType {}
}
