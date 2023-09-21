<template>
  <the-last-view />

  <div class="mt-10">
    <the-back />

    <div class="mt-3 space-y-6" v-if="posts.isLoading">
      <template v-for="post in posts.posts" :key="post.id">
        <the-article
          :author="post.author"
          :title="post.title"
          :body="post.body"
          :id="post.id"
          :visible="post?.isVisible"
        />
      </template>

      <template v-if="posts.isLoadingMore">
        <the-loading class="mb-10" :count="3" />
      </template>
    </div>
    <the-loading :count="10" v-else-if="!posts.error" />
    <the-error class="mt-4" v-if="posts.error" :error="posts.error" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import TheArticle from "../components/TheArticle.vue";
import { usePostsStore } from "../stores/posts";
import TheBack from "../components/TheBack.vue";
import TheLoading from "../components/TheLoading.vue";
import TheLastView from "../components/TheLastView.vue";
import TheError from "../components/TheError.vue";

const posts = usePostsStore();
const bottom = ref(true);
const page = ref(1);

const visible = () => {
  bottom.value = bottomVisible();
};

onMounted(() => {
  posts.getPosts({ isNew: false, page: page.value });
  window.scrollTo(0, 0);

  window.addEventListener("scroll", visible);
});

onUnmounted(() => {
  window.removeEventListener("scroll", visible);
});

watch(
  () => bottom.value,
  (bottom) => {
    if (bottom) {
      page.value += 1;
      posts.getPosts({ isNew: true, page: page.value });
    }
  }
);

const bottomVisible = () => {
  const scrollY = window.scrollY;
  const visible = document.documentElement.clientHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const bottomOfPage = visible + scrollY >= pageHeight;
  return bottomOfPage || pageHeight < visible;
};
</script>
