<template>
  <v-card class="h-100 course-card" elevation="4" hover>
    <!-- Imagen del curso -->
    <div class="image-container">
      <v-img 
        :src="course.img" 
        height="200" 
        cover
        class="course-image"
      >
        <div class="image-overlay">
          <v-chip 
            :color="course.estado ? 'success' : 'error'" 
            size="small"
            class="status-chip"
          >
            <v-icon start>{{ course.estado ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
            {{ course.estado ? 'Activo' : 'Inactivo' }}
          </v-chip>
        </div>
      </v-img>
    </div>

    <!-- Contenido de la tarjeta -->
    <v-card-title class="text-h6 font-weight-bold pa-4 pb-2">
      {{ course.nombre }}
    </v-card-title>

    <v-card-text class="pa-4 pt-0">
      <!-- Código del curso -->
      <div class="d-flex align-center mb-2">
        <v-icon size="16" class="mr-2" color="primary">mdi-tag</v-icon>
        <span class="text-caption text-medium-emphasis">Código: {{ course.codigo }}</span>
      </div>

      <!-- Duración -->
      <div class="d-flex align-center mb-2">
        <v-icon size="16" class="mr-2" color="primary">mdi-clock</v-icon>
        <span class="text-body-2">{{ course.duracion }}</span>
      </div>

      <!-- Precio -->
      <div class="d-flex align-center mb-3">
        <v-icon size="16" class="mr-2" color="success">mdi-currency-usd</v-icon>
        <span class="text-h6 font-weight-bold text-success">${{ course.precio }}</span>
      </div>

      <!-- Cupos e inscritos -->
      <v-row no-gutters class="mb-3">
        <v-col cols="6">
          <div class="text-center pa-2 bg-grey-lighten-5 rounded">
            <div class="text-h6 font-weight-bold text-primary">{{ course.cupos }}</div>
            <div class="text-caption">Cupos</div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-center pa-2 bg-grey-lighten-5 rounded ml-2">
            <div class="text-h6 font-weight-bold text-info">{{ course.inscritos }}</div>
            <div class="text-caption">Inscritos</div>
          </div>
        </v-col>
      </v-row>

      <!-- Descripción -->
      <div v-if="course.descripcion" class="text-body-2 text-medium-emphasis">
        {{ course.descripcion }}
      </div>
    </v-card-text>

    <!-- Acciones -->
    <v-card-actions class="pa-4 pt-0">
      <v-btn 
        color="primary" 
        variant="flat" 
        block
        prepend-icon="mdi-eye"
        :disabled="!course.estado"
        @click="$emit('view-details', course)"
      >
        Ver Detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({ course: { type: Object, required: true } })
defineEmits(['view-details'])
</script>

<style scoped>
.course-card {
  transition: all 0.3s ease;
  border-radius: 16px !important;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
}

.course-image {
  transition: transform 0.3s ease;
}

.course-card:hover .course-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
}

.status-chip {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9) !important;
}
</style>