import { auth } from '../../firebase'
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
} from 'firebase/auth'


const state = () => ({
user: null,
loading: false,
error: null,
initialized: false,
successMessage: null,
})


const getters = {
isAuth: (s) => !!s.user,
userEmail: (s) => s.user?.email || '',
}


const mutations = {
SET_USER(s, u) {
s.user = u
},
SET_LOADING(s, v) {
s.loading = v
},
SET_ERROR(s, e) {
s.error = e
},
SET_INITIALIZED(s, v) {
s.initialized = v
},
SET_SUCCESS_MESSAGE(s, m) {
s.successMessage = m
},
CLEAR_MESSAGES(s) {
s.error = null
s.successMessage = null
},
}


const actions = {
initAuth({ commit }) {
return new Promise((resolve) => {
onAuthStateChanged(auth, (u) => {
commit('SET_USER', u)
commit('SET_INITIALIZED', true)
resolve(u)
})
})
},


async register({ commit }, { email, password }) {
commit('SET_LOADING', true)
commit('CLEAR_MESSAGES')
try {
await createUserWithEmailAndPassword(auth, email, password)
commit('SET_SUCCESS_MESSAGE', '¡Cuenta creada exitosamente!')
} catch (e) {
commit('SET_ERROR', e.message)
} finally {
commit('SET_LOADING', false)
}
},


async login({ commit }, { email, password }) {
commit('SET_LOADING', true)
commit('CLEAR_MESSAGES')
try {
await signInWithEmailAndPassword(auth, email, password)
commit('SET_SUCCESS_MESSAGE', '¡Bienvenido de vuelta!')
} catch (e) {
commit('SET_ERROR', e.message)
} finally {
commit('SET_LOADING', false)
}
},


async logout({ commit }) {
await signOut(auth)
commit('SET_USER', null)
},
}


export default { namespaced: true, state, getters, mutations, actions }