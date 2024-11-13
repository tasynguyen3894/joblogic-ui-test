import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ColorOption from '../ColorOption.vue';

describe('Test ColorOption', () => {
  it('Should render right name, hex and color', () => {
    const colorTestProvider = {
      hex: '#FCFCFC',
      slug: 'test-slug',
      name: 'test-name'
    }

    const wrapper = mount(ColorOption, {
      props: {
        color: colorTestProvider
      }
    });

    expect(wrapper.find('[data-test="name"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="hex"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="color-block"]').exists()).toBeTruthy();

    expect(wrapper.find('[data-test="name"]').text()).toBe(colorTestProvider.name);
    expect(wrapper.find('[data-test="hex"]').text()).toBe(colorTestProvider.hex);
    expect((wrapper.find('[data-test="color-block"]').element as HTMLElement).style.background).toBe('rgb(252, 252, 252)')
  })
})
