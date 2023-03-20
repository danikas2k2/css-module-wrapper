it.skip('wrapped string class names', () => {
    /*expect(
        inlineCssModules
            .call(
                context,
                Buffer.from(`
import React from 'react';
import classNames from 'classnames';
import './Button.css';

export function Button = (
{
disabled,
...props
}) => (
<button
ref={useRef()}
className={'Button color-neutral variant-solid size-small spacing-default'}
disabled={disabled}
aria-disabled={disabled}
{...props}
/>
);`)
            )
            ?.toString()
    ).toBe(`
import React from 'react';
import classNames__bind from 'classnames/bind';
import __Button_css from './Button.css';

const classNames = classNames__bind.bind(__Button_css);

export function Button = (
{
disabled,
...props
}) => (
<button
ref={useRef()}
className={classNames('Button', 'color-neutral', 'variant-solid', 'size-small', 'spacing-default')}
disabled={disabled}
aria-disabled={disabled}
{...props}
/>
);`);*/
});
