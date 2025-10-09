import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import EditCourse from '../views/EditCourse.vue'
import store from '../store'


const routes = [
{ path: '/', redirect: '/home' },
{ path: '/login', name: 'login', component: Login, meta: { public: true } },
{ path: '/register', name: 'register', component: Register, meta: { public: true } },
{ path: '/home', name: 'home', component: Home, meta: { requiresAuth: true } },
{ path: '/admin', name: 'admin', component: Admin, meta: { requiresAuth: true } },
{
path: '/edit/:id',
name: 'edit',
component: EditCourse,
props: true,
meta: { requiresAuth: true },
},
{ path: '/:pathMatch(.*)*', redirect: '/home' },
]


const router = createRouter({ history: createWebHistory(), routes })


router.beforeEach(async (to, from, next) => {
if (!store.state.auth.initialized) {
await store.dispatch('auth/initAuth')
}
const isAuth = store.getters['auth/isAuth']


if (to.meta.requiresAuth && !isAuth) return next('/login')
if (to.meta.public && isAuth) return next('/home')
return next()
})


export default router