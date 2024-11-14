import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import CombinationColor from '../CombinationColor.vue';


describe('Test CombinationColor', () => {
  it('should render right color', () => {
    const colors = ['rgb(255, 255, 255)', 'rgb(241, 241, 241)', 'rgb(0, 0, 0)']
    const wrapper = mount(CombinationColor, {
      props: {
        colors: colors
      }
    })

    const colorBlocks = wrapper.findAll('[data-test="color-block"]');
  
    expect(colorBlocks.length).toBe(3);
    for(let i = 0; i < colors.length; i++) {
      expect((colorBlocks[i].element as HTMLElement).style.backgroundColor).toBe(colors[i]);
    }
  });
})

