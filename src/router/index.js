import Vue from 'vue'
import VueRouter from 'vue-router'
import MusicIndex from '@/components/MusicIndex'
import Playlist from '@/components/Playlists'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MusicIndex
  },
  {
    path: '/playlist/:slug',
    component: Playlist
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
