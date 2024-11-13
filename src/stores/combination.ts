import { ref } from 'vue';
import { defineStore } from 'pinia';

import { type CombinationGroup } from '@/services/interfaces';

export const useCombinationStore = defineStore('combination', () => {
  const currentCombination = ref<CombinationGroup|undefined>(undefined);

  return {
    currentCombination
  }
})


