<template>
  <header class="flex justify-between items-center mt-3">
    <router-link :to="{name: 'home'}">
      <img src="../assets/logo.svg" alt="Логотип сайта" />
    </router-link>
    <the-language-switch />
  </header>
</template>

<script lang="ts" setup>
import TheLanguageSwitch from "./TheLanguageSwitch.vue";
</script>
