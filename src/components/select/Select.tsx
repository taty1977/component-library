import React, { useId, useMemo, useState } from 'react'
import styled from 'styled-components'
import { CheckIcon } from '@heroicons/react/24/solid'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Visible label associated with the select. */
  label?: string
  /** Placeholder text shown when no option is selected. */
  placeholder?: string
  /** Validation message displayed below the select. */
  error?: string
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
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const RequiredIndicator = styled.span`
  margin-left: ${({ theme }) => theme.spaces.xs};
  color: ${({ theme }) => theme.colors.danger};
`

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    position: absolute;
    top: 50%;
    right: ${({ theme }) => theme.spaces.md};
    width: ${({ theme }) => theme.sizes.sz_050};
    height: ${({ theme }) => theme.sizes.sz_050};
    border-right: 2px solid ${({ theme }) => theme.colors.icon};
    border-bottom: 2px solid ${({ theme }) => theme.colors.icon};
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
  color: ${({ theme }) => theme.colors.icon};
  pointer-events: none;
  transform: translateY(-50%);

  & > svg {
    width: 100%;
    height: 100%;
  }
`

const StyledSelect = styled.select<{ $hasLeftIcon: boolean; $hasRightIcon: boolean; $hasError: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme, $hasLeftIcon, $hasRightIcon }) => {
    const leftPadding = $hasLeftIcon ? `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})` : theme.spaces.lg
    const rightPadding = $hasRightIcon
      ? `calc(${theme.spaces.xl} + ${theme.sizes.sz_100})`
      : `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})`
    return `${theme.spaces.md} ${rightPadding} ${theme.spaces.md} ${leftPadding}`
  }};
  appearance: none;
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
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.boxShadow.bs_02};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.activeBorder};
    box-shadow: ${({ theme }) => theme.boxShadow.bs_04};
    background-color: ${({ theme }) => theme.colors.surface};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const SelectTrigger = styled.button<{ $hasLeftIcon: boolean; $hasError: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme, $hasLeftIcon }) => {
    const leftPadding = $hasLeftIcon ? `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})` : theme.spaces.lg
    const rightPadding = `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})`
    return `${theme.spaces.md} ${rightPadding} ${theme.spaces.md} ${leftPadding}`
  }};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.heading};
  font: inherit;
  line-height: 1.4;
  text-align: left;
  outline: none;
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.boxShadow.bs_02};
  }

  &:focus-visible,
  &[aria-expanded='true'] {
    border-color: ${({ theme }) => theme.colors.activeBorder};
    box-shadow: ${({ theme }) => theme.boxShadow.bs_04};
    background-color: ${({ theme }) => theme.colors.surface};
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
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.surfaceAlt : 'transparent')};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    outline: none;
  }
`

const SelectedIcon = styled(CheckIcon)`
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`

const ErrorMessage = styled.p`
  margin: ${({ theme }) => `${theme.spaces.sm} 0 0`};
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const Select: React.FC<SelectProps> = ({
  'aria-describedby': ariaDescribedBy,
  children,
  defaultValue,
  error,
  iconLeft,
  id,
  label,
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
    <Field>
      {label ? (
        <Label htmlFor={selectId}>
          {label}
          {props.required ? <RequiredIndicator aria-hidden='true'>*</RequiredIndicator> : null}
        </Label>
      ) : null}
      <SelectWrapper>
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
                  {showCheck ? <SelectedIcon aria-hidden='true' /> : null}
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
