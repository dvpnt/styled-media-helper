# 💅 styled-media-helper

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

Method | Output
------ | ------
`up(breakpoint)` | `@media (min-width: <breakpoint>px)`
`down(breakpoint)` | `@media (max-width: <next breakpoint>px)`
`between(breakpoint1, breakpoint2)` | `@media (min-width: <breakpoint1>px) and (max-width: <breakpoint2>px)`
`only(breakpoint)` | `@media (min-width: <breakpoint>px) and (max-width: <next breakpoint>px)` or `@media (min-width: <breakpoint>px)` (for maximum breakpoint)

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
