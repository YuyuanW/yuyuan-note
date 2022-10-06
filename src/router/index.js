import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/Login'
import Notebooks from '@/components/NotebookList.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import TrashDetail from '@/components/TrashDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/notebooks',
    component: Notebooks
  },
  {
    path: '/note/:noteId',
    component: NoteDetail
  },
  {
    path: '/trash/:noteId',
    component: TrashDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
