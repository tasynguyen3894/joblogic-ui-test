<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import { useCombinationStore } from '@/stores/combination';
import CombinationColor from './Inputs/CombinationColor.vue';
import { getColorSerivce } from '@/services/service';
import type { CombinationGroup } from '@/services/interfaces';

const colorService = getColorSerivce();
const combinationStore = useCombinationStore();

const { currentCombination } = storeToRefs(combinationStore);

const extraCombinations = ref<CombinationGroup[]>([]);
const canLoadMore = ref<boolean>(true);
const currentPage = ref<number>(1);

const extraCombinationFormatted = computed<{ id: number, colors: string[] }[]>(() => {
  return extraCombinations.value.map(item => {
    return {
      id: item.combination.id,
      colors: item.combination.colors.map(color => color.hex)
    }
  })
})

function handleChangeCombination(id: number) {
  colorService.getCombinationById(id).then(combination => {
    currentCombination.value = combination
  })
}

function loadMore() {
  colorService.getCombinations({
    page: currentPage.value
  }).then(res => {
    extraCombinations.value = extraCombinations.value.concat(res.data);
    if(res.pagination.page >= res.pagination.totalPage) {
      canLoadMore.value = false;
    } else {
      currentPage.value += 1;
    }
  })
}
</script>
<template>
  <div>
    <h3 class="title">Related Combinations</h3>
    <div v-if="currentCombination" class="items">
      <CombinationColor
        v-for="combination in currentCombination.relatedCombinations"
        :key="combination.id"
        :colors="combination.colors"
        @click="handleChangeCombination(combination.id)"
      />
      <CombinationColor
        v-for="combination in extraCombinationFormatted"
        :key="combination.id"
        :colors="combination.colors"
        @click="handleChangeCombination(combination.id)"
      />
      <div v-if="canLoadMore" class="load-more" @click="loadMore()">
        See more combinations
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 30px;
  margin: 20px 0px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    width: calc(50% - 20px);
    margin-bottom: 20px;
  }

  .load-more {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F2F3F5;
    min-height: 90px;
    border-radius: 10px;
  }
}
</style>
