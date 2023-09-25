<template>
  <div class="text-center">
    <h2>Ajout ou Modification d'un poste</h2>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
      <form @submit.prevent="onclick ? updatePost() : addPost()">
        <v-text-field v-model="formData.title" label="Titre" ></v-text-field>
        <v-textarea v-model="formData.body" label="Contenu du post"></v-textarea>
        <v-btn type="submit" color="primary" @click="addPost" class="mr-4">Ajouter</v-btn>
        <v-btn type="button" color="secondary" @click="updatePost">Modifier</v-btn>
      </form>
      </v-col>
      </v-row>
      </v-container>
  </div>
</template>


<script>
import axios from 'axios';
import mitt from 'mitt';

const emitter = mitt();

export default {
    props: {
     id: {
      type: Number,
      required: true,
    },
    post: {
    type: Object,
  },
  },
  data() {
    return {
      formData: {
        title: '', // Title of post
        body: '', //  Body of post
      },
    };
  },
  watch: {
    post: {
      handler(newPost) {
        if (newPost) {
          // Maj form
          this.formData.title = newPost.title;
          this.formData.body = newPost.body;
        } else {
          // Reset form when post is empty
          this.clearForm();
        }
      },
      immediate: true, // Trigger initial update
    },
  },
  methods: {
    async addPost() {
      // Create a post object from the form data
      const post = {
        title: this.formData.title,
        body: this.formData.body,
      };
      // Use axios.post for add new post
      const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, post);
      // MAJ state share in use Vuex store with addPost
      this.$store.commit('addPost', response.data);
      // Reset form
      this.$router.push('/');
    },
    
    async updatePost() {
      const post = {
      title: this.formData.title,
      body: this.formData.body,
    };
      console.log(this.id)
      try {
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${this.id}`, post);

        // Use commit for call updatePost in vuex store 
        this.$store.dispatch('updatePost', { postId: this.id, updatedPost: post });

        // Evenement post maj
        emitter.emit('post-updated', post);

        // Reset form
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du post :', error);
      }
    },
    clearForm() {
      // Reset form
      this.formData.title = '';
      this.formData.body = '';
    },
  },
};
</script>
