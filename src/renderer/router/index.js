import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {
        name: 'equipage'
      }
    },
    {
      path: '/equipage',
      name: 'equipage',
      component: () => import('@/components/Equipage.vue')
    },
    {
      path: '/occupation',
      name: 'occupation',
      component: () => import('@/components/Occupation.vue')
    },
    {
      path: '/race',
      name: 'race',
      component: () => import('@/components/Race.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
