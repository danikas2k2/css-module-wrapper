import path from 'path';
import { compile } from './utils/compile';
import { DIR, ufs } from './utils/ufs';

const entry = path.resolve(DIR, 'test.tsx');

it('one css file is imported', async () => {
    ufs.writeFileSync(
        entry,
        `
import React from 'react';
import classNames from 'classnames';
import './Button.css';

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
const bind_1 = __importDefault(require("classnames/bind"));
const Button_css_1 = __importDefault(require("./Button.css"));
const classNames = bind_1.default.bind(Button_css_1.default);
function Button({ color = 'neutral', variant = 'solid', size = 'small', spacing = 'default', disabled, ...props }) {
    return ((0, jsx_runtime_1.jsx)("button", { className: classNames('Button', \`color-\${color}\`, \`variant-\${variant}\`, \`size-\${size}\`, \`spacing-\${spacing}\`), disabled: disabled, "aria-disabled": disabled, ...props }));
}
exports.Button = Button;
`
    );
});
