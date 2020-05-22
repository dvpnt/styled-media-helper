/* eslint-disable max-classes-per-file */

export class BreakpointNotFoundError extends Error {
	constructor(breakpoint) {
		super(`Breakpoint '${breakpoint}' not found`);
	}
}

export class NextBreakpointNotFoundError extends Error {
	constructor(breakpoint) {
		super(`Next breakpoint for '${breakpoint}' not found`);
	}
}
