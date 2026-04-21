/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/book/:isbn',
      name: 'book-details',
      component: () => import('@/pages/book.vue'),
    },
    {
      path: '/shelf/:id',
      name: 'shelf-details',
      component: () => import('@/pages/shelf.vue'),
    },
    // catch-all (404 → redirect to home)
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
