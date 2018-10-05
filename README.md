# 💅 styled-media-helper
[![Build Status](https://travis-ci.org/dvpnt/styled-media-helper.svg?branch=master)](https://travis-ci.org/dvpnt/styled-media-helper)
[![Coverage Status](https://coveralls.io/repos/github/dvpnt/styled-media-helper/badge.svg?branch=master)](https://coveralls.io/github/dvpnt/styled-media-helper?branch=master)

This module makes easy to write media queries using
[styled-components](https://www.styled-components.com/).

## Installation

    $ npm install styled-media-helper

## Usage

```js
const Media = require('styled-media-helper');
const styled = require('styled-components').default;

const sizes: {
	sm: 320,
	md: 768,
	lg: 1240
};

const media = new Media(sizes);

styled.div`
	height: 30px;

	${media.up('lg')`
		height: 50px;
	`}
`;
```

## Methods

This library contains follow methods:
* [up](#up)
* [down](#down)
* [between](#between)
* [only](#only)

Each of these methods is an alias for defined media query:

Method | Arguments | Output
------ | --------- | ------
`up` | point: string | `@media (min-width: <point>px)`
`down` | point: string | `@media (max-width: <next point>px)`
`between` | point1: string, point2: string | `@media (min-width: <point1>px) and (max-width: <poin2>px)`
`only` | point: string | `@media (min-width: <point>px) and (max-width: <next point>px)` or `@media (min-width: <point>px)` (for maximum breakpoint)

### up

```js
media.up('sm')`
	color: black;
`
```

### down

```js
media.down('sm')`
	color: black;
`
```

### between

```js
media.between('sm', 'lg')`
	color: black;
`
```

### only

```js
media.only('sm')`
	color: black;
`
```

## License

[The MIT License (MIT)](/LICENSE)
