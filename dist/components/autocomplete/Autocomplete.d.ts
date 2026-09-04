import React from 'react';
export interface AutocompleteProps {
    options: string[];
    onSelect: (option: string) => void;
    placeholder?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}
declare const Autocomplete: React.FC<AutocompleteProps>;
export default Autocomplete;
