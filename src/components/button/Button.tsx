import React from 'react'
import styled from 'styled-components'
import { controlSizeStyles, controlWidthTokens } from '../../styles/control'
import type { ControlSize, ControlWidth } from '../../styles/control'
import type { ThemeType } from '../../styles/theme'

export type ButtonSize = ControlSize
export type ButtonVariant = 'primary' | 'secondary'
export type ButtonWidth = ControlWidth

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  size?: ButtonSize
  width?: ButtonWidth
  variant?: ButtonVariant
}

const variantStyles = {
  primary: {
    background: 'activeBorder',
    border: 'activeBorder',
    color: 'surface',
    hoverBackground: 'activeBorder',
  },
  secondary: {
    background: 'surface',
    border: 'border',
    color: 'heading',
    hoverBackground: 'surfaceAlt',
  },
} as const

interface StyledButtonProps {
  $size: ButtonSize
  $variant: ButtonVariant
  $width?: ButtonWidth
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
    minHeight?: keyof ThemeType['sizes']
  } = controlSizeStyles[size]

  return {
    fontSize: sizeStyle.fontSize ? theme.fontSizes[sizeStyle.fontSize] : 'inherit',
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
  border: 1px solid ${({ theme, $variant }) => theme.colors[variantStyles[$variant].border]};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme, $variant }) => theme.colors[variantStyles[$variant].background]};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  color: ${({ theme, $variant }) => theme.colors[variantStyles[$variant].color]};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme, $size }) => getButtonSizeStyle(theme, $size).fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.4;
  transform: translateY(0);
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.2s ease, transform 0.15s ease;
  user-select: none;
  white-space: nowrap;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.activeBorder};
    background-color: ${({ theme, $variant }) => theme.colors[variantStyles[$variant].hoverBackground]};
    box-shadow: ${({ theme }) => theme.boxShadow.bs_03};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
    transform: translateY(0);
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.focusBorder};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing}, ${({ theme }) => theme.boxShadow.bs_01};
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
  children,
  ...props
}) => (
  <StyledButton
    className={className}
    $size={size}
    $variant={variant}
    $width={width}
    data-size={size}
    data-variant={variant}
    data-width={width}
    {...props}
  >
    {iconLeft && <Icon aria-hidden='true'>{iconLeft}</Icon>}
    {children}
    {iconRight && <Icon aria-hidden='true'>{iconRight}</Icon>}
  </StyledButton>
)

export default Button
