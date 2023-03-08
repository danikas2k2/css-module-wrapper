# css-module-wrapper

Webpack loader to silently wrap CSS modules.

## Installation

```bash
npm install --save-dev css-module-wrapper
```

or

```bash
yarn add --dev css-module-wrapper
```

or

```bash
pnpm install --save-dev css-module-wrapper
```

## Usage

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.[jt]sx?$/,
        use: [
          'ts-loader',
          'css-module-wrapper'
        ],
      },
      {
        test: /\.mdx?$/,
        use: [
          '@mdx-js/loader',
          {
            loader: 'css-module-wrapper',
            options: {
              classNames: false,
            },
          },
        ],
      },
    ],
  },
};
```

```js
// App.js
import React from 'react';
import './App.css';

const App = () => {
  return <div className="App">Hello World</div>;
};
```

```css
/* App.css */
.App {
    color: red;
}
```

## Output

```html

<div class="App__App__2Q3ZU">Hello World</div>
```

## Options

### `classNames`

Type: `boolean` Default: `true`

Enable or disable classnames library integration. Enabled by default.
If disabled, the loader will only update `class`/`className` attributes.
This is useful if you want to use wrapper with non-js files, ie. `html` or `mdx`.
