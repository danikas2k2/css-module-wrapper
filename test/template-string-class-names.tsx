import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({
    color = 'neutral',
    variant = 'solid',
    size = 'small',
    spacing = 'default',
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`Button color-${color} variant-${variant} size-${size} spacing-${spacing}`}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        />
    );
}
