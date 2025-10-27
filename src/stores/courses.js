import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    items: [],
    unsub: null,
    loading: false,
    error: null,
    successMessage: null,
  }),

  getters: {
    list: (state) => state.items,
    byId: (state) => (id) => state.items.find((c) => c.id === id),
  },

  actions: {
    subscribe() {
      const colRef = collection(db, 'courses')
      const unsub = onSnapshot(colRef, (snap) => {
        this.items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      })
      this.unsub = unsub
    },

    async add(data) {
      this.loading = true
      this.clearMessages()
      try {
        const colRef = collection(db, 'courses')
        await addDoc(colRef, { ...data, createdAt: serverTimestamp() })
        this.successMessage = '¡Curso creado exitosamente!'
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async update({ id, data }) {
      this.loading = true
      this.clearMessages()
      try {
        await updateDoc(doc(db, 'courses', id), data)
        this.successMessage = '¡Curso actualizado exitosamente!'
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async remove(id) {
      this.loading = true
      this.clearMessages()
      try {
        await deleteDoc(doc(db, 'courses', id))
        this.successMessage = '¡Curso eliminado exitosamente!'
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async seedIfEmpty() {
      const colRef = collection(db, 'courses')
      const snap = await getDocs(colRef)
      if (snap.empty) {
        const seed = [
          {
            codigo: '0001',
            nombre: 'HTML',
            estado: true,
            precio: '30000',
            duracion: '1 mes',
            descripcion: 'curso html',
            cupos: 10,
            inscritos: 0,
            img: 'https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png',
          },
          {
            codigo: '0002',
            nombre: 'CSS',
            estado: false,
            precio: '20000',
            duracion: '1 mes',
            descripcion: 'curso css',
            cupos: 20,
            inscritos: 0,
            img: 'https://lineadecodigo.com/wp-content/uploads/2014/04/css.png',
          },
          {
            codigo: '0003',
            nombre: 'SASS',
            estado: true,
            precio: '40000',
            duracion: '2 mes',
            descripcion: 'curso sass',
            cupos: 30,
            inscritos: 0,
            img: 'https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png',
          },
          {
            codigo: '0004',
            nombre: 'VUE',
            estado: false,
            precio: '50000',
            duracion: '3 mes',
            descripcion: 'curso vue',
            cupos: 15,
            inscritos: 0,
            img: 'https://thumbs.gfycat.com/PinkPiercingBull-size_restricted.gif',
          },
        ]
        for (const item of seed) await addDoc(colRef, item)
      }
    },

    clearMessages() {
      this.error = null
      this.successMessage = null
    },
  },
})
