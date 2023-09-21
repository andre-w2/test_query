<template>
  <the-popover class="bg-red-500 p-1 text-white rounded-md">
    <template #title>
      <div class="flex items-center" v-if="t.locale.value === 'RU'">
        <span class="text-xs ml-2 text-white">RU</span>
      </div>
      <div class="flex items-center" v-if="t.locale.value === 'KZ'">
        <span class="text-xs ml-2 text-white">KZ</span>
      </div>
      <div class="flex items-center" v-if="t.locale.value === 'EN'">
        <span class="text-xs ml-2 text-white">EN</span>
      </div>
    </template>
    <template #content>
      <ul class="py-2 space-y-2 ml-1 pr-8 text-center">
        <li
          class="flex items-center cursor-pointer"
          @click="changeLanguage('RU')"
        >
          <span class="text-md text-black">RU</span>
        </li>

        <li
          class="flex items-center cursor-pointer"
          @click="changeLanguage('KZ')"
        >
          <span class="text-md text-black">KZ</span>
        </li>
        <li
          class="flex items-center cursor-pointer"
          @click="changeLanguage('EN')"
        >
          <span class="text-md text-black">EN</span>
        </li>
      </ul>
    </template>
  </the-popover>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ThePopover from "./ThePopover.vue";

const t = useI18n();

const changeLanguage = (lng) => {
  t.locale.value = lng.toLocaleUpperCase();
};
</script>
