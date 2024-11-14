import { describe, it, expect } from 'vitest';

import { getColorContrast } from '../helper';

describe('Test getColorContrast', () => {
  it('should render right contrast color', () => {
    expect(getColorContrast('#f4b9b8')).toBe('#000');
    expect(getColorContrast('#887bb0')).toBe('#FFF');
  })
});
