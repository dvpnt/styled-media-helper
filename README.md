# :nail_care: styled-media-helper
[![Build Status](https://travis-ci.org/dvpnt/styled-media-helper.svg?branch=master)](https://travis-ci.org/dvpnt/styled-media-helper)
[![Coverage Status](https://coveralls.io/repos/github/dvpnt/styled-media-helper/badge.svg?branch=master)](https://coveralls.io/github/dvpnt/styled-media-helper?branch=master)
[![NPM Version](https://img.shields.io/npm/v/styled-media-helper.svg)](https://www.npmjs.com/package/styled-media-helper)

This module makes easy to write media queries using [styled-components](https://www.styled-components.com/).

Inspired by [Bootstrap](https://getbootstrap.com/) `media-breakpoint-...` mixins.

## Installation

    $ npm install styled-media-helper

## Usage

```js
const styled = require('styled-components').default;
const mediaHelper = require('styled-media-helper');

const media = mediaHelper({
  sm: 320,
  md: 768,
  lg: 1240
});

module.exports = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;

  ${media.up('lg')} {
    width: 150px;
  }

  // Output:
  //   @media (min-width: 1240px) {
  //     width: 150px;
  //   }


  ${media.down('sm')} {
    background-color: black;
  }

  // Output:
  //   @media (max-width: 767.98px) {
  //     background-color: black;
  //   }


  ${media.between('sm', 'lg')} {
    width: 200px;
  }

  // Output:
  //   @media (min-width: 320px) and (max-width: 1239.98px) {
  //     width: 200px;
  //   }


  ${media.only('md')} {
    background-color: green;
  }

  // Output:
  //   @media (min-width: 768px) and (max-width: 1239.98px) {
  //     background-color: green;
  //   }


  ${media.only('sm')} {
    background-color: green;
  }

  // Output:
  //   @media (min-width: 320px) and (max-width: 767.98px) {
  //     background-color: green;
  //   }


  ${media.only('lg')} {
    border-radius: 15px;
  }

  // Output:
  //   @media (min-width: 1240px) {
  //     border-radius: 15px;
  //   }
`;
```

## License

[The MIT License (MIT)](/LICENSE)
