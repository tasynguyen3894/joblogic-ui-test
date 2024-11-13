<script lang="ts" setup>
import { getColorContrast } from '@/utils/helper';

const props = defineProps<{
  color: string,
  text: string
}>()
</script>
<template>
  <div class="combination-container">
    <div class="combination-container__top" :style="{
      background: props.color,
      color: getColorContrast(props.color)
    }">
      <h1 class="top_title">
        {{ props.text }}
      </h1>
      <div class="top__foreground">
        <img src="/assets/foreground.png" alt="">
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.combination-container {
  &__top {
    // line-height: 0px;
  }
}

.top__foreground {
  img {
    width: 100%;
  }
}

.top_title {
  text-align: center;
  padding: 50px 0px;
}

.content {
  width: 800px;
  margin: 0px auto;
  position: relative;
  top: -400px;
}
</style>
