import Vue from 'vue'
import Router from 'vue-router'
import MathList from '@/components/math-list'
import Add from '@/components/add'
import Modify from '@/components/modify'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/mathList',
      component: MathList
    },
    {
      path: '/mathList',
      component: MathList
    },
    {
      path: '/add',
      component: Add
    },
    {
      path: '/modify',
      component: Modify
    }
  ]
})
