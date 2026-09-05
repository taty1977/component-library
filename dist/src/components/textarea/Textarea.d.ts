import React from 'react';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Visible label associated with the textarea. */
    label?: string;
    /** Number of visible text rows. */
    rows?: number;
    /** Additional element IDs announced with the field. */
    'aria-describedby'?: string;
    /** Controlled textarea value. Use with onChange. */
    value?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['value'];
    /** Called when the textarea value changes. */
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    /** Validation message displayed below the textarea. */
    error?: string;
}
declare const Textarea: React.FC<TextareaProps>;
export default Textarea;
