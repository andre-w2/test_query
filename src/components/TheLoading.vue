<template>
  <div
    v-for="i in count"
    :key="i"
    class="rounded-lg border-gray-400 border-[1px] px-4 h-[173px] mt-3 animate-pulse bg-gray-200"
  ></div>
</template>

<script lang="ts" setup>
defineProps({
    count: Number,
    class: String
})
</script>