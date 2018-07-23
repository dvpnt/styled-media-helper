exports.BreakpointNotFoundError = class BreakpointNotFoundError extends Error {
	constructor(breakpoint) {
		super(`Breakpoint '${breakpoint}' not found`);
	}
};

exports.NextBreakpointNotFoundError =
	class NextBreakpointNotFoundError extends Error {
		constructor(breakpoint) {
			super(`Next breakpoint for '${breakpoint}' not found`);
		}
	};
