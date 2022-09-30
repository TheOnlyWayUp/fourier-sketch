import { integrate, slope } from './util';
import assert from 'assert';

describe('slope', () => {
  it('works for line segments where the first point is origin', () => {
    assert.equal(slope([0, 0], [1, 3]), 3);
  });

  it('works on edge cases', () => {
    assert.equal(slope([1, 2], [1, 2]), Infinity);
    assert.equal(slope([1, 2], [2, 2]), 0);
  });
});

/**
 * @param func The function to integrate.
 * @param actualIntegral The actual value of the integral in the given interval.
 * @param interval The interval of integration.
 * @returns The error in integration.
 */
function integralError(
  func: (x: number) => number,
  actualIntegral: number,
  interval: [number, number] = [0, 1]
): number {
  const estimate = integrate(func, interval);
  const error = Math.abs(estimate - actualIntegral);
  return error;
}

describe('integrate', () => {
  it('can integrate (y = x ** 2) with a reasonable accuracy', () => {
    const error = Math.abs(integrate(x => x ** 2, [0, 5]) - 41.333);
    assert(error <= 0.5, 'Large error in integration');
  });

  it('can integrate curves with both negative and positive parts', () => {
    const f = (x: number) => 30 * Math.sin(x);
    const estimate = integrate(f, [0, 2 * Math.PI], 0.01);
    // error = | estimate - 0 | = | estimate |
    const error = Math.abs(estimate);
    assert(error <= 0.001, 'Large error in estimating sin');
  });

  it('can integrate 30sin(x) between 0 and PI', () => {
    const error = integralError(x => 30 * Math.sin(x), 60, [0, Math.PI]);
    assert(error <= 0.01, 'Large error in estimating 30sinx');
  });

  it('can integrate 4sin^2(x) between 0 and 2 * PI', () => {
    const f = (x: number) => 4 * Math.sin(x) ** 2;
    const interval: [number, number] = [0, 2 * Math.PI];
    const error = integralError(f, 4 * Math.PI, interval);
    assert(error <= 0.01, 'Large error in estimating 4sin^2(x)');
  });
});
