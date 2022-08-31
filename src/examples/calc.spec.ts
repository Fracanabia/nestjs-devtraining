export function add(x: number, y: number): number {
  return x + y;
}

describe('Initial test', () => {
  it('Add function', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
