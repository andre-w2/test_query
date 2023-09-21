<template>
  <ul class="mt-4 space-y-6">
    <li
      class="border-gray-500 border-2 p-2 w-full"
      v-for="comment in comments"
      :key="comment.id"
    >
      <p>{{ $t("name") }}: {{ comment.name }}</p>
      <p class="mb-4">Email: {{ comment.email }}</p>
      {{ comment.body }}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps({
    comments: {
        required: true,
        type: Object,
        default: () => {},
        validator: (e) => {
          return typeof e === 'object'
        }
    }
})
</script>