import React from 'react';
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    /** Visible label associated with the select. */
    label?: string;
    /** Placeholder text shown when no option is selected. */
    placeholder?: string;
    /** Validation message displayed below the select. */
    error?: string;
    /** Custom React content rendered inside the left side of the trigger. */
    iconLeft?: React.ReactNode;
    /** Show a check icon beside the selected non-default option. */
    showSelectionCheck?: boolean;
}
declare const Select: React.FC<SelectProps>;
export default Select;
