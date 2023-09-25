<template>
  <v-app>
    <v-main>
      <router-view @post-updated="handlePostUpdated" @post-deleted="handlePostDeleted" @post-added="handlePostAdded" />
    </v-main>
  </v-app>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'App',
  methods: {
    handlePostUpdated(updatedPost) {
      // MAJ list of post in vuex store when post is maj
      const store = useStore();
      store.commit('updatePost', {
        postId: updatedPost.id,
        updatedPost: updatedPost,
      });
    },
    handlePostDeleted(postId) {
      // delete post in list of post in vuex store when post is delete
      const store = useStore();
      store.commit('deletePost', postId);
    },
    handlePostAdded(newPost) {
      // Add new post in list of post in vuex store when is add
      const store = useStore();
      store.commit('addPost', newPost);
    },
  },
  created() {
    // Charge post since serveur
    const store = useStore();
    store.dispatch('fetchPosts');
  },
};
</script>
