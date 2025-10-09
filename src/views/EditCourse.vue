<template>
  <div class="edit-course-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="pa-0 mb-6">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :href="item.href"
            :disabled="item.disabled"
            :to="item.to"
          >
            <v-icon v-if="item.icon" class="mr-1" size="small">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <!-- Header -->
      <div class="d-flex align-center mb-6">
        <v-icon size="32" color="primary" class="mr-3">mdi-pencil</v-icon>
        <div>
          <h1 class="text-h4 font-weight-bold mb-2">
            {{ course ? `Editar: ${course.nombre}` : 'Editar Curso' }}
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Modifica la información del curso
          </p>
        </div>
      </div>

      <!-- Form -->
      <v-card elevation="4" class="pa-6">
        <CourseForm v-model="open" :course="course" @cancel="goBack" @submit="update" />
      </v-card>
    </v-container>
  </div>
</template>
    
    
    <script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CourseForm from '../components/CourseForm.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()
const open = ref(true)

const course = computed(() => store.getters['courses/byId'](route.params.id))

const breadcrumbs = computed(() => [
  {
    title: 'Inicio',
    icon: 'mdi-home',
    to: '/home',
    disabled: false,
  },
  {
    title: 'Administración',
    icon: 'mdi-cog',
    to: '/admin',
    disabled: false,
  },
  {
    title: course.value?.nombre || 'Editar Curso',
    icon: 'mdi-pencil',
    disabled: true,
  },
])

const goBack = () => router.push('/admin')

const update = async (payload) => {
  await store.dispatch('courses/update', { id: route.params.id, data: payload })
  router.push('/admin')
}
</script>

<style scoped>
.edit-course-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}
</style>