import React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    'aria-describedby'?: string;
    value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    outsideIconLeft?: React.ReactNode;
    outsideIconRight?: React.ReactNode;
    handleActions?: () => void;
}
declare const Input: React.FC<InputProps>;
export default Input;
