import React from 'react'
import styled from 'styled-components'
import { controlSizeStyles, controlWidthTokens } from '../../styles/control'
import type { ControlSize, ControlWidth } from '../../styles/control'
import type { ThemeType } from '../../styles/theme'

export type ButtonSize = ControlSize
export type ButtonVariant = 'primary' | 'secondary'
export type ButtonWidth = ControlWidth
export type ButtonShape = 'rectangle' | 'pill'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  size?: ButtonSize
  width?: ButtonWidth
  variant?: ButtonVariant
  outline?: boolean
  shape?: ButtonShape
}

const variantStyles = {
  primary: {
    background: 'primary',
    border: 'primary',
    color: 'surface',
    hoverBackground: 'primaryHover',
    hoverBorder: 'primaryHover',
  },
  secondary: {
    background: 'secondary',
    border: 'secondary',
    color: 'surface',
    hoverBackground: 'secondaryHover',
    hoverBorder: 'secondaryHover',
  },
} as const

interface StyledButtonProps {
  $size: ButtonSize
  $variant: ButtonVariant
  $width?: ButtonWidth
  $shape?: ButtonShape
  $outline?: boolean
}

interface ButtonAppearance {
  background: string
  border: string
  color: string
  hoverBackground: string
  hoverBorder: string
  hoverColor: string
}

const getButtonAppearance = (theme: ThemeType, variant: ButtonVariant, outline = false): ButtonAppearance => {
  const styles = variantStyles[variant]
  const baseAppearance = {
    background: theme.colors[styles.background],
    border: theme.colors[styles.border],
    color: theme.colors[styles.color],
    hoverBackground: theme.colors[styles.hoverBackground],
    hoverBorder: theme.colors[styles.hoverBorder],
    hoverColor: theme.colors[styles.color],
  }

  if (!outline) return baseAppearance

  return {
    background: theme.colors.surface,
    border: theme.colors[variant],
    color: theme.colors[variant],
    hoverBackground: theme.colors[`${variant}Hover`],
    hoverBorder: theme.colors[`${variant}Hover`],
    hoverColor: theme.colors.surface,
  }
}

const getButtonWidth = (theme: ThemeType, width: ButtonWidth) => {
  if (width === 'full') return '100%'

  // Preset widths resolve through shared theme size tokens; default remains automatic.
  const widthToken = controlWidthTokens[width]
  return widthToken === 'auto' ? 'auto' : theme.sizes[widthToken]
}

const getButtonSizeStyle = (theme: ThemeType, size: ButtonSize) => {
  // The default control size supplies padding without forcing typography or height.
  const sizeStyle: {
    padding: keyof ThemeType['spaces']
    fontSize?: keyof ThemeType['fontSizes']
    fontWeight?: keyof ThemeType['fontWeights']
    minHeight?: keyof ThemeType['sizes']
  } = controlSizeStyles[size]

  return {
    fontSize: sizeStyle.fontSize ? theme.fontSizes[sizeStyle.fontSize] : 'inherit',
    fontWeight: sizeStyle.fontWeight ? theme.fontWeights[sizeStyle.fontWeight] : theme.fontWeights.semibold,
    minHeight: sizeStyle.minHeight ? theme.sizes[sizeStyle.minHeight] : 'auto',
    padding: `${theme.spaces[sizeStyle.padding]} ${theme.spaces.lg}`,
  }
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.sm};
  box-sizing: border-box;
  width: ${({ theme, $width }) => getButtonWidth(theme, $width ?? 'default')};
  min-height: ${({ theme, $size }) => getButtonSizeStyle(theme, $size).minHeight};
  padding: ${({ theme, $size }) => getButtonSizeStyle(theme, $size).padding};
  border: ${({ theme, $variant, $outline }) => {
    const appearance = getButtonAppearance(theme, $variant, $outline)
    return `2px solid ${appearance.border}`
  }};
  border-radius: ${({ $shape }) => ($shape === 'pill' ? '9999px' : '0.5rem')};
  background-color: ${({ theme, $variant, $outline }) => getButtonAppearance(theme, $variant, $outline).background};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  color: ${({ theme, $variant, $outline }) => getButtonAppearance(theme, $variant, $outline).color};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme, $size }) => getButtonSizeStyle(theme, $size).fontSize};
  font-weight: ${({ theme, $size }) => getButtonSizeStyle(theme, $size).fontWeight ?? theme.fontWeights.medium};
  line-height: 1.4;
  transform: translateY(0);
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.2s ease, transform 0.15s ease;
  user-select: none;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $variant, $outline }) =>
      getButtonAppearance(theme, $variant, $outline).hoverBackground};
    border-color: ${({ theme, $variant, $outline }) => getButtonAppearance(theme, $variant, $outline).hoverBorder};
    color: ${({ theme, $variant, $outline }) => getButtonAppearance(theme, $variant, $outline).hoverColor};
    box-shadow: ${({ theme }) => theme.boxShadow.bs_03};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
    transform: translateY(0);
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme, $variant }) => theme.colors[$variant]};
    box-shadow: 0 0 0 3px ${({ theme, $variant }) => theme.colors[$variant]}, ${({ theme }) => theme.boxShadow.bs_01};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  color: currentColor;
`

const Button: React.FC<ButtonProps> = ({
  className,
  iconLeft,
  iconRight,
  size = 'default',
  width = 'default',
  variant = 'primary',
  outline = false,
  shape = 'rectangle',
  children,
  ...props
}) => (
  <StyledButton
    className={className}
    $size={size}
    $variant={variant}
    $width={width}
    $shape={shape}
    $outline={outline}
    data-size={size}
    data-variant={variant}
    data-width={width}
    data-shape={shape}
    data-outline={outline}
    {...props}
  >
    {iconLeft && <Icon aria-hidden='true'>{iconLeft}</Icon>}
    {children}
    {iconRight && <Icon aria-hidden='true'>{iconRight}</Icon>}
  </StyledButton>
)

export default Button
