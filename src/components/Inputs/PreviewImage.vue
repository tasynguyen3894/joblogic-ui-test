<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHeartOutline, mdiCardsHeart } from '@mdi/js';

const props = withDefaults(defineProps<{
  likes?: number,
  liked?: boolean,
  url: string;
  alt?: string;
}>(), {
  alt: ''
});

const emits = defineEmits<{
  (e: 'clickLike'): void
}>();
</script>
<template>
  <div class="image-zone">
    <button type="button" @click="emits('clickLike')"><SvgIcon type="mdi" :path="props.liked ? mdiCardsHeart : mdiHeartOutline" /> {{ props.likes || 0 }}</button>
    <img :src="'./Thumbnail/' + props.url" :alt="props.alt">
  </div>
</template>
<style lang="scss" scoped>
.image-zone {
  position: relative;
  line-height: 0px;
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;

  img {
    width: 100%;
  }

  button {
    position: absolute;
    right: 10px;
    top: 10px;
    background: #FDFCFD;
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    align-items: center;
    display: inline-flex;
  }
}

</style>
