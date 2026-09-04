import React, { useId } from 'react'
import styled from 'styled-components'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label associated with the textarea. */
  label?: string
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
}

const Field = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.sz_2400};
  font-family: ${({ theme }) => theme.fontFamily};
`

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spaces.sm};
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const RequiredIndicator = styled.span`
  margin-left: ${({ theme }) => theme.spaces.xs};
  color: ${({ theme }) => theme.colors.danger};
`

const StyledTextArea = styled.textarea<{ $hasError: boolean }>`
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.sz_200};
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.heading};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  line-height: 1.4;
  outline: none;
  resize: vertical;
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

const ErrorMessage = styled.p`
  margin: ${({ theme }) => `${theme.spaces.sm} 0 0`};
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const TextArea: React.FC<TextAreaProps> = ({ 'aria-describedby': ariaDescribedBy, error, id, label, ...props }) => {
  const generatedId = useId()
  const textAreaId = id ?? generatedId
  const errorId = `${textAreaId}-error`
  const describedBy = [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined

  return (
    <Field>
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
      />
      {error ? (
        <ErrorMessage id={errorId} aria-live='polite' role='alert'>
          {error}
        </ErrorMessage>
      ) : null}
    </Field>
  )
}

export default TextArea
