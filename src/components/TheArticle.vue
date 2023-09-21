<template>
  <div class="rounded-lg border-gray-400 border-[1px] px-4">
    <router-link
      class="flex flex-col"
      :to="{ name: 'details', params: { id } }"
    >
      <div class="flex items-center justify-between">
        <span class="text-red-600 text-2xl mt-3 line-clamp-1">{{ title }}</span>
        <span v-if="visible" class="text-gray-400">{{ $t("view") }}</span>
      </div>

      <span class="line-clamp-3">
        {{ body }}
      </span>

      <div class="flex items-center justify-between mb-2 mt-3">
        <router-link
          :to="{ name: 'profile', params: { author: author.id } }"
          class="text-gray-400"
          >{{ $t("author") }}:
          <span class="underline text-red-400">{{
            author.name
          }}</span></router-link
        >
        <span class="underline hidden md:block text-red-400 ml-1"
          >{{ $t("more") }}...</span
        >
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
  visible: {
    required: false,
    default: () => false,
  },
});
</script>
