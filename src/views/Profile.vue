<template>
  <div class="mt-2">
    <the-back />

    <ul class="mt-10 space-y-2" v-if="store.isLoading">
      <li class="text-xl">
        {{ $t('username') }}: <span class="text-red-400">{{ store.author.username }}</span>
      </li>
      <li class="text-xl">
        {{ $t('name') }}: <span class="text-red-400">{{ store.author.name }}</span>
      </li>
      <li class="text-xl">
        Email:
        <a
          target="_blank"
          :href="`mailto:${store.author.email}`"
          class="text-red-400 underline"
          >{{ store.author.email }}</a
        >
      </li>
      <li class="text-xl">
        {{ $t('website') }}:
        <a :href="'//' + store.author.website" target="_blank" class="text-red-400 underline">{{
          store.author.website
        }}</a>
      </li>
    </ul>
    <the-loading :count="1" v-else-if="!store.error" />
    <the-error class="mt-4" v-if="store.error" :error="store.error" />
  </div>
</template>

<script setup lang="ts">
import TheBack from "../components/TheBack.vue";
import { onMounted } from "vue";
import { useAuthorStore } from "../stores/author";
import { useRoute } from "vue-router";
import TheError from "../components/TheError.vue";
import TheLoading from "../components/TheLoading.vue";

const route = useRoute();
const store = useAuthorStore();

onMounted(() => {
  const id = parseInt(route.params.author.toString());

  store.getAuthor(id);
});
</script>
