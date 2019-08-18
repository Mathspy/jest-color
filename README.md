<div align="center">
  <h1>jest-color</h1>

🃏🎨

A bundle of Jest matchers for testing and asserting colors

</div>

<hr />

[![Build Status](https://dev.azure.com/mathspy257/jest-color/_apis/build/status/Mathspy.jest-color?branchName=master)](https://dev.azure.com/mathspy257/jest-color/_build/latest?definitionId=1&branchName=master)
[![version](https://img.shields.io/npm/v/jest-color.svg?style=flat-square)](https://www.npmjs.com/package/jest-color)
[![downloads](https://img.shields.io/npm/dm/jest-color.svg?style=flat-square)](http://npm-stat.com/charts.html?package=jest-color&from=2019-08-17)
[![MIT License](https://img.shields.io/npm/l/jest-color.svg?style=flat-square)](https://github.com/mathspy/jest-color/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Problem

Testing colors with Jest is not simple. It should be as easy as `.toBeColor`

## Solution

jest-color aims to add additional matchers to Jest's default ones that does just that

## Contributing

If you've come here to help contribute - Sweet! Thanks! Take a look at the [contributing](/CONTRIBUTING.md) and read the [Code of Conduct](/CODE_OF_CONDUCT.md) docs as a way of getting started!

---

- [Problem](#problem)
- [Solution](#solution)
- [Contributing](#contributing)
- [Installation](#installation)
- [Setup](#setup)
- [Asymmetric matchers](#asymmetric-matchers)
- [API](#api)
  - [.toBeColor(color)](#tobecolorcolor)
  - [expect.color(color)](#expectcolorcolor)
  - [.toBeIndistinguishableFrom(color)](#tobeindistinguishablefromcolor)
  - [expect.indistinguishableFrom(color)](#expectindistinguishablefromcolor)
- [LICENSE](#license)

## Installation

With npm:

```sh
npm install -D jest-color
```

With yarn:

```sh
yarn add -D jest-color
```

## Setup

### Jest >v24

Add `jest-color` to your Jest `setupFilesAfterEnv` configuration. [See for help](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array)

```json
"jest": {
  "setupFilesAfterEnv": ["jest-color"]
}
```

## Asymmetric matchers

All matchers described below have asymmetric variants. Example:

```js
test("symmetric vs asymmetric", () => {
  expect("#7db2ceff").toBeColor(125, 178, 206);
  expect("#7db2ceff").toEqual(expect.color(125, 178, 206));
});
```

## API

#### .toBeColor(object)

Accepts anything that [`color`](https://www.npmjs.com/package/color) accepts and compares them to one another. It must be the exact same color.

```js
expect("#7db2ceff").toBeColor(125, 178, 206); // true
expect("#72510e").toBeColor(114, 81, 14, 1); // true
expect([157, 204, 97]).toBeColor("#9dcc61"); // true
expect("hwb(60, 3%, 60%)").toBeColor("rgb(102, 102, 8)"); // true
expect("#cccc0866").toBeColor("hwb(60, 3%, 20%, 0.4)"); // true
expect("hsla(114, 60%, 39%, 0.32)").toBeColor([52, 159, 40, 0.32]); // true

expect("#7db2caaa").not.toBeColor(125, 178, 202); // true
```

#### expect.color(color)

The asymmetric variant of `.toBeColor`.

```js
expect("#7db2ceff").toEqual(expect.color(125, 178, 206)); // true
expect("#72510e").toEqual(expect.color(114, 81, 14, 1)); // true
expect([157, 204, 97]).toEqual(expect.color("#9dcc61")); // true
expect("hwb(60, 3%, 60%)").toEqual(expect.color("rgb(102, 102, 8)")); // true
expect("#cccc0866").toEqual(expect.color("hwb(60, 3%, 20%, 0.4)")); // true
expect("hsla(114, 60%, 39%, 0.32)").toEqual(expect.color([52, 159, 40, 0.32])); // true

expect("#7db2caaa").toEqual(expect.not.color(125, 178, 202)); // true
```

#### .toBeIndistinguishableFrom(color)

Also accepts anything that [`color`](https://www.npmjs.com/package/color) accepts. It compares them using ~~THE POWER OF SCIENCE~~ [CIEDE2000](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000) and if the [Delta E is less than 1](http://zschuessler.github.io/DeltaE/learn/#toc-delta-e-2000) it returns true.

```js
```

#### expect.indistinguishableFrom(color)

The asymmetric variant of `.toBeIndistinguishableFrom`.

```js
expect([50, 158, 38]).toEqual(expect.indistinguishableFrom(49, 155, 37)); // true
expect([217, 223, 214]).toEqual(
  expect.indistinguishableFrom("rgb(216, 222, 215)"),
); // true
expect("hwb(110, 84%, 13%)").toEqual(
  expect.indistinguishableFrom("hwb(111, 84%, 13%)"),
); // true
```

## LICENSE

[MIT](/LICENSE)
