<script lang="ts" setup>
const props = defineProps<{
  text: string
}>();
</script>
<template>
  <div class="menu">
    <div>Colors</div>
    <div>Color Palettes</div>
    <div>{{ props.text }}</div>
  </div>
</template>
<style lang="scss" scoped>
.menu {
  display: flex;
  justify-content: center;
  align-items: center;

  > div::after {
    content: '';
    display: inline-block;
    height: 10px;
    width: 10px;
    border: 2px solid #333;
    border-top: none;
    border-left: none;
    margin: 0px 10px;
    transform: rotate(-45deg);
  }

  > div:last-child {
    &::after {
      display: none;
    }
  }
}
</style>
