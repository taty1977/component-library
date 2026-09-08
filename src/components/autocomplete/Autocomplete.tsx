import React, { useId, useState } from 'react'
import styled from 'styled-components'
import { XMarkIcon } from '@heroicons/react/24/solid'
import type { ThemeType } from '../../styles/theme'

export type AutocompleteVariant = 'primary' | 'secondary'

export interface AutocompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSelect' | 'value'> {
  options: string[]
  onSelect: (option: string) => void
  label?: string
  error?: string
  placeholder?: string
  variant?: AutocompleteVariant
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
}

const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.sz_2400};
  font-family: ${({ theme }) => theme.fontFamily};
`

const InputWrapper = styled.div`
  position: relative;
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

const getVariantAppearance = (theme: ThemeType, variant: AutocompleteVariant) => {
  if (variant === 'secondary') {
    return { color: theme.colors.secondary.base, focusBorder: theme.colors.secondary.focusBorder }
  }

  return { color: theme.colors.primary.base, focusBorder: theme.colors.primary.focusBorder }
}

const InputLeftIcon = styled.span<{ $variant: AutocompleteVariant }>`
  position: absolute;
  left: ${({ theme }) => theme.spaces.md};
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  pointer-events: none;

  & > svg {
    width: 100%;
    height: 100%;
  }
`

const InputRightIcon = styled.span<{ $variant: AutocompleteVariant }>`
  position: absolute;
  right: ${({ theme }) => theme.spaces.md};
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  pointer-events: none;

  & > svg {
    width: 100%;
    height: 100%;
  }
`

const ClearButton = styled.button<{ $variant: AutocompleteVariant }>`
  position: absolute;
  right: ${({ theme }) => theme.spaces.md};
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  border: none;
  border-radius: ${({ theme }) => theme.sizes.sz_999};
  background: transparent;
  color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
  cursor: pointer;
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`

const Input = styled.input<{
  $hasLeftIcon?: boolean
  $hasRightIcon?: boolean
  $hasError?: boolean
  $variant: AutocompleteVariant
}>`
  width: 100%;
  box-sizing: border-box;
  /* Reserve input space for optional icons and the contextual clear button. */
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
`

const ErrorMessage = styled.p`
  margin: ${({ theme }) => `${theme.spaces.sm} 0 0`};
  color: ${({ theme }) => theme.actionColors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spaces.sm});
  width: 100%;
  box-sizing: border-box;
  left: 0;
  margin: 0;
  padding: ${({ theme }) => `${theme.spaces.sm} 0`};
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_04};
  z-index: 20;
  overflow: hidden;
`

const OptionItem = styled.li`
  padding: ${({ theme }) => `${theme.spaces.sm} ${theme.spaces.lg}`};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.border};
  }
`

const Autocomplete: React.FC<AutocompleteProps> = ({
  className,
  error,
  iconLeft,
  iconRight,
  label,
  variant = 'primary',
  onChange: externalOnChange,
  onSelect,
  options,
  placeholder,
  value,
  ...props
}) => {
  const generatedId = useId()
  const inputId = props.id ?? generatedId
  const errorId = `${inputId}-error`
  const [inputValue, setInputValue] = useState(value ?? '')
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    externalOnChange?.(event)
    if (value.trim().length === 0) {
      setFilteredOptions([])
      return
    }
    setFilteredOptions(options.filter(option => option.toLowerCase().includes(value.toLowerCase())))
  }

  const handleOptionClick = (option: string) => {
    setInputValue(option)
    setFilteredOptions([])
    onSelect(option)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && filteredOptions.length > 0) {
      event.preventDefault()
      handleOptionClick(filteredOptions[0])
    }

    if (event.key === 'Escape') {
      setFilteredOptions([])
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (inputValue.trim().length === 0) {
      setFilteredOptions([])
      return
    }
    setFilteredOptions(options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase())))
  }

  const handleBlur = () => {
    setIsFocused(false)
    // Preserve the option click long enough for its mouse handler to run.
    setTimeout(() => setFilteredOptions([]), 100)
  }

  const handleClear = () => {
    setInputValue('')
    setFilteredOptions([])
  }

  const showClear = isFocused && inputValue.trim().length > 0
  // The clear affordance takes precedence over a supplied right icon.
  const hasRightAdornment = showClear || !!iconRight

  return (
    <AutocompleteContainer className={className}>
      {label ? (
        <Label htmlFor={inputId}>
          {label}
          {props.required ? <RequiredIndicator aria-hidden='true'>*</RequiredIndicator> : null}
        </Label>
      ) : null}
      <InputWrapper>
        {iconLeft && (
          <InputLeftIcon $variant={variant} aria-hidden='true'>
            {iconLeft}
          </InputLeftIcon>
        )}
        <Input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          {...props}
          id={inputId}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          $hasLeftIcon={!!iconLeft}
          $hasRightIcon={hasRightAdornment}
          $hasError={Boolean(error)}
          $variant={variant}
        />
        {showClear ? (
          <ClearButton
            type='button'
            $variant={variant}
            aria-label='Clear input'
            onMouseDown={event => event.preventDefault()}
            onClick={handleClear}
          >
            <XMarkIcon width='1em' height='1em' aria-hidden='true' />
          </ClearButton>
        ) : iconRight ? (
          <InputRightIcon $variant={variant} aria-hidden='true'>
            {iconRight}
          </InputRightIcon>
        ) : null}
      </InputWrapper>
      {filteredOptions.length > 0 && (
        <OptionsList>
          {filteredOptions.map(option => (
            <OptionItem
              key={option}
              onMouseDown={event => event.preventDefault()}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </OptionItem>
          ))}
        </OptionsList>
      )}
      {error ? (
        <ErrorMessage id={errorId} aria-live='polite' role='alert'>
          {error}
        </ErrorMessage>
      ) : null}
    </AutocompleteContainer>
  )
}

export default Autocomplete
