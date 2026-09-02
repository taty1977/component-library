import React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}
declare const Input: React.FC<InputProps>;
export default Input;
