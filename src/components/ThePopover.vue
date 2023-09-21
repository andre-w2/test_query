<template>
  <div class="relative md:mr-3">
    <div class="flex items-center" @click="toggleMenu">
      <slot name="title"></slot>

      <template v-if="!hidden">
        <svg
          v-show="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="ml-5 md:ml-0 w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
        <svg
          v-show="isOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="ml-5 md:ml-0 w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </template>
    </div>
    <div
      @click="toggleMenu"
      v-show="isOpen"
      ref="menu"
      class="absolute z-10 bg-white shadow-lg rounded-lg border-red-500 mt-1"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
  hidden: {
    default: false,
    required: false,
    type: Boolean,
  },
});

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: any) => {
  if (isOpen.value && !event.target.closest(".relative")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
