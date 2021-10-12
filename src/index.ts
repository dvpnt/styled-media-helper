export interface SizesProps {
  [key: string]: number;
}

export class Media {
  sizes: SizesProps;

  constructor(sizes: SizesProps) {
    this.sizes = sizes;
  }

  _isBreakpoint(breakpoint: string) {
    return Boolean(this.sizes[breakpoint]);
  }

  _next(breakpoint: string) {
    const keys = Object.keys(this.sizes);
    const index = keys.indexOf(breakpoint);

    return keys[index + 1];
  }

  up(breakpoint: string) {
    if (!this._isBreakpoint(breakpoint)) {
      throw new Error(`Breakpoint ${breakpoint} not found`);
    }

    return `@media (min-width: ${this.sizes[breakpoint]}px)`;
  }

  // The max-width value is calculated as the next breakpoint less 0.02px.
  // See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
  // Uses 0.02px rather than 0.01px to work around a current rounding bug
  // in Safari. See https://bugs.webkit.org/show_bug.cgi?id=178261
  down(breakpoint: string) {
    if (!this._isBreakpoint(breakpoint)) {
      throw new Error(`Breakpoint ${breakpoint} not found`);
    }

    const nextBreakpoint = this._next(breakpoint);

    if (!this._isBreakpoint(nextBreakpoint)) {
      throw new Error(`Next Breakpoint ${breakpoint} not found`);
    }

    return `@media (max-width: ${this.sizes[nextBreakpoint] - 0.02}px)`;
  }

  between(min: string, max: string) {
    if (!this._isBreakpoint(min)) {
      throw new Error(`Breakpoint ${min} not found`);
    }

    if (!this._isBreakpoint(max)) {
      throw new Error(`Breakpoint ${max} not found`);
    }

    return `@media (min-width: ${this.sizes[min]}px) and
			(max-width: ${this.sizes[max] - 0.02}px)`;
  }

  only(breakpoint: string) {
    const nextBreakpoint = this._next(breakpoint);

    return this._isBreakpoint(nextBreakpoint)
      ? this.between(breakpoint, nextBreakpoint)
      : this.up(breakpoint);
  }
}

export default (sizes: SizesProps) => new Media(sizes);
