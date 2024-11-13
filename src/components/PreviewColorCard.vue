<script lang="ts" setup>
import type { Color } from '@/services/interfaces';

import { useCombinationStore } from '@/stores/combination';
import ColorList from './Inputs/ColorList.vue';
import PreviewImage from './Inputs/PreviewImage.vue';
import { storeToRefs } from 'pinia';

const combinationStore = useCombinationStore();

const { currentCombination } = storeToRefs(combinationStore);

function selectColor(color: Color) {
  if(currentCombination.value) {
    currentCombination.value.combination.color = color;
  }
}

function clickLike() {
  if(currentCombination.value) {
    currentCombination.value.combination.liked = !currentCombination.value.combination.liked;
  }
}
</script>
<template>
  <div v-if="currentCombination">
    <PreviewImage 
      :url="currentCombination.combination.featuredImage.url"
      :alt="currentCombination.combination.featuredImage.alt"
      :likes="currentCombination.combination.likes"
      :liked="currentCombination.combination.liked"

      @click-like="clickLike()"
    />
    <div>
      <ColorList :colors="currentCombination.combination.colors" @select="selectColor" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.image-zone {
  img {
    width: 100%;
  }
}

</style>
