<template>
  <div>
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="onclick ? updatePost() : addPost()">
      <v-text-field v-model="formData.title" label="Titre"></v-text-field>
      <v-textarea v-model="formData.body" label="Contenu du post"></v-textarea>
      <v-btn type="submit" color="primary" @click="addPost">Ajouter</v-btn>
      <v-btn type="button" color="primary" @click="updatePost">Modifier</v-btn>
    </form>
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
        title: '', // Titre du post
        body: '', // Contenu du post
      },
    };
  },
  watch: {
    post: {
      handler(newPost) {
        if (newPost) {
          // Mettre à jour les données du formulaire lorsque le post change (pour la modification)
          this.formData.title = newPost.title;
          this.formData.body = newPost.body;
        } else {
          // Réinitialiser le formulaire lorsque le post est vide (nouvel ajout)
          this.clearForm();
        }
      },
      immediate: true, // Déclencher la mise à jour initiale
    },
  },
  methods: {
    async addPost() {
      // Créez un objet post à partir des données du formulaire
      const post = {
        title: this.formData.title,
        body: this.formData.body,
      };
      // Utilisez axios.post pour ajouter un nouveau post
      const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, post);
      // Mettez à jour l'état partagé en utilisant le store Vuex en appelant la mutation 'addPost'
      this.$store.commit('addPost', response.data);
      // Réinitialisez le formulaire
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

        // Utilisez commit pour appeler la mutation "updatePost" dans le store Vuex
        this.$store.dispatch('updatePost', { postId: this.id, updatedPost: post });

        // Émettez un événement personnalisé pour indiquer que le post a été mis à jour
        emitter.emit('post-updated', post);

        // Réinitialisez le formulaire
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du post :', error);
      }
    },
    clearForm() {
      // Réinitialisez le formulaire
      this.formData.title = '';
      this.formData.body = '';
    },
  },
};
</script>
