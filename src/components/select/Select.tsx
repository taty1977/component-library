import React, { useId, useMemo, useState } from 'react'
import styled from 'styled-components'
import { CheckIcon } from '@heroicons/react/24/solid'
import type { ThemeType } from '../../styles/theme'

export type SelectVariant = 'primary' | 'secondary'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Visible label associated with the select. */
  label?: string
  /** Class name applied to the outer field container. */
  className?: string
  /** Placeholder text shown when no option is selected. */
  placeholder?: string
  /** Validation message displayed below the select. */
  error?: string
  /** Theme color treatment for selection controls and focus state. */
  variant?: SelectVariant
  /** Custom React content rendered inside the left side of the trigger. */
  iconLeft?: React.ReactNode
  /** Show a check icon beside the selected non-default option. */
  showSelectionCheck?: boolean
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

const getVariantAppearance = (theme: ThemeType, variant: SelectVariant) => {
  if (variant === 'secondary') {
    return { color: theme.colors.secondary.base, focusBorder: theme.colors.secondary.focusBorder }
  }

  return { color: theme.colors.primary.base, focusBorder: theme.colors.primary.focusBorder }
}

const SelectWrapper = styled.div<{ $variant: SelectVariant }>`
  position: relative;
  width: 100%;

  &::after {
    position: absolute;
    top: 50%;
    right: ${({ theme }) => theme.spaces.md};
    width: ${({ theme }) => theme.sizes.sz_050};
    height: ${({ theme }) => theme.sizes.sz_050};
    border-right: 2px solid ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
    border-bottom: 2px solid ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
    content: '';
    pointer-events: none;
    transform: translateY(-65%) rotate(45deg);
  }
`

const HiddenSelect = styled.select`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  clip-path: inset(50%);
`

const Adornment = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spaces.md};
  top: 50%;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  color: ${({ theme }) => theme.colors.title};
  pointer-events: none;
  transform: translateY(-50%);

  & > svg {
    width: 100%;
    height: 100%;
  }
`

const SelectTrigger = styled.button<{ $hasLeftIcon: boolean; $hasError: boolean; $variant: SelectVariant }>`
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme, $hasLeftIcon }) => {
    const leftPadding = $hasLeftIcon ? `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})` : theme.spaces.lg
    const rightPadding = `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})`
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
  text-align: left;
  outline: none;
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-visible,
  &[aria-expanded='true'] {
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

const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spaces.sm});
  z-index: 20;
  width: 100%;
  box-sizing: border-box;
  max-height: 16rem;
  margin: 0;
  padding: ${({ theme }) => `${theme.spaces.sm} 0`};
  overflow: auto;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_04};
`

const OptionItem = styled.li<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spaces.sm} ${theme.spaces.lg}`};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.surfaceAlt : 'transparent')};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    outline: none;
  }
`

const SelectedIcon = styled(CheckIcon)<{ $variant: SelectVariant }>`
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  color: ${({ theme, $variant }) => getVariantAppearance(theme, $variant).color};
  flex-shrink: 0;
`

const ErrorMessage = styled.p`
  margin: ${({ theme }) => `${theme.spaces.sm} 0 0`};
  color: ${({ theme }) => theme.actionColors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const Select: React.FC<SelectProps> = ({
  className,
  'aria-describedby': ariaDescribedBy,
  children,
  defaultValue,
  error,
  iconLeft,
  id,
  label,
  variant = 'primary',
  showSelectionCheck = false,
  onChange,
  value,
  ...props
}) => {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const errorId = `${selectId}-error`
  const describedBy = [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined
  const optionElements = useMemo(
    () =>
      React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<
        React.OptionHTMLAttributes<HTMLOptionElement>
      >[],
    [children],
  )
  const initialValue = String(value ?? defaultValue ?? optionElements[0]?.props.value ?? '')
  const [selectedValue, setSelectedValue] = useState(initialValue)
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = optionElements.find(option => String(option.props.value ?? '') === selectedValue)
  const selectValue = (value: string) => {
    setSelectedValue(value)
    setIsOpen(false)
    if (onChange) {
      onChange({ target: { value }, currentTarget: { value } } as React.ChangeEvent<HTMLSelectElement>)
    }
  }

  return (
    <Field className={className}>
      {label ? (
        <Label htmlFor={selectId}>
          {label}
          {props.required ? <RequiredIndicator aria-hidden='true'>*</RequiredIndicator> : null}
        </Label>
      ) : null}
      <SelectWrapper $variant={variant}>
        {iconLeft ? <Adornment aria-hidden='true'>{iconLeft}</Adornment> : null}
        <HiddenSelect
          {...props}
          id={selectId}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          value={selectedValue}
          onChange={event => selectValue(event.target.value)}
          tabIndex={-1}
        >
          {children}
        </HiddenSelect>
        <SelectTrigger
          type='button'
          aria-describedby={describedBy}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-invalid={error ? true : undefined}
          aria-labelledby={label ? undefined : selectId}
          disabled={props.disabled}
          $hasError={Boolean(error)}
          $hasLeftIcon={Boolean(iconLeft)}
          $variant={variant}
          onClick={() => setIsOpen(current => !current)}
        >
          {selectedOption?.props.children ?? props.placeholder ?? 'Select an option'}
        </SelectTrigger>
        {isOpen ? (
          <OptionsList role='listbox' aria-label={label ?? 'Options'}>
            {optionElements.map(option => {
              const value = String(option.props.value ?? '')
              const isSelected = value !== '' && value === selectedValue
              const showCheck = showSelectionCheck && isSelected
              return (
                <OptionItem
                  key={value}
                  $selected={isSelected}
                  role='option'
                  aria-selected={isSelected}
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => selectValue(value)}
                >
                  {option.props.children}
                  {showCheck ? <SelectedIcon $variant={variant} aria-hidden='true' /> : null}
                </OptionItem>
              )
            })}
          </OptionsList>
        ) : null}
      </SelectWrapper>
      {error ? (
        <ErrorMessage id={errorId} aria-live='polite' role='alert'>
          {error}
        </ErrorMessage>
      ) : null}
    </Field>
  )
}

export default Select
