const t = require('tap');
const Media = require('../src');
const {
	BreakpointNotFoundError, NextBreakpointNotFoundError
} = require('../src/errors');

t.test('Media class', (t) => {
	const sizes = {
		xs: 20,
		lg: 100
	};

	const media = Media(sizes);

	function clean(string) {
		return string.replace(/[\n\t]/g, '');
	}

	t.test('_isBreakpoint', (t) => {
		t.notOk(media._isBreakpoint('wrong'), 'wrong breakpoint');
		t.ok(media._isBreakpoint('xs'), 'right breakpoint');
		t.end();
	});

	t.test('_next', (t) => {
		t.notOk(media._next('lg'), 'has no next breakpoint');
		t.is(media._next('xs'), 'lg', 'has next breakpoint');
		t.end();
	});

	t.test('up', (t) => {
		t.throws(
			() => media.up('wrong'),
			new BreakpointNotFoundError('wrong'),
			'wrong breakpoint'
		);

		t.matchSnapshot(clean(media.up('xs')), 'right breakpoint');

		t.end();
	});

	t.test('down', (t) => {
		t.throws(
			() => media.down('wrong'),
			new BreakpointNotFoundError('wrong'),
			'wrong breakpoint'
		);

		t.throws(
			() => media.down('lg'),
			new NextBreakpointNotFoundError('lg'),
			'has no next breakpoint'
		);

		t.matchSnapshot(clean(media.down('xs')), 'right breakpoint');

		t.end();
	});

	t.test('between', (t) => {
		t.throws(
			() => media.between('wrong min', 'lg'),
			new BreakpointNotFoundError('wrong min'),
			'wrong min breakpoint'
		);

		t.throws(
			() => media.between('lg', 'wrong max'),
			new BreakpointNotFoundError('wrong max'),
			'wrong max breakpoint'
		);

		t.matchSnapshot(
			clean(media.between('xs', 'lg')),
			'right breakpoints'
		);

		t.end();
	});

	t.test('only', (t) => {
		t.test('fail', (t) => {
			t.throws(
				() => media.only('wrong'),
				new BreakpointNotFoundError('wrong'),
				'wrong breakpoint'
			);

			t.end();
		});

		t.test('success', (t) => {
			t.matchSnapshot(
				clean(media.only('lg')),
				'without next breakpoint'
			);

			t.matchSnapshot(
				clean(media.only('xs')),
				'with next breakpoint'
			);

			t.end();
		});

		t.end();
	});

	t.end();
});
