import React, { useId } from 'react'
import styled from 'styled-components'
import type { ThemeType } from '../../styles/theme'

export type InputVariant = 'primary' | 'secondary'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
  'aria-describedby'?: string
  value?: React.InputHTMLAttributes<HTMLInputElement>['value']
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  error?: string
  variant?: InputVariant
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  outsideIconLeft?: React.ReactNode
  outsideIconRight?: React.ReactNode
  handleActions?: () => void
}

const Field = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.sz_2400};
  font-family: ${({ theme }) => theme.fontFamily};
`

const Label = styled.label<{ $hasOutsideLeftIcon: boolean }>`
  display: block;
  margin-left: ${({ theme, $hasOutsideLeftIcon }) =>
    $hasOutsideLeftIcon ? `calc(${theme.sizes.sz_175} + ${theme.spaces.sm})` : '0'};
  margin-bottom: ${({ theme }) => theme.spaces.sm};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const RequiredIndicator = styled.span`
  margin-left: ${({ theme }) => theme.spaces.xs};
  color: ${({ theme }) => theme.actionColors.danger};
`

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`

const InputRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spaces.sm};
`

const getVariantAppearance = (theme: ThemeType, variant: InputVariant) => {
  if (variant === 'secondary') {
    return { color: theme.colors.secondary.base, focusBorder: theme.colors.secondary.focusBorder }
  }

  return { color: theme.colors.primary.base, focusBorder: theme.colors.primary.focusBorder }
}

const OutsideIcon = styled.span<{ $interactive: boolean; $variant: InputVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  aspect-ratio: 1;
  color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
  flex-shrink: 0;
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};

  & > svg {
    width: 100%;
    min-width: ${({ theme }) => theme.sizes.sz_175};
    height: 100%;
  }
`

const Icon = styled.span<{ $side: 'left' | 'right'; $variant: InputVariant }>`
  position: absolute;
  ${({ $side, theme }) => ($side === 'left' ? `left: ${theme.spaces.md};` : `right: ${theme.spaces.md};`)}
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  color: ${({ theme, $side, $variant }) =>
    $side === 'left' ? theme.colors.title : getVariantAppearance(theme, $variant).color};
  pointer-events: none;

  & > svg {
    width: 100%;
    height: 100%;
  }
`

const StyledInput = styled.input<{
  $hasLeftIcon: boolean
  $hasRightIcon: boolean
  $hasError: boolean
  $variant: InputVariant
}>`
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme, $hasLeftIcon, $hasRightIcon }) => {
    const leftPadding = $hasLeftIcon ? `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})` : theme.spaces.lg
    const rightPadding = $hasRightIcon ? `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})` : theme.spaces.lg
    return `${theme.spaces.md} ${rightPadding} ${theme.spaces.md} ${leftPadding}`
  }};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.actionColors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  line-height: 1.4;
  outline: none;
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }

  &:focus {
    border-color: ${({ theme, $hasError, $variant }) =>
      $hasError ? theme.actionColors.danger : getVariantAppearance(theme, $variant).color};
    box-shadow: ${({ theme, $hasError, $variant }) =>
      $hasError
        ? `0 0 0 3px ${theme.actionColors.danger}33`
        : `0 0 0 3px ${getVariantAppearance(theme, $variant).color}33`};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const ErrorMessage = styled.p<{ $hasOutsideLeftIcon: boolean }>`
  margin: ${({ theme }) => `${theme.spaces.sm} 0 0`};
  margin-left: ${({ theme, $hasOutsideLeftIcon }) =>
    $hasOutsideLeftIcon ? `calc(${theme.sizes.sz_175} + ${theme.spaces.sm})` : '0'};
  color: ${({ theme }) => theme.actionColors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const Input: React.FC<InputProps> = ({
  className,
  'aria-describedby': ariaDescribedBy,
  type = 'text',
  error,
  iconLeft,
  iconRight,
  variant = 'primary',
  id,
  label,
  outsideIconLeft,
  outsideIconRight,
  handleActions,
  ...props
}) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const describedBy = [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined
  const outsideIconProps = handleActions
    ? {
        $interactive: true,
        role: 'button' as const,
        tabIndex: 0,
        onClick: handleActions,
        onKeyDown: (event: React.KeyboardEvent<HTMLSpanElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleActions()
          }
        },
      }
    : { $interactive: false }

  return (
    <Field className={className}>
      {label ? (
        <Label $hasOutsideLeftIcon={Boolean(outsideIconLeft)} htmlFor={inputId}>
          {label}
          {props.required ? <RequiredIndicator aria-hidden='true'>*</RequiredIndicator> : null}
        </Label>
      ) : null}
      <InputRow>
        {outsideIconLeft ? (
          <OutsideIcon {...outsideIconProps} $variant={variant} aria-hidden={handleActions ? undefined : 'true'}>
            {outsideIconLeft}
          </OutsideIcon>
        ) : null}
        <InputWrapper>
          {iconLeft ? (
            <Icon $side='left' $variant={variant} aria-hidden='true'>
              {iconLeft}
            </Icon>
          ) : null}
          <StyledInput
            aria-describedby={describedBy}
            id={inputId}
            type={type}
            aria-invalid={error ? true : undefined}
            $hasError={Boolean(error)}
            $hasLeftIcon={Boolean(iconLeft)}
            $hasRightIcon={Boolean(iconRight)}
            $variant={variant}
            {...props}
          />
          {iconRight ? (
            <Icon $side='right' $variant={variant} aria-hidden='true'>
              {iconRight}
            </Icon>
          ) : null}
        </InputWrapper>
        {outsideIconRight ? (
          <OutsideIcon {...outsideIconProps} $variant={variant} aria-hidden={handleActions ? undefined : 'true'}>
            {outsideIconRight}
          </OutsideIcon>
        ) : null}
      </InputRow>
      {error ? (
        <ErrorMessage $hasOutsideLeftIcon={Boolean(outsideIconLeft)} aria-live='polite' id={errorId} role='alert'>
          {error}
        </ErrorMessage>
      ) : null}
    </Field>
  )
}

export default Input
