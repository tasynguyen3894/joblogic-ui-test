<script lang="ts" setup>
import { ref, watch } from 'vue';

import { type Color } from '@/services/interfaces';
import { copyToClipboard } from '@/utils/helper';

const props = withDefaults(defineProps<{
  colors?: Color[],
}>(), {
  colors: () => []
});

const emits = defineEmits<{
  (e: 'select', value: Color): void
  (e: 'changeCustomColor', color: Color, value: string): void
}>();

const customColors = ref<{
  [key: string]: string
}>({});

function handleSelect(color: Color) {
  emits('select', {
    ...color,
    hex: customColors.value[color.slug] || color.hex
  });
  copyToClipboard(customColors.value[color.slug] || color.hex);
}

function handleChangeColor(event: Event, color: Color) {
  if(event.target instanceof HTMLInputElement) {
    customColors.value[color.slug] = event.target.value;
  }
}

</script>
<template>
  <div class="color-input-container">
    <div class="color-input-option" v-for="item of props.colors">
      <div  @click="handleSelect(item)" :style="{
        'background-color': customColors[item.slug] || item.hex
      }" class="color-input-option__color">
        <span>Copy</span>
      </div>
      <div class="color-input-option__infomation">
        <span class="color-input-option__name">{{ item.name }}</span>
        <span class="color-input-option__hex"><label :for="'color-picker-' + item.slug">{{ item.hex }}</label></span>
        <input @input="e => handleChangeColor(e, item)" :id="'color-picker-' + item.slug" type="color" style="visibility: hidden">
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.color-input-container {
  display: flex;
}

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


