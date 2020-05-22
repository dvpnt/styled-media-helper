import {BreakpointNotFoundError, NextBreakpointNotFoundError} from './errors';

class Media {
	constructor(sizes) {
		this.sizes = sizes;
	}

	_isBreakpoint(breakpoint) {
		return Boolean(this.sizes[breakpoint]);
	}

	_next(breakpoint) {
		const keys = Object.keys(this.sizes);
		const index = keys.indexOf(breakpoint);

		return keys[index + 1];
	}

	up(breakpoint) {
		if (!this._isBreakpoint(breakpoint)) {
			throw new BreakpointNotFoundError(breakpoint);
		}

		return `@media (min-width: ${this.sizes[breakpoint]}px)`;
	}

	// The max-width value is calculated as the next breakpoint less 0.02px.
	// See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
	// Uses 0.02px rather than 0.01px to work around a current rounding bug
	// in Safari. See https://bugs.webkit.org/show_bug.cgi?id=178261
	down(breakpoint) {
		if (!this._isBreakpoint(breakpoint)) {
			throw new BreakpointNotFoundError(breakpoint);
		}

		const nextBreakpoint = this._next(breakpoint);

		if (!this._isBreakpoint(nextBreakpoint)) {
			throw new NextBreakpointNotFoundError(breakpoint);
		}

		return `@media (max-width: ${this.sizes[nextBreakpoint] - 0.02}px)`;
	}

	between(min, max) {
		if (!this._isBreakpoint(min)) {
			throw new BreakpointNotFoundError(min);
		}

		if (!this._isBreakpoint(max)) {
			throw new BreakpointNotFoundError(max);
		}

		return `@media (min-width: ${this.sizes[min]}px) and
			(max-width: ${this.sizes[max] - 0.02}px)`;
	}

	only(breakpoint) {
		const nextBreakpoint = this._next(breakpoint);

		return this._isBreakpoint(nextBreakpoint) ?
			this.between(breakpoint, nextBreakpoint) :
			this.up(breakpoint);
	}
}

export default (sizes) => new Media(sizes);
