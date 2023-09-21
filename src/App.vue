<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import TheTableInfo from "./components/TheTableInfo.vue";
import {onMounted} from 'vue'
import { hasPassedThreeDays } from "./utils/cache_time";

onMounted(() => {
  hasPassedThreeDays()
})
</script>

<template>
  <div class="container mx-auto px-4">
    <the-header />
  </div>
  <the-table-info />
  <div class="container mx-auto px-4">
    <router-view></router-view>
  </div>
</template>