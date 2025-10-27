import { defineStore } from 'pinia'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

// Flag to detect the initial onAuthStateChanged call (restore on page load)
let firstAuthCall = true
let prevUser = null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    initialized: false,
    successMessage: null,
  }),

  getters: {
    isAuth: (state) => !!state.user,
    userEmail: (state) => state.user?.email || '',
  },

  actions: {
    initAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          // If this is not the very first callback and we detect a transition
          // from no-user to a user, treat it as a fresh login and show a message.
          if (!firstAuthCall) {
            if (user && !prevUser) {
              this.successMessage = '¡Sesión iniciada correctamente!'
            }
          }

          // update prevUser for next event
          prevUser = user

          this.user = user
          this.initialized = true
          firstAuthCall = false
          resolve(user)
        })
      })
    },

    async register({ email, password }) {
      this.loading = true
      this.clearMessages()
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        this.successMessage = '¡Cuenta creada exitosamente!'
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async login({ email, password }) {
      this.loading = true
      this.clearMessages()
      try {
        await signInWithEmailAndPassword(auth, email, password)
        this.successMessage = '¡Bienvenido de vuelta!'
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async logout() {
      await signOut(auth)
      this.user = null
    },

    clearMessages() {
      this.error = null
      this.successMessage = null
    },
  },
})
