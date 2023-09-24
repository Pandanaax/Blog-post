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
      // Mettez à jour la liste des posts dans le store Vuex lorsque le post est mis à jour
      const store = useStore();
      store.commit('updatePost', {
        postId: updatedPost.id,
        updatedPost: updatedPost,
      });
    },
    handlePostDeleted(postId) {
      // Supprimez le post de la liste des posts dans le store Vuex lorsque le post est supprimé
      const store = useStore();
      store.commit('deletePost', postId);
    },
    handlePostAdded(newPost) {
      // Ajoutez le nouveau post à la liste des posts dans le store Vuex lorsque le post est ajouté
      const store = useStore();
      store.commit('addPost', newPost);
    },
  },
  created() {
    // Chargez les posts depuis le serveur ou le cache ici
    const store = useStore();
    store.dispatch('fetchPosts');
  },
};
</script>
