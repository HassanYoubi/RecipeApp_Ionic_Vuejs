import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Home'
  },
  {
    path: '/folder/Home',
    component: () => import('../views/FolderPage.vue')
  },
  {
    path: '/list/:id',
    component: () => import('../views/List.vue')
  },
  {
    path: '/detail/:id',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/folder/Search',
    component: () => import('../views/Search.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
