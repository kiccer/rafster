# Rafster

Rafster is a simple, fast, and easy-to-use library for combining the `requestAnimationFrame` method of multiple third-party libraries into one to improve performance.

## Installation

```bash
npm install rafster --save
# or
yarn add rafster
```

## Usage

```js
// Import before requestAnimationFrame is called
import 'rafster'
// Import library that uses requestAnimationFrame
import someLib from 'some-lib'
```