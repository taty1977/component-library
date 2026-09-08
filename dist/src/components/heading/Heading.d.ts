import React from 'react';
import type { ThemeType } from '../../styles/theme';
export type HeadingWeight = keyof ThemeType['fontWeights'];
export type HeadingFamily = keyof ThemeType['fontFamilies'];
export type HeadingColor = keyof ThemeType['actionColors'];
export type HeadingLevel = keyof ThemeType['headingSizes'];
export type HeadingTextDecoration = 'none' | 'underline' | 'overline' | 'line-through' | 'capitalize';
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
    weight?: HeadingWeight;
    family?: HeadingFamily;
    color?: HeadingColor;
    textDecoration?: HeadingTextDecoration;
}
declare const Heading: React.FC<HeadingProps>;
export default Heading;
