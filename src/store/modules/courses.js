import { db } from '../../firebase'
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


const colRef = collection(db, 'courses')


const state = () => ({
items: [],
unsub: null,
loading: false,
error: null,
successMessage: null,
})


const getters = {
list: (s) => s.items,
byId: (s) => (id) => s.items.find((c) => c.id === id),
}


const mutations = {
SET_ITEMS(s, arr) {
s.items = arr
},
SET_UNSUB(s, fn) {
if (s.unsub) s.unsub()
s.unsub = fn
},
SET_LOADING(s, v) {
s.loading = v
},
SET_ERROR(s, e) {
s.error = e
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
subscribe({ commit }) {
const unsub = onSnapshot(colRef, (snap) => {
const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
commit('SET_ITEMS', arr)
})
commit('SET_UNSUB', unsub)
},


async add({ commit }, data) {
commit('SET_LOADING', true)
commit('CLEAR_MESSAGES')
try {
await addDoc(colRef, { ...data, createdAt: serverTimestamp() })
commit('SET_SUCCESS_MESSAGE', '¡Curso creado exitosamente!')
} catch (e) {
commit('SET_ERROR', e.message)
} finally {
commit('SET_LOADING', false)
}
},


async update({ commit }, { id, data }) {
commit('SET_LOADING', true)
commit('CLEAR_MESSAGES')
try {
await updateDoc(doc(db, 'courses', id), data)
commit('SET_SUCCESS_MESSAGE', '¡Curso actualizado exitosamente!')
} catch (e) {
commit('SET_ERROR', e.message)
} finally {
commit('SET_LOADING', false)
}
},


async remove({ commit }, id) {
commit('SET_LOADING', true)
commit('CLEAR_MESSAGES')
try {
await deleteDoc(doc(db, 'courses', id))
commit('SET_SUCCESS_MESSAGE', '¡Curso eliminado exitosamente!')
} catch (e) {
commit('SET_ERROR', e.message)
} finally {
commit('SET_LOADING', false)
}
},


async seedIfEmpty() {
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
    }
    
    
    export default { namespaced: true, state, getters, mutations, actions }