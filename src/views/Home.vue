<template>
  <div class="home-page">
    <!-- Hero Section -->
    <v-container fluid class="hero-section pa-0">
      <v-row no-gutters class="align-center" style="min-height: 400px;">
        <v-col cols="12" md="6" class="pa-8 pa-md-12">
          <div class="hero-content">
            <h1 class="text-h3 text-md-h2 font-weight-bold mb-4 text-primary">
              Bienvenido a EduPlatform
            </h1>
            <p class="text-h6 text-medium-emphasis mb-6">
              Descubre una amplia variedad de cursos online diseñados para impulsar tu carrera profesional
            </p>
            <v-btn 
              color="primary" 
              size="large" 
              prepend-icon="mdi-rocket-launch"
              @click="scrollToCourses"
            >
              Explorar Cursos
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pa-8 pa-md-12">
          <div class="hero-image">
            <v-img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              height="300"
              cover
              rounded="lg"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Stats Section -->
    <v-container class="py-8">
      <v-row>
        <v-col cols="12" md="3" v-for="stat in stats" :key="stat.title">
          <v-card class="text-center pa-4" elevation="2">
            <v-icon :color="stat.color" size="48" class="mb-3">{{ stat.icon }}</v-icon>
            <div class="text-h4 font-weight-bold text-primary mb-2">{{ stat.value }}</div>
            <div class="text-body-1 text-medium-emphasis">{{ stat.title }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Courses Section -->
    <v-container class="py-8" id="courses-section">
      <div class="d-flex align-center justify-space-between mb-6">
        <div>
          <h2 class="text-h4 font-weight-bold mb-2">Nuestros Cursos</h2>
          <p class="text-body-1 text-medium-emphasis">
            Explora nuestra selección de cursos profesionales
          </p>
        </div>
        <v-btn 
          color="secondary" 
          variant="outlined"
          prepend-icon="mdi-database-plus"
          @click="seed"
        >
          Cargar Datos de Ejemplo
        </v-btn>
      </div>

      <!-- Filtros y Búsqueda -->
      <v-card class="mb-6" elevation="2">
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="searchQuery"
                label="Buscar cursos..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                clearable
                hide-details
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="statusFilter"
                :items="statusOptions"
                label="Estado"
                variant="outlined"
                clearable
                hide-details
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                label="Ordenar por"
                variant="outlined"
                hide-details
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Loading State -->
      <div v-if="courses.length === 0" class="text-center py-12">
        <v-progress-circular 
          indeterminate 
          color="primary" 
          size="64"
          class="mb-4"
        />
        <div class="text-h6 text-medium-emphasis">Cargando cursos...</div>
      </div>

      <!-- Results Info -->
      <div v-if="filteredCourses.length > 0" class="mb-4">
        <v-chip color="primary" variant="tonal">
          {{ filteredCourses.length }} curso{{ filteredCourses.length !== 1 ? 's' : '' }} encontrado{{ filteredCourses.length !== 1 ? 's' : '' }}
        </v-chip>
      </div>

      <!-- Courses Grid -->
      <v-row v-if="filteredCourses.length > 0">
        <v-col 
          v-for="course in filteredCourses" 
          :key="course.id" 
          cols="12" 
          sm="6" 
          md="4" 
          lg="3"
        >
          <CourseCard :course="course" @view-details="viewCourseDetails" />
        </v-col>
      </v-row>

      <!-- No Results State -->
      <v-card v-if="courses.length > 0 && filteredCourses.length === 0" class="text-center pa-8" elevation="2">
        <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-magnify</v-icon>
        <h3 class="text-h5 mb-2">No se encontraron cursos</h3>
        <p class="text-body-1 text-medium-emphasis mb-4">
          Intenta ajustar los filtros o términos de búsqueda
        </p>
        <v-btn color="primary" @click="clearFilters">
          Limpiar Filtros
        </v-btn>
      </v-card>

      <!-- Empty State -->
      <v-card v-if="courses.length === 0" class="text-center pa-8" elevation="2">
        <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-book-open-variant</v-icon>
        <h3 class="text-h5 mb-2">No hay cursos disponibles</h3>
        <p class="text-body-1 text-medium-emphasis mb-4">
          Haz clic en "Cargar Datos de Ejemplo" para agregar algunos cursos de muestra
        </p>
        <v-btn color="primary" @click="seed">
          Cargar Cursos de Ejemplo
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useCoursesStore } from '../stores/courses'
import { useRouter } from 'vue-router'
import CourseCard from '../components/CourseCard.vue'

const coursesStore = useCoursesStore()
const router = useRouter()
const courses = computed(() => coursesStore.list)

// Filtros y búsqueda
const searchQuery = ref('')
const statusFilter = ref(null)
const sortBy = ref('nombre')

const statusOptions = [
  { title: 'Todos', value: null },
  { title: 'Activos', value: true },
  { title: 'Inactivos', value: false },
]

const sortOptions = [
  { title: 'Nombre A-Z', value: 'nombre' },
  { title: 'Nombre Z-A', value: 'nombre-desc' },
  { title: 'Precio (menor a mayor)', value: 'precio' },
  { title: 'Precio (mayor a menor)', value: 'precio-desc' },
  { title: 'Más inscritos', value: 'inscritos-desc' },
]

// Cursos filtrados
const filteredCourses = computed(() => {
  let filtered = [...courses.value]

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(course => 
      course.nombre.toLowerCase().includes(query) ||
      course.codigo.toLowerCase().includes(query) ||
      course.descripcion.toLowerCase().includes(query)
    )
  }

  // Filtrar por estado
  if (statusFilter.value !== null) {
    filtered = filtered.filter(course => course.estado === statusFilter.value)
  }

  // Ordenar
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'nombre':
        return a.nombre.localeCompare(b.nombre)
      case 'nombre-desc':
        return b.nombre.localeCompare(a.nombre)
      case 'precio':
        return parseInt(a.precio) - parseInt(b.precio)
      case 'precio-desc':
        return parseInt(b.precio) - parseInt(a.precio)
      case 'inscritos-desc':
        return (b.inscritos || 0) - (a.inscritos || 0)
      default:
        return 0
    }
  })

  return filtered
})

const stats = ref([
  { icon: 'mdi-book-open-variant', value: '50+', title: 'Cursos Disponibles', color: 'primary' },
  { icon: 'mdi-account-group', value: '1,200+', title: 'Estudiantes Activos', color: 'success' },
  { icon: 'mdi-school', value: '25+', title: 'Instructores Expertos', color: 'info' },
  { icon: 'mdi-star', value: '4.9', title: 'Calificación Promedio', color: 'warning' },
])

onMounted(() => {
  coursesStore.subscribe()
})

const seed = () => coursesStore.seedIfEmpty()

const scrollToCourses = () => {
  document.getElementById('courses-section')?.scrollIntoView({ 
    behavior: 'smooth' 
  })
}

const viewCourseDetails = (course) => {
  // Aquí podrías navegar a una página de detalles del curso
  console.log('Ver detalles del curso:', course)
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = null
  sortBy.value = 'nombre'
}
</script>

<style scoped>
.home-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

.hero-image {
  animation: fadeInRight 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>