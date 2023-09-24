import { createRouter, createWebHistory } from 'vue-router';
import PostList from '../components/PostList.vue';
import PostForm from '../components/PostForm.vue';

const routes = [
  { path: '/', component: PostList },
  { path: '/post/edit/:id', name: 'post-edit', component: PostForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
