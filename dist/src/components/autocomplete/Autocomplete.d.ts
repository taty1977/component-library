import React from 'react';
export interface AutocompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSelect' | 'value'> {
    options: string[];
    onSelect: (option: string) => void;
    label?: string;
    error?: string;
    placeholder?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
}
declare const Autocomplete: React.FC<AutocompleteProps>;
export default Autocomplete;
