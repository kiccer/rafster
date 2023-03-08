# Rafster

Rafster 是一个简单、快速且易于使用的库，用于将多个三方库的 `requestAnimationFrame` 方法合并为一个，以提高性能。

## 安装

```bash
npm install rafster --save
# or
yarn add rafster
```

## 使用

```js
// 在 requestAnimationFrame 被调用前引入
import 'rafster'
// 使用了 requestAnimationFrame 的库
import someLib from 'some-lib'
```
