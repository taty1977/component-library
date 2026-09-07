import React from 'react'
import styled from 'styled-components'
import type { ThemeType } from '../../styles/theme'

export type HeadingWeight = keyof ThemeType['fontWeights']
export type HeadingFamily = keyof ThemeType['fontFamilies']
export type HeadingColor = keyof ThemeType['actionColors']
export type HeadingLevel = keyof ThemeType['headingSizes']
export type HeadingTextDecoration = 'none' | 'underline' | 'overline' | 'line-through' | 'capitalize'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  weight?: HeadingWeight
  family?: HeadingFamily
  color?: HeadingColor
  textDecoration?: HeadingTextDecoration
}

interface StyledHeadingProps {
  $level: HeadingLevel
  $weight: HeadingWeight
  $family: HeadingFamily
  $color: HeadingColor
  $textDecoration: HeadingTextDecoration
}

const StyledHeading = styled.h1<StyledHeadingProps>`
  margin: 0;
  color: ${({ $color, theme }) => theme.actionColors[$color]};
  font-family: ${({ $family, theme }) => theme.fontFamilies[$family]};
  font-size: ${({ $level, theme }) => theme.headingSizes[$level]};
  font-weight: ${({ $weight, theme }) => theme.fontWeights[$weight]};
  line-height: 1.2;
  text-decoration: ${({ $textDecoration }) => $textDecoration};
`

const Heading: React.FC<HeadingProps> = ({
  level = 'h1',
  weight = 'bold',
  family = 'heading',
  color = 'Primary',
  textDecoration = 'none',
  children,
  ...props
}) => (
  <StyledHeading
    as={level}
    $level={level}
    $weight={weight}
    $family={family}
    $color={color}
    $textDecoration={textDecoration}
    {...props}
  >
    {children}
  </StyledHeading>
)

export default Heading
