import { describe, it, expect, vi, beforeAll } from 'vitest';

import { mount } from '@vue/test-utils';
import ColorOption from '../ColorOption.vue';

const writeTextMock = vi.fn();

Object.assign(navigator, {
  clipboard: {
    writeText: writeTextMock
  },
});


describe('Test ColorOption', () => {
  beforeAll(() => {
    navigator.clipboard.writeText.mockResolvedValue(undefined)
  })

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

  it('Should emit color select', async () => {
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

    const colorBlock = wrapper.find('[data-test="color-block"]');

    await colorBlock.trigger('click');

    expect(wrapper.emitted('select')[0][0]).toEqual({
      hex: '#FCFCFC',
      slug: 'test-slug',
      name: 'test-name'
    });

    expect(writeTextMock).toHaveBeenCalled();
    expect(writeTextMock).toBeCalledWith(colorTestProvider.hex);
  })
})
