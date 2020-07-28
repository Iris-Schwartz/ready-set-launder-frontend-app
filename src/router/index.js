import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import ItemsIndex from '../views/ItemsIndex.vue'
import ItemsNew from '../views/ItemsNew.vue'
import ItemsLaunder from '../views/ItemsLaunder.vue'
import UsersEdit from '../views/UsersEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/items',
    name: 'items-index',
    component: ItemsIndex
  },
  {
    path: '/items/new',
    name: 'items-new',
    component: ItemsNew
  },
  {
    path: '/items/launder',
    name: 'items-launder',
    component: ItemsLaunder
  },
  {
    path: '/users/me',
    name: 'users-edit',
    component: UsersEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
