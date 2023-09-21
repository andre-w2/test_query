<template>
  <the-last-view />
  <div class="mt-10">
    <h1 class="font-medium mt-4 text-3xl">
      {{ $t("articles") }}
    </h1>

    <div class="mt-3 space-y-6" v-if="posts.isLoading">
      <template v-for="post in posts.posts.slice(0, 3)" :key="post.id">
        <the-article
          :visible="post?.isVisible"
          :author="post.author"
          :title="post.title"
          :body="post.body"
          :id="post.id"
        />
      </template>
    </div>
    <the-loading :count="10" v-else-if="!posts.error" />
    <the-error class="mt-4" v-if="posts.error" :error="posts.error" />
    <div class="flex items-center justify-center">
      <router-link
        :to="{ name: 'articles' }"
        class="rounded-lg bg-red-600 p-2 text-center text-white w-64 mb-3 mt-6"
        >{{ $t("more") }}</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TheArticle from "../components/TheArticle.vue";
import { usePostsStore } from "../stores/posts";
import TheLoading from "../components/TheLoading.vue";
import TheLastView from "../components/TheLastView.vue";
import TheError from "../components/TheError.vue";

const posts = usePostsStore();

onMounted(() => {
  posts.getPosts({isNew: false, page: 1});
});
</script>
