<template>
  <div class="mt-2">
    <span class="text-lg font-normal"> {{ $t('last_view') }}:</span>

    <div class="mt-1 grid grid-cols-1 md:grid-cols-4">
      <template v-for="post in store.posts" :key="post.id">
        <the-article-small
          class="mr-3 mt-3"
          :author="post.author"
          :title="post.title"
          :body="post.body"
          :id="post.id"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useLastViewStore } from "../stores/last_view";
import TheArticleSmall from "./TheArticleSmall.vue";

const store = useLastViewStore();

onMounted(() => {
  store.getPostsCache();
});
</script>
