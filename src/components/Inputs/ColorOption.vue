<script lang="ts" setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCheck } from '@mdi/js';

import { type Color } from '@/services/interfaces';
import { copyToClipboard } from '@/utils/helper';

const props = defineProps<{
  color: Color,
}>();

const emits = defineEmits<{
  (e: 'select', value: Color): void
}>();

const customColor = ref<string>();
  const isShowingCheck = ref<boolean>(false);

function handleSelect(color: Color) {
  emits('select', {
    ...color,
    hex: customColor.value || color.hex
  });
  copyToClipboard(customColor.value || color.hex).then(() => {
    isShowingCheck.value = true;
    setTimeout(() => {
      isShowingCheck.value = false;
    }, 1000);
  })
}

function handleChangeColor(event: Event, color: Color) {
  if(event.target instanceof HTMLInputElement) {
    customColor.value = event.target.value;
  }
}
</script>

<template>
  <div class="color-input-option">
    <div data-test="color-block"  @click="handleSelect(props.color)" :style="{
      'background-color': customColor || props.color.hex
    }" class="color-input-option__color">
      <span v-if="!isShowingCheck">Copy</span>
      <SvgIcon v-else type="mdi" color="#FFF" :path="mdiCheck" />

    </div>
    <div class="color-input-option__infomation">
      <span class="color-input-option__name" data-test="name">{{ props.color.name }}</span>
      <span class="color-input-option__hex" data-test="hex"><label :for="'color-picker-' + props.color.slug">{{ props.color.hex }}</label></span>
      <input @input="e => handleChangeColor(e, props.color)" :id="'color-picker-' + props.color.slug" type="color" style="visibility: hidden">
    </div>
  </div>
</template>
<style lang="scss" scoped>
.color-input-option {
  cursor: pointer;
  flex: 1;

  &:first-child {
    .color-input-option__color {
      border-radius: 0px 0px 0px 10px;
    }
  }

  &:last-child {
    .color-input-option__color {
      border-radius: 0px 0px 10px 0px;
    }
  }

  &__color {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      visibility: hidden;
      color: #FFF;
    }
    &:hover {
      span {
        visibility: visible;
      }
    }
  }

  &__name {
    display: block;
    text-align: center;
  }

  &__hex {
    display: block;
    text-align: center;
  }
}
</style>

