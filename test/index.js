const assert = require('assert');
const {
	BreakpointNotFoundError, NextBreakpointNotFoundError
} = require('../src/errors');
const Media = require('../src');

describe('Media class', function() {
	const sizes = {
		xs: 20,
		lg: 100
	};

	const media = new Media(sizes);

	describe('isBreakpoint', function() {
		describe('with wrong breakpoint', function() {
			it('check result', function() {
				assert.strictEqual(media._isBreakpoint('wrong'), false);
			});
		});

		describe('success', function() {
			it('check result', function() {
				assert.strictEqual(media._isBreakpoint('xs'), true);
			});
		});
	});

	describe('next', function() {
		describe('no next breakpoint', function() {
			it('check result', function() {
				assert.strictEqual(media._next('lg'), undefined);
			});
		});

		describe('success', function() {
			it('check result', function() {
				assert.strictEqual(media._next('xs'), 'lg');
			});
		});
	});

	describe('up', function() {
		describe('with wrong breakpoint', function() {
			it('check error', function() {
				assert.throws(function() {
					media.up('wrong')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('success', function() {
			it('check result', function() {
				assert.deepStrictEqual(media.up('xs')`color: blue;`, [
					'\n\t\t\t\t@media (min-width: ',
					'20',
					'px) {\n\t\t\t\t\t',
					'color: blue;',
					'\n\t\t\t\t}\n\t\t\t'
				]);
			});
		});
	});

	describe('down', function() {
		describe('with wrong breakpoint', function() {
			it('check error', function() {
				assert.throws(function() {
					media.down('wrong')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('with no next breakpoint', function() {
			it('check error', function() {
				assert.throws(function() {
					media.down('lg')`color: blue;`;
				}, NextBreakpointNotFoundError);
			});
		});

		describe('success', function() {
			it('check result', function() {
				assert.deepStrictEqual(media.down('xs')`color: blue;`, [
					'\n\t\t\t\t@media (max-width: ',
					'99.98',
					'px) {\n\t\t\t\t\t',
					'color: blue;',
					'\n\t\t\t\t}\n\t\t\t'
				]);
			});
		});
	});

	describe('between', function() {
		describe('with wrong min breakpoint', function() {
			it('check error', function() {
				assert.throws(function() {
					media.between('wrong', 'lg')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('with wrong max breakpoint', function() {
			it('check error', function() {
				assert.throws(function() {
					media.between('xs', 'wrong')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('success', function() {
			it('check result', function() {
				assert.deepStrictEqual(media.between('xs', 'lg')`color: blue;`, [
					'\n\t\t\t\t@media (\n\t\t\t\t\tmin-width: ',
					'20',
					'px\n\t\t\t\t) and (\n\t\t\t\t\tmax-width: ',
					'99.98',
					"px\n\t\t\t\t) {\n\t\t\t\t\t",
					'color: blue;',
					'\n\t\t\t\t}\n\t\t\t'
				]);
			});
		});
	});

	describe('only', function() {
		describe('with wrong breakpoint', function() {
			it('check error', function() {
				assert.throws(function() {
					media.only('wrong')`color: blue;`;
				}, BreakpointNotFoundError);
			});
		});

		describe('success', function() {
			describe('without next breakpoint', function() {
				it('check result', function() {
					assert.deepStrictEqual(media.only('lg')`color: blue;`, [
						'\n\t\t\t\t@media (min-width: ',
						'100',
						"px) {\n\t\t\t\t\t",
						'color: blue;',
						'\n\t\t\t\t}\n\t\t\t'
					]);
				});
			});

			describe('with next breakpoint', function() {
				it('check result', function() {
					assert.deepStrictEqual(media.only('xs')`color: blue;`, [
						'\n\t\t\t\t@media (\n\t\t\t\t\tmin-width: ',
						'20',
						'px\n\t\t\t\t) and (\n\t\t\t\t\tmax-width: ',
						'99.98',
						"px\n\t\t\t\t) {\n\t\t\t\t\t",
						'color: blue;',
						'\n\t\t\t\t}\n\t\t\t'
					]);
				});
			});
		});
	});
});
