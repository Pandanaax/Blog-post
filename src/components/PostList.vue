<template>
  <div>
    <h1 class="pa-2 d-flex justify-center">Blog Posts</h1>
    <v-container>
      <v-row>
        <v-col v-for="post in posts" :key="post.id" cols="12" sm="6" md="4">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover/>
          <v-card>
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-text>{{ post.body }}</v-card-text>
            <v-card-actions>
              <v-btn @click="editPost(post.id)" label="Edit" color="primary">Modifier/Ajouter</v-btn>
              <v-btn @click="deletePost(post.id)" label="Delete" color="#E91E63">Supprimer</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex'; // Import useStore for access in store Vuex

export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  methods: {
    editPost(postId) {
      this.$router.push({ name: 'post-edit', params: { id: postId } });
    },
    async deletePost(postId) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        // Use  store Vuex for delete post
        const store = useStore();
        store.commit('deletePost', postId);
      } catch (error) {
        console.error('Erreur lors de la suppression du post :', error);
      }
    },
  },
};
</script>
