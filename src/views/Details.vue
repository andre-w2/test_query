<template>
  <div class="mt-2">
    <the-back />

    <div class="mt-6 mb-3" v-if="store.isLoading">
      <h1 class="text-3xl font-medium text-red-500">
        {{ store.post.title }}
      </h1>

      <p class="mt-6 text-lg">
        {{ store.post.body }}
      </p>

      <router-link
        :to="{ name: 'profile', params: { author: store.post.author?.id ?? 0 } }"
        class="text-end block text-lg mt-10"
      >
        <span class="text-gray-400">{{ $t("author") }}</span
        >:
        <span class="ml-2 underline text-red-500">{{
          store.post.author?.name
        }}</span>
      </router-link>

      <h2 class="text-2xl font-medium text-red-500">{{ $t('comments') }} ({{ store.post.comments?.length ?? 0 }})</h2>

      <the-commnets :comments="store.post.comments" />
    </div>
    <the-loading :count="1" v-else-if="!store.error" />
    <the-error class="mt-4" v-if="store.error" :error="store.error" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePostsStore } from "../stores/posts";
import TheBack from "../components/TheBack.vue";
import TheCommnets from "../components/TheCommnets.vue";
import TheLoading from "../components/TheLoading.vue";
import TheError from "../components/TheError.vue";

const route = useRoute();
const store = usePostsStore();

onMounted(() => {
  const id = parseInt(route.params.id.toString());
  store.getPost(id);
  store.setVisible(id);
  window.scrollTo(0, 0);
});
</script>
