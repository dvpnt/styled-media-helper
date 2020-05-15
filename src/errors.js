export const BreakpointNotFoundError = class BreakpointNotFoundError extends Error {
	constructor(breakpoint) {
		super(`Breakpoint '${breakpoint}' not found`);
	}
};

export const NextBreakpointNotFoundError =
	class NextBreakpointNotFoundError extends Error {
		constructor(breakpoint) {
			super(`Next breakpoint for '${breakpoint}' not found`);
		}
	};
