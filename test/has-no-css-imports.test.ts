import path from 'path';
import { compile } from './utils/compile';
import { DIR, ufs } from './utils/ufs';

const entry = path.resolve(DIR, 'test.tsx');

it('has no css imports', async () => {
    ufs.writeFileSync(
        entry,
        `
import React from 'react';
import classNames from 'classnames';

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
}: ButtonProps): JSX.Element {
    return (
        <button
            className={classNames(
                'Button',
                \`color-\${color}\`,
                \`variant-\${variant}\`,
                \`size-\${size}\`,
                \`spacing-\${spacing}\`
            )}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        />
    );
}
`
    );

    const [output] = await compile({ entry });

    expect(output).toMatch(
        `"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
function Button({ color = 'neutral', variant = 'solid', size = 'small', spacing = 'default', disabled, ...props }) {
    return ((0, jsx_runtime_1.jsx)("button", { className: (0, classnames_1.default)('Button', \`color-\${color}\`, \`variant-\${variant}\`, \`size-\${size}\`, \`spacing-\${spacing}\`), disabled: disabled, "aria-disabled": disabled, ...props }));
}
exports.Button = Button;
`
    );
});
