const t = require('tap');
const Media = require('../dist');
const {
	BreakpointNotFoundError, NextBreakpointNotFoundError
} = require('../dist/errors');

t.test('Media class', (t) => {
	const sizes = {
		xs: 20,
		lg: 100
	};

	const media = new Media(sizes);

	t.test('isBreakpoint', (t) => {
		t.is(media._isBreakpoint('wrong'), false, 'wrong breakpoint');
		t.is(media._isBreakpoint('xs'), true, 'right breakpoint');
		t.end();
	});

	t.test('next', (t) => {
		t.is(media._next('lg'), undefined, 'has no next breakpoint');
		t.is(media._next('xs'), 'lg', 'has next breakpoint');
		t.end();
	});

	t.test('up', (t) => {
		t.throws(
			media.up('wrong'),
			new BreakpointNotFoundError('wrong'),
			'wrong breakpoint'
		);
		t.same(
			media.up('xs')`color: blue;`,
			['@media (min-width:', '20', 'px){', 'color: blue;', '}'],
			'right breakpoint'
		);
		t.end();
	});

	t.test('down', (t) => {
		t.throws(
			media.down('wrong'),
			new BreakpointNotFoundError('wrong'),
			'wrong breakpoint'
		);
		t.throws(
			media.down('lg'),
			new NextBreakpointNotFoundError('lg'),
			'has no next breakpoint'
		);
		t.same(
			media.down('xs')`color: blue;`,
			['@media (max-width:', '99.98', 'px){', 'color: blue;', '}'],
			'right breakpoint'
		);
		t.end();
	});

	t.test('between', (t) => {
		t.throws(
			media.between('wrong min', 'lg'),
			new BreakpointNotFoundError('wrong min'),
			'wrong min breakpoint'
		);
		t.throws(
			media.between('lg', 'wrong max'),
			new BreakpointNotFoundError('wrong max'),
			'wrong max breakpoint'
		);
		t.same(
			media.between('xs', 'lg')`color: blue;`,
			[
				'@media ( min-width:', '20', 'px ) and ( max-width:', '99.98', 'px ){',
				'color: blue;', '}'
			],
			'right breakpoints'
		);
		t.end();
	});

	t.test('only', (t) => {
		t.throws(
			() => media.only('wrong'),
			new BreakpointNotFoundError('wrong'),
			'wrong breakpoint'
		);
		t.test('success', (t) => {
			t.same(
				media.only('lg')`color: blue;`,
				['@media (min-width:', '100', 'px){', 'color: blue;', '}'],
				'without next breakpoint'
			);

			t.same(
				media.only('xs')`color: blue;`,
				['@media ( min-width:', '20', 'px ) and ( max-width:', '99.98', 'px ){',
					'color: blue;', '}'
				],
				'with next breakpoint'
			);
			t.end();
		});
		t.end();
	});
	t.end();
});
