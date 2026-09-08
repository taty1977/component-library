import React from 'react'
import styled from 'styled-components'
import type { ThemeType } from '../../styles/theme'

export type ParagraphSize = keyof ThemeType['fontSizes']
export type ParagraphWeight = keyof ThemeType['fontWeights']
export type ParagraphFamily = keyof ThemeType['fontFamilies']
export type ParagraphColor = keyof ThemeType['actionColors']
export type ParagraphTextDecoration = keyof ThemeType['textDecorations']

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: ParagraphSize
  weight?: ParagraphWeight
  family?: ParagraphFamily
  color?: ParagraphColor
  textDecoration?: ParagraphTextDecoration
}

interface StyledParagraphProps {
  $size: ParagraphSize
  $weight: ParagraphWeight
  $family: ParagraphFamily
  $color: ParagraphColor
  $textDecoration: ParagraphTextDecoration
}

const StyledParagraph = styled.p<StyledParagraphProps>`
  margin: 0;
  color: ${({ $color, theme }) => theme.actionColors[$color]};
  font-family: ${({ $family, theme }) => theme.fontFamilies[$family]};
  font-size: ${({ $size, theme }) => theme.fontSizes[$size]};
  font-weight: ${({ $weight, theme }) => theme.fontWeights[$weight]};
  line-height: 1.6;
  text-decoration: ${({ $textDecoration, theme }) => theme.textDecorations[$textDecoration]};
`

const Paragraph: React.FC<ParagraphProps> = ({
  size = 'md',
  weight = 'normal',
  family = 'paragraph',
  color = 'Primary',
  textDecoration = 'none',
  children,
  ...props
}) => (
  <StyledParagraph
    $size={size}
    $weight={weight}
    $family={family}
    $color={color}
    $textDecoration={textDecoration}
    {...props}
  >
    {children}
  </StyledParagraph>
)

export default Paragraph
