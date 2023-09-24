import { createStore } from 'vuex';
import axios from 'axios';

const state = {
  posts: [], // Initial state is an empty array
};

const mutations = {
  setPosts(state, posts) {
    state.posts = posts; // Set the posts state with the provided data
  },
  addPost(state, newPost) {
    state.posts.push(newPost); // Add the new post to the list
  },
  updatePost(state, { postId, updatedPost }) {
    console.log(postId)
    const index = state.posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      // Update the existing post in the list
      state.posts[index] = { ...state.posts[index], ...updatedPost };
    }
  },
  deletePost(state, postId) {
    state.posts = state.posts.filter((post) => post.id !== postId);
  },
};

const actions = {
  async fetchPosts({ commit }) {
    try {
      // Fetch data from an API
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      // Commit the fetched data to the store using the setPosts mutation
      commit('setPosts', response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },
  async addPost({ commit }, newPost) {
    try {
      // Send a POST request to the API to add a new post
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      // Commit the new post to the store using the addPost mutation
      commit('addPost', response.data);
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  },
  async updatePost({ commit }, { postId, updatedPost }) {
    try {
      // Send a PUT request to the API to update an existing post
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPost);
  
      // Commit the updated post to the store using the updatePost mutation
      commit('updatePost', { postId, updatedPost });
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },
  async deletePost({ commit }, postId) {
    try {
      // Send a DELETE request to the API to delete a post
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      // Commit the deleted post to the store using the deletePost mutation
      commit('deletePost', postId);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
};

export default createStore({
  state,
  mutations,
  actions,
});
