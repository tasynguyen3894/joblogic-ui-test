<script lang="ts" setup>

import { type Color } from '@/services/interfaces';
import ColorOption from './ColorOption.vue';

const props = withDefaults(defineProps<{
  colors?: Color[],
}>(), {
  colors: () => []
});

const emits = defineEmits<{
  (e: 'select', value: Color): void
}>();

function handleSelect(color: Color) {
  emits('select', {
    ...color,
  });
}


</script>
<template>
  <div class="color-input-container">
    <ColorOption @select="handleSelect" :color="item" :key="item.slug" v-for="item of props.colors" />
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


