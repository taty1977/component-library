import React, { useState } from 'react';
import styled from 'styled-components';
import { XMarkIcon } from '@heroicons/react/24/solid';

const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 24rem;
  font-family: ${({ theme }) => theme.fontFamily};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputLeftIcon = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spaces.md};
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.icon};
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  pointer-events: none;
`;

const InputRightIcon = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spaces.md};
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.icon};
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  pointer-events: none;
`;

const ClearButton = styled.button`
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
  border-radius: 999px;
  background: transparent;
  color: ${({ theme }) => theme.colors.icon};
  cursor: pointer;
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

const Input = styled.input<{ $hasLeftIcon?: boolean; $hasRightIcon?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme, $hasLeftIcon, $hasRightIcon }) => {
    const leftPadding = $hasLeftIcon
      ? `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})`
      : theme.spaces.lg;
    const rightPadding = $hasRightIcon
      ? `calc(${theme.spaces.lg} + ${theme.sizes.sz_100})`
      : theme.spaces.lg;
    return `${theme.spaces.md} ${rightPadding} ${theme.spaces.md} ${leftPadding}`;
  }};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.heading};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  line-height: 1.4;
  outline: none;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

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
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
  z-index: 20;
  overflow: hidden;
`;

const OptionItem = styled.li`
  padding: ${({ theme }) => `${theme.spaces.sm} ${theme.spaces.lg}`};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.heading};
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
`;

interface AutocompleteProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options, onSelect, placeholder, iconLeft, iconRight }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.trim().length === 0) {
      setFilteredOptions([]);
      return;
    }
    setFilteredOptions(options.filter(option => option.toLowerCase().includes(value.toLowerCase())));
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setFilteredOptions([]);
    onSelect(option);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (inputValue.trim().length === 0) {
      setFilteredOptions([]);
      return;
    }
    setFilteredOptions(options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase())));
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => setFilteredOptions([]), 100);
  };

  const handleClear = () => {
    setInputValue('');
    setFilteredOptions([]);
  };

  const showClear = isFocused && inputValue.trim().length > 0;
  const hasRightAdornment = showClear || !!iconRight;

  return (
    <AutocompleteContainer>
      <InputWrapper>
        {iconLeft && (
          <InputLeftIcon>
            {iconLeft}
          </InputLeftIcon>
        )}
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          $hasLeftIcon={!!iconLeft}
          $hasRightIcon={hasRightAdornment}
        />
        {showClear ? (
          <ClearButton
            type="button"
            aria-label="Clear input"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
          >
            <XMarkIcon width="1em" height="1em" aria-hidden="true" />
          </ClearButton>
        ) : iconRight ? (
          <InputRightIcon>
            {iconRight}
          </InputRightIcon>
        ) : null}
      </InputWrapper>
      {filteredOptions.length > 0 && (
        <OptionsList>
          {filteredOptions.map(option => (
            <OptionItem key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </AutocompleteContainer>
  );
};

export default Autocomplete;
