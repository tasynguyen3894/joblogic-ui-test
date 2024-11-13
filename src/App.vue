<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { getColorSerivce } from './services/service';
import PreviewColorCard from '@/components/PreviewColorCard.vue';
import CombinationContainer from '@/components/CombinationContainer.vue';
import type { CombinationGroup } from './services/interfaces';
import { useCombinationStore } from '@/stores/combination';
import RelatedCombainations from '@/components/RelatedCombainations.vue';
import Footer from '@/components/Inputs/Footer.vue';


const combinationStore = useCombinationStore();

const { currentCombination } = storeToRefs(combinationStore);

const colorService = getColorSerivce();
const combinations = ref<CombinationGroup[]>([]);

onMounted(() => {
  colorService.getCombinations().then(data => {
    combinations.value = data.data;
    if(data.data.length > 0) {
      currentCombination.value = data.data[0];
    }
  })
})
</script>

<template>
  <div v-if="currentCombination">
    <CombinationContainer
      :color="currentCombination.combination.color.hex"
      :text="currentCombination.combination.name"
    >
      <PreviewColorCard />
      <RelatedCombainations/>
      <Footer />
    </CombinationContainer>
  </div>
</template>
