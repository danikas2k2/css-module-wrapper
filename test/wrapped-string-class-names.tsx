import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ disabled, ...props }: ButtonProps) {
    return (
        <button
            className={'Button color-neutral variant-solid size-small spacing-default'}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        />
    );
}
