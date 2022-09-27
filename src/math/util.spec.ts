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

describe('integrate', () => {
  it('can integrate (y = x ** 2) with a reasonable accuracy', () => {
    const pts = [];
    for (let i = 0; i <= 5; ++i) {
      pts.push(i * i);
    }

    assert(integrate(pts) - 41.333 <= 4, '');
  });
});
