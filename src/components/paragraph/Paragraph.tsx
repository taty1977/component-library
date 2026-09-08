import React from 'react'
import styled from 'styled-components'
import type { ThemeType } from '../../styles/theme'

export type ParagraphSize = keyof ThemeType['fontSizes']
export type ParagraphWeight = keyof ThemeType['fontWeights']
export type ParagraphFamily = keyof ThemeType['fontFamilies']
export type ParagraphColor = 'text' | keyof ThemeType['actionColors']
export type ParagraphTextTransform = keyof ThemeType['textTransforms']

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: ParagraphSize
  weight?: ParagraphWeight
  family?: ParagraphFamily
  color?: ParagraphColor
  textTransform?: ParagraphTextTransform
}

interface StyledParagraphProps {
  $size: ParagraphSize
  $weight: ParagraphWeight
  $family: ParagraphFamily
  $color: ParagraphColor
  $textTransform: ParagraphTextTransform
}

const StyledParagraph = styled.p<StyledParagraphProps>`
  margin: 0;
  color: ${({ $color, theme }) => ($color === 'text' ? theme.colors.text : theme.actionColors[$color])};
  font-family: ${({ $family, theme }) => theme.fontFamilies[$family]};
  font-size: ${({ $size, theme }) => theme.fontSizes[$size]};
  font-weight: ${({ $weight, theme }) => theme.fontWeights[$weight]};
  line-height: 1.6;
  text-transform: ${({ $textTransform, theme }) => theme.textTransforms[$textTransform]};
`

const Paragraph: React.FC<ParagraphProps> = ({
  size = 'md',
  weight = 'normal',
  family = 'openSans',
  color = 'text',
  textTransform = 'none',
  children,
  ...props
}) => (
  <StyledParagraph
    $size={size}
    $weight={weight}
    $family={family}
    $color={color}
    $textTransform={textTransform}
    {...props}
  >
    {children}
  </StyledParagraph>
)

export default Paragraph
