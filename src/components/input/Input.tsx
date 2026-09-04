import React, { useId } from 'react'
import styled from 'styled-components'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  'aria-describedby'?: string
  value?: React.InputHTMLAttributes<HTMLInputElement>['value']
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  error?: string
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
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const RequiredIndicator = styled.span`
  margin-left: ${({ theme }) => theme.spaces.xs};
  color: ${({ theme }) => theme.colors.danger};
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

const OutsideIcon = styled.span<{ $interactive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  aspect-ratio: 1;
  color: ${({ theme }) => theme.colors.icon};
  flex-shrink: 0;
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};

  & > svg {
    width: 100%;
    min-width: ${({ theme }) => theme.sizes.sz_175};
    height: 100%;
  }
`

const Icon = styled.span<{ $side: 'left' | 'right' }>`
  position: absolute;
  ${({ $side, theme }) => ($side === 'left' ? `left: ${theme.spaces.md};` : `right: ${theme.spaces.md};`)}
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  color: ${({ theme }) => theme.colors.icon};
  pointer-events: none;
`

const StyledInput = styled.input<{ $hasLeftIcon: boolean; $hasRightIcon: boolean; $hasError: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme, $hasLeftIcon, $hasRightIcon }) => {
    const leftPadding = $hasLeftIcon ? `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})` : theme.spaces.lg
    const rightPadding = $hasRightIcon ? `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})` : theme.spaces.lg
    return `${theme.spaces.md} ${rightPadding} ${theme.spaces.md} ${leftPadding}`
  }};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.heading};
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
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.boxShadow.bs_04};
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
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const Input: React.FC<InputProps> = ({
  'aria-describedby': ariaDescribedBy,
  type = 'text',
  error,
  iconLeft,
  iconRight,
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
    <Field>
      {label ? (
        <Label $hasOutsideLeftIcon={Boolean(outsideIconLeft)} htmlFor={inputId}>
          {label}
          {props.required ? <RequiredIndicator aria-hidden='true'>*</RequiredIndicator> : null}
        </Label>
      ) : null}
      <InputRow>
        {outsideIconLeft ? (
          <OutsideIcon {...outsideIconProps} aria-hidden={handleActions ? undefined : 'true'}>
            {outsideIconLeft}
          </OutsideIcon>
        ) : null}
        <InputWrapper>
          {iconLeft ? (
            <Icon $side='left' aria-hidden='true'>
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
            {...props}
          />
          {iconRight ? (
            <Icon $side='right' aria-hidden='true'>
              {iconRight}
            </Icon>
          ) : null}
        </InputWrapper>
        {outsideIconRight ? (
          <OutsideIcon {...outsideIconProps} aria-hidden={handleActions ? undefined : 'true'}>
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
