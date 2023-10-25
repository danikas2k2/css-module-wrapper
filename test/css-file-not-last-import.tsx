import classNames from 'classnames';
import './Button.css';
import './ButtonGroup.css';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'neutral' | 'primary' | 'secondary';
    variant?: 'solid' | 'outline';
    size?: 'small' | 'medium' | 'large';
    spacing?: 'default' | 'compact';
}

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
            className={classNames(
                'Button',
                `color-${color}`,
                `variant-${variant}`,
                `size-${size}`,
                `spacing-${spacing}`
            )}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        />
    );
}
