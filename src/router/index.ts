import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/layout/menu/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    name: 'Home',
    meta: { title: '首页', icon: 'white-home' },
    children: [
      {
        path: 'index',
        component: () => import('../views/homepage/MainPage.vue'),
        meta: { title: '首页', home: true, first: true }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
