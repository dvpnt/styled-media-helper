const assert = require('assert');
const {
	BreakpointNotFoundError, NextBreakpointNotFoundError
} = require('../src/errors');
const Media = require('../src');

describe('Media class', () => {
	const sizes = {
		xs: 20,
		lg: 100
	};

	const media = new Media(sizes);

	describe('isBreakpoint', () => {
		describe('with wrong breakpoint', () => {
			it('check result', () => {
				assert.strictEqual(media._isBreakpoint('wrong'), false);
			});
		});

		describe('success', () => {
			it('check result', () => {
				assert.strictEqual(media._isBreakpoint('xs'), true);
			});
		});
	});

	describe('next', () => {
		describe('no next breakpoint', () => {
			it('check result', () => {
				assert.strictEqual(media._next('lg'), undefined);
			});
		});

		describe('success', () => {
			it('check result', () => {
				assert.strictEqual(media._next('xs'), 'lg');
			});
		});
	});

	describe('up', () => {
		describe('with wrong breakpoint', () => {
			it('check error', () => {
				assert.throws(() => {
					media.up('wrong')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('success', () => {
			it('check result', () => {
				assert.deepStrictEqual(media.up('xs')`color: blue;`, [
					'@media (min-width:',
					'20',
					'px){',
					'color: blue;',
					'}'
				]);
			});
		});
	});

	describe('down', () => {
		describe('with wrong breakpoint', () => {
			it('check error', () => {
				assert.throws(() => {
					media.down('wrong')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('with no next breakpoint', () => {
			it('check error', () => {
				assert.throws(() => {
					media.down('lg')`color: blue;`;
				}, NextBreakpointNotFoundError);
			});
		});

		describe('success', () => {
			it('check result', () => {
				assert.deepStrictEqual(media.down('xs')`color: blue;`, [
					'@media (max-width:',
					'99.98',
					'px){',
					'color: blue;',
					'}'
				]);
			});
		});
	});

	describe('between', () => {
		describe('with wrong min breakpoint', () => {
			it('check error', () => {
				assert.throws(() => {
					media.between('wrong', 'lg')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('with wrong max breakpoint', () => {
			it('check error', () => {
				assert.throws(() => {
					media.between('xs', 'wrong')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('success', () => {
			it('check result', () => {
				assert.deepStrictEqual(media.between('xs', 'lg')`color: blue;`, [
					'@media ( min-width:',
					'20',
					'px ) and ( max-width:',
					'99.98',
					'px ){',
					'color: blue;',
					'}'
				]);
			});
		});
	});

	describe('only', () => {
		describe('with wrong breakpoint', () => {
			it('check error', () => {
				assert.throws(() => {
					media.only('wrong')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('success', () => {
			describe('without next breakpoint', () => {
				it('check result', () => {
					assert.deepStrictEqual(media.only('lg')`color: blue;`, [
						'@media (min-width:',
						'100',
						'px){',
						'color: blue;',
						'}'
					]);
				});
			});

			describe('with next breakpoint', () => {
				it('check result', () => {
					assert.deepStrictEqual(media.only('xs')`color: blue;`, [
						'@media ( min-width:',
						'20',
						'px ) and ( max-width:',
						'99.98',
						'px ){',
						'color: blue;',
						'}'
					]);
				});
			});
		});
	});
});
