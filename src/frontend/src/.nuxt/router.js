import Vue from 'vue'
import Router from 'vue-router'
import scrollBehavior from './router.scrollBehavior.js.js'
import { interopDefault } from './utils'

const _85406662 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _85406662,
    name: "index"
  }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
