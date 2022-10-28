import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Notebooks from '@/components/NotebookList.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import TrashDetail from '@/components/TrashDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
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
    path: '/note',
    component: NoteDetail
  },
  {
    path: '/trash',
    component: TrashDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
