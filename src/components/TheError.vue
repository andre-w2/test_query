<template>
  <div
    class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
    role="alert"
  >
    <p class="font-bold">{{ $t('error') }}</p>
    <p>{{error}}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
    error: {
        type: String,
        required: true
    },
    class: String
})
</script>