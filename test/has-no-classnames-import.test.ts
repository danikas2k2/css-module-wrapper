import path from 'path';
import { compile } from './utils/compile';
import { DIR, ufs } from './utils/ufs';

const entry = path.resolve(DIR, 'test.tsx');

it('has no classnames import', async () => {
    ufs.writeFileSync(
        entry,
        `
import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({
    disabled,
    ...props
}: ButtonProps): JSX.Element {
    return (
        <button
            className="Button color-neutral variant-solid size-small spacing-default"
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        />
    );
}`
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
const Button_css_1 = __importDefault(require("./Button.css"));
const bind_1 = __importDefault(require("classnames/bind"));
const __classNames = bind_1.default.bind(Button_css_1.default);
function Button({ disabled, ...props }) {
    return ((0, jsx_runtime_1.jsx)("button", { className: __classNames('Button', 'color-neutral', 'variant-solid', 'size-small', 'spacing-default'), disabled: disabled, "aria-disabled": disabled, ...props }));
}
exports.Button = Button;
`
    );
});
