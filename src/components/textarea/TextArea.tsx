import React, { useId } from 'react'
import styled from 'styled-components'
import type { ThemeType } from '../../styles/theme'

export type TextareaVariant = 'primary' | 'secondary'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label associated with the textarea. */
  label?: string
  /** Class name applied to the outer field container. */
  className?: string
  /** Number of visible text rows. */
  rows?: number
  /** Additional element IDs announced with the field. */
  'aria-describedby'?: string
  /** Controlled textarea value. Use with onChange. */
  value?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['value']
  /** Called when the textarea value changes. */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  /** Validation message displayed below the textarea. */
  error?: string
  /** Theme color treatment for the focus state. */
  variant?: TextareaVariant
}

const Field = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.sz_2400};
  font-family: ${({ theme }) => theme.fontFamily};
`

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spaces.sm};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const RequiredIndicator = styled.span`
  margin-left: ${({ theme }) => theme.spaces.xs};
  color: ${({ theme }) => theme.actionColors.danger};
`

const getVariantAppearance = (theme: ThemeType, variant: TextareaVariant) => {
  if (variant === 'secondary') {
    return { color: theme.colors.secondary.base, focusBorder: theme.colors.secondary.focusBorder }
  }

  return { color: theme.colors.primary.base, focusBorder: theme.colors.primary.focusBorder }
}

const StyledTextArea = styled.textarea<{ $hasError: boolean; $variant: TextareaVariant }>`
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.sz_200};
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.actionColors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  line-height: 1.4;
  outline: none;
  resize: vertical;
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.boxShadow.bs_02};
  }

  &:focus {
    border-color: ${({ theme, $hasError, $variant }) =>
      $hasError ? theme.actionColors.danger : getVariantAppearance(theme, $variant).color};
    box-shadow: ${({ theme, $hasError, $variant }) =>
      $hasError
        ? `0 0 0 3px ${theme.actionColors.danger}33`
        : `0 0 0 3px ${getVariantAppearance(theme, $variant).color}33`};
    background-color: ${({ theme }) => theme.colors.surface};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const ErrorMessage = styled.p`
  margin: ${({ theme }) => `${theme.spaces.sm} 0 0`};
  color: ${({ theme }) => theme.actionColors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const Textarea: React.FC<TextareaProps> = ({
  className,
  'aria-describedby': ariaDescribedBy,
  error,
  id,
  label,
  variant = 'primary',
  ...props
}) => {
  const generatedId = useId()
  const textAreaId = id ?? generatedId
  const errorId = `${textAreaId}-error`
  const describedBy = [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined

  return (
    <Field className={className}>
      {label ? (
        <Label htmlFor={textAreaId}>
          {label}
          {props.required ? <RequiredIndicator aria-hidden='true'>*</RequiredIndicator> : null}
        </Label>
      ) : null}
      <StyledTextArea
        {...props}
        id={textAreaId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        $hasError={Boolean(error)}
        $variant={variant}
      />
      {error ? (
        <ErrorMessage id={errorId} aria-live='polite' role='alert'>
          {error}
        </ErrorMessage>
      ) : null}
    </Field>
  )
}

export default Textarea
