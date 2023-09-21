<template>
  <div class="bg-secondary w-full h-36 mt-3 flex items-center">
    <template v-if="isRouter">
      <template v-if="currentRouteName === 'details'">
        <span class="hidden md:block mx-auto text-red-600 text-2xl container">
          > {{ $t("articles") }} > {{ $t(currentRouteName ?? "") }}
        </span>
      </template>
      <template v-else-if="currentRouteName">
        <span class="hidden md:block mx-auto text-red-600 text-2xl container">
          > {{ $t(currentRouteName) }}
        </span>
      </template>
    </template>
  </div>
  <template v-if="isRouter">
      <template v-if="currentRouteName === 'details'">
        <span class="block md:hidden mx-auto text-2xl container">
          > {{ $t("articles") }} > {{ $t(currentRouteName ?? "") }}
        </span>
      </template>
      <template v-else-if="currentRouteName">
        <span class="block md:hidden mx-auto text-2xl container">
          > {{ $t(currentRouteName) }}
        </span>
      </template>
    </template>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const currentRouteName = computed(() => route.name);
const isRouter = computed(() => route.name !== 'home' && route.name !== 'profile')
</script>
