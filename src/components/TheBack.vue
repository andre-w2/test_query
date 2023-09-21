<template>
  <button
    @click="goBack"
    class="font-medium mt-4 text-xl text-red-400 underline"
  >
    &lt; {{ $t("back") }}
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => router.go(-1);
</script>
