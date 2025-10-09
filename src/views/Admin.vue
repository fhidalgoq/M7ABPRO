<template>
  <div class="admin-page">
    <v-container class="py-8">
      <!-- Header -->
      <div class="admin-header mb-8">
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="text-h3 font-weight-bold mb-2">Panel de Administración</h1>
            <p class="text-body-1 text-medium-emphasis">
              Gestiona todos los cursos de la plataforma
            </p>
          </div>
          <v-btn 
            color="primary" 
            size="large"
            prepend-icon="mdi-plus" 
            @click="showNew = true"
          >
            Nuevo Curso
          </v-btn>
        </div>
      </div>

      <!-- Stats Cards -->
      <v-row class="mb-8">
        <v-col cols="12" md="3">
          <v-card class="stats-card" elevation="2">
            <v-card-text class="text-center pa-6">
              <v-icon size="48" color="primary" class="mb-3">mdi-book-open-variant</v-icon>
              <div class="text-h4 font-weight-bold text-primary">{{ courses.length }}</div>
              <div class="text-body-2 text-medium-emphasis">Total Cursos</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="stats-card" elevation="2">
            <v-card-text class="text-center pa-6">
              <v-icon size="48" color="success" class="mb-3">mdi-check-circle</v-icon>
              <div class="text-h4 font-weight-bold text-success">{{ activeCourses }}</div>
              <div class="text-body-2 text-medium-emphasis">Cursos Activos</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="stats-card" elevation="2">
            <v-card-text class="text-center pa-6">
              <v-icon size="48" color="info" class="mb-3">mdi-account-group</v-icon>
              <div class="text-h4 font-weight-bold text-info">{{ totalInscritos }}</div>
              <div class="text-body-2 text-medium-emphasis">Total Inscritos</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="stats-card" elevation="2">
            <v-card-text class="text-center pa-6">
              <v-icon size="48" color="warning" class="mb-3">mdi-currency-usd</v-icon>
              <div class="text-h4 font-weight-bold text-warning">${{ totalRevenue }}</div>
              <div class="text-body-2 text-medium-emphasis">Ingresos Totales</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Courses Table -->
      <v-card elevation="4" class="courses-table">
        <v-card-title class="pa-6">
          <div class="d-flex align-center">
            <v-icon class="mr-3" color="primary">mdi-table</v-icon>
            <span class="text-h5 font-weight-bold">Lista de Cursos</span>
          </div>
        </v-card-title>
        
        <v-data-table
          :headers="headers"
          :items="courses"
          :loading="loading"
          class="elevation-0"
          item-key="id"
        >
          <template v-slot:item.estado="{ item }">
            <v-chip 
              :color="item.estado ? 'success' : 'error'" 
              size="small"
              variant="flat"
            >
              <v-icon start>{{ item.estado ? 'mdi-check' : 'mdi-close' }}</v-icon>
              {{ item.estado ? 'Activo' : 'Inactivo' }}
            </v-chip>
          </template>

          <template v-slot:item.precio="{ item }">
            <span class="font-weight-bold text-success">${{ item.precio }}</span>
          </template>

          <template v-slot:item.inscritos="{ item }">
            <div class="d-flex align-center">
              <v-progress-circular
                :model-value="(item.inscritos / item.cupos) * 100"
                :size="24"
                :width="3"
                color="primary"
                class="mr-2"
              />
              <span>{{ item.inscritos }}/{{ item.cupos }}</span>
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-btn
                size="small"
                variant="text"
                icon="mdi-pencil"
                color="primary"
                :to="`/edit/${item.id}`"
                class="mr-1"
              />
              <v-btn
                size="small"
                variant="text"
                icon="mdi-delete"
                color="error"
                @click="confirmDelete(item)"
              />
            </div>
          </template>
        </v-data-table>
      </v-card>

      <!-- Course Form Dialog -->
      <CourseForm v-model="showNew" @cancel="showNew=false" @submit="create" />
      
      <!-- Notificaciones -->
      <v-snackbar
        v-model="showSuccessSnackbar"
        color="success"
        timeout="3000"
        top
      >
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        {{ successMessage }}
      </v-snackbar>

      <v-snackbar
        v-model="showErrorSnackbar"
        color="error"
        timeout="5000"
        top
      >
        <v-icon class="mr-2">mdi-alert-circle</v-icon>
        {{ errorMessage }}
      </v-snackbar>

      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="showConfirm" max-width="500">
        <v-card>
          <v-card-title class="text-h5 pa-6">
            <v-icon class="mr-3" color="error">mdi-alert-circle</v-icon>
            Confirmar Eliminación
          </v-card-title>
          <v-card-text class="pa-6 pt-0">
            <p class="text-body-1 mb-4">
              ¿Estás seguro de que deseas eliminar el curso 
              <strong>"{{ toDelete?.nombre }}"</strong>?
            </p>
            <v-alert type="warning" variant="tonal">
              Esta acción no se puede deshacer y se perderán todos los datos del curso.
            </v-alert>
          </v-card-text>
          <v-card-actions class="pa-6 pt-0">
            <v-spacer />
            <v-btn variant="text" @click="showConfirm=false">
              Cancelar
            </v-btn>
            <v-btn color="error" @click="remove" :loading="loading">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import CourseForm from '../components/CourseForm.vue'

const store = useStore()
const courses = computed(() => store.getters['courses/list'])
const loading = computed(() => store.state.courses.loading)
const successMessage = computed(() => store.state.courses.successMessage)
const errorMessage = computed(() => store.state.courses.error)

const showNew = ref(false)
const showConfirm = ref(false)
const toDelete = ref(null)
const showSuccessSnackbar = ref(false)
const showErrorSnackbar = ref(false)

const headers = [
  { title: 'Nombre', key: 'nombre', sortable: true },
  { title: 'Código', key: 'codigo', sortable: true },
  { title: 'Duración', key: 'duracion', sortable: false },
  { title: 'Precio', key: 'precio', sortable: true },
  { title: 'Estado', key: 'estado', sortable: true },
  { title: 'Inscritos', key: 'inscritos', sortable: true },
  { title: 'Acciones', key: 'actions', sortable: false },
]

const activeCourses = computed(() => 
  courses.value.filter(c => c.estado).length
)

const totalInscritos = computed(() => 
  courses.value.reduce((sum, c) => sum + (c.inscritos || 0), 0)
)

const totalRevenue = computed(() => 
  courses.value.reduce((sum, c) => sum + ((c.inscritos || 0) * (parseInt(c.precio) || 0)), 0)
)

onMounted(() => store.dispatch('courses/subscribe'))

// Watchers para mostrar notificaciones
watch(successMessage, (newValue) => {
  if (newValue) {
    showSuccessSnackbar.value = true
    // Limpiar mensaje después de mostrar
    setTimeout(() => {
      store.commit('courses/CLEAR_MESSAGES')
    }, 3000)
  }
})

watch(errorMessage, (newValue) => {
  if (newValue) {
    showErrorSnackbar.value = true
    // Limpiar mensaje después de mostrar
    setTimeout(() => {
      store.commit('courses/CLEAR_MESSAGES')
    }, 5000)
  }
})

const create = async (payload) => {
  await store.dispatch('courses/add', payload)
  showNew.value = false
}

const confirmDelete = (course) => {
  toDelete.value = course
  showConfirm.value = true
}

const remove = async () => {
  if (!toDelete.value) return
  await store.dispatch('courses/remove', toDelete.value.id)
  showConfirm.value = false
  toDelete.value = null
}
</script>

<style scoped>
.admin-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.admin-header {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.stats-card {
  border-radius: 16px !important;
  transition: transform 0.2s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
}

.courses-table {
  border-radius: 16px !important;
  overflow: hidden;
}
</style>