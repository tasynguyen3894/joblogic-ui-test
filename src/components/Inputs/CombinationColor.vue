<script lang="ts" setup>
const props = defineProps<{
  colors: string[]
}>();
</script>
<template>
  <div class="combination-input">
    <div v-for="color in props.colors" :key="color" :style="{ backgroundColor: color }">
      
    </div>
  </div>
</template>
<style lang="scss" scoped>
.combination-input {
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  div {
    flex: 1;
    height: 90px;
  }
}
</style>

