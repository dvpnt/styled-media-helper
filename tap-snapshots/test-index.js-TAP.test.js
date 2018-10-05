/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/index.js TAP Media class up > right breakpoint 1`] = `
[ '@media (min-width: ', '20', 'px) {', 'color: blue;', '}' ]
`

exports[`test/index.js TAP Media class down > right breakpoint 1`] = `
[ '@media (max-width: ', '99.98', 'px) {', 'color: blue;', '}' ]
`

exports[`test/index.js TAP Media class between > right breakpoints 1`] = `
[ '@media (min-width: ',
  '20',
  'px) and (max-width: ',
  '99.98',
  'px) {',
  'color: blue;',
  '}' ]
`

exports[`test/index.js TAP Media class only success > without next breakpoint 1`] = `
[ '@media (min-width: ', '100', 'px) {', 'color: blue;', '}' ]
`

exports[`test/index.js TAP Media class only success > with next breakpoint 1`] = `
[ '@media (min-width: ',
  '20',
  'px) and (max-width: ',
  '99.98',
  'px) {',
  'color: blue;',
  '}' ]
`
