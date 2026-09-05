import React from 'react';
import type { ControlSize, ControlWidth } from '../../styles/control';
export type ButtonSize = ControlSize;
export type ButtonVariant = 'primary' | 'secondary';
export type ButtonWidth = ControlWidth;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    size?: ButtonSize;
    width?: ButtonWidth;
    variant?: ButtonVariant;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
