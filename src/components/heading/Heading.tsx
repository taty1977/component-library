import React from 'react'
import styled from 'styled-components'
import type { ThemeType } from '../../styles/theme'

export type HeadingWeight = keyof ThemeType['fontWeights']
export type HeadingFamily = keyof ThemeType['fontFamilies']
export type HeadingColor = 'title' | keyof ThemeType['actionColors']
export type HeadingLevel = keyof ThemeType['headingSizes']
export type HeadingTextTransform = keyof ThemeType['textTransforms']

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  weight?: HeadingWeight
  family?: HeadingFamily
  color?: HeadingColor
  textTransform?: HeadingTextTransform
}

interface StyledHeadingProps {
  $level: HeadingLevel
  $weight: HeadingWeight
  $family: HeadingFamily
  $color: HeadingColor
  $textTransform: HeadingTextTransform
}

const StyledHeading = styled.h1<StyledHeadingProps>`
  margin: 0;
  color: ${({ $color, theme }) => ($color === 'title' ? theme.colors.title : theme.actionColors[$color])};
  font-family: ${({ $family, theme }) => theme.fontFamilies[$family]};
  font-size: ${({ $level, theme }) => theme.headingSizes[$level]};
  font-weight: ${({ $weight, theme }) => theme.fontWeights[$weight]};
  line-height: 1.2;
  text-transform: ${({ $textTransform, theme }) => theme.textTransforms[$textTransform]};
`

const Heading: React.FC<HeadingProps> = ({
  level = 'h1',
  weight = 'bold',
  family = 'merriweather',
  color = 'title',
  textTransform = 'none',
  children,
  ...props
}) => (
  <StyledHeading
    as={level}
    $level={level}
    $weight={weight}
    $family={family}
    $color={color}
    $textTransform={textTransform}
    {...props}
  >
    {children}
  </StyledHeading>
)

export default Heading
