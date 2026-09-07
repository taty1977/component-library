import React from 'react';
import type { ControlSize, ControlWidth } from '../../styles/control';
export type ButtonSize = ControlSize;
export type ButtonVariant = 'primary' | 'secondary';
export type ButtonWidth = ControlWidth;
export type ButtonShape = 'rectangle' | 'pill';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    size?: ButtonSize;
    width?: ButtonWidth;
    variant?: ButtonVariant;
    outline?: boolean;
    shape?: ButtonShape;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
