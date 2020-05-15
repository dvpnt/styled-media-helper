import styled from 'styled-components';
import t from 'tap';
import Media from '../src';
import {
	BreakpointNotFoundError, NextBreakpointNotFoundError
} from '../src/errors';

t.test('Media class', (t) => {
	const sizes = {
		xs: 20,
		lg: 100
	};

	const media = Media(sizes);

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
			() => styled.div`${media.up('wrong')} {color: #000;}`,
			new BreakpointNotFoundError('wrong'),
			'wrong breakpoint'
		);

		t.matchSnapshot(
			styled.div`${media.up('xs')} {color: #000;}`,
			'right breakpoint'
		);

		t.end();
	});

	t.test('down', (t) => {
		t.throws(
			() => styled.div`${media.down('wrong')} {color: #000;}`,
			new BreakpointNotFoundError('wrong'),
			'wrong breakpoint'
		);

		t.throws(
			() => styled.div`${media.down('lg')} {color: #000;}`,
			new NextBreakpointNotFoundError('lg'),
			'has no next breakpoint'
		);

		t.matchSnapshot(
			styled.div`${media.down('xs')} {color: #000;}`,
			'right breakpoint'
		);

		t.end();
	});

	t.test('between', (t) => {
		t.throws(
			() => styled.div`${media.between('wrong min', 'lg')} {color: #000;}`,
			new BreakpointNotFoundError('wrong min'),
			'wrong min breakpoint'
		);

		t.throws(
			() => styled.div`${media.between('lg', 'wrong max')} {color: #000;}`,
			new BreakpointNotFoundError('wrong max'),
			'wrong max breakpoint'
		);

		t.matchSnapshot(
			styled.div`${media.between('xs', 'lg')} {color: #000;}`,
			'right breakpoints'
		);

		t.end();
	});

	t.test('only', (t) => {
		t.test('fail', (t) => {
			t.throws(
				() => styled.div`${media.only('wrong')} {color: #000;}`,
				new BreakpointNotFoundError('wrong'),
				'wrong breakpoint'
			);

			t.end();
		});

		t.test('success', (t) => {
			t.matchSnapshot(
				styled.div`${media.only('lg')} {color: #000;}`,
				'without next breakpoint'
			);

			t.matchSnapshot(
				styled.div`${media.only('xs')} {color: #000;}`,
				'with next breakpoint'
			);

			t.end();
		});

		t.end();
	});

	t.end();
});
