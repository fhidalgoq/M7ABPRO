<template>
  <v-dialog v-model="open" max-width="800" persistent>
    <v-card class="course-form-card">
      <!-- Header -->
      <v-card-title class="pa-6 pb-4">
        <div class="d-flex align-center">
          <v-icon 
            :color="isEdit ? 'warning' : 'success'" 
            size="32" 
            class="mr-3"
          >
            {{ isEdit ? 'mdi-pencil' : 'mdi-plus' }}
          </v-icon>
          <div>
            <h2 class="text-h5 font-weight-bold">
              {{ isEdit ? 'Editar Curso' : 'Nuevo Curso' }}
            </h2>
            <p class="text-body-2 text-medium-emphasis mb-0">
              {{ isEdit ? 'Modifica la información del curso' : 'Completa la información del nuevo curso' }}
            </p>
          </div>
        </div>
      </v-card-title>

      <v-divider />

      <!-- Form -->
      <v-card-text class="pa-6">
        <v-form ref="form" @submit.prevent="save">
          <v-row>
            <!-- Código y Nombre -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="model.codigo"
                label="Código del curso"
                prepend-inner-icon="mdi-tag"
                variant="outlined"
                :rules="codigoRules"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="model.nombre"
                label="Nombre del curso"
                prepend-inner-icon="mdi-book"
                variant="outlined"
                :rules="nombreRules"
                required
              />
            </v-col>

            <!-- Precio y Duración -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="model.precio"
                label="Precio"
                prepend-inner-icon="mdi-currency-usd"
                variant="outlined"
                type="number"
                :rules="precioRules"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="model.duracion"
                label="Duración"
                prepend-inner-icon="mdi-clock"
                variant="outlined"
                :rules="duracionRules"
                required
              />
            </v-col>

            <!-- Cupos e Inscritos -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="model.cupos"
                label="Cupos disponibles"
                prepend-inner-icon="mdi-account-group"
                variant="outlined"
                type="number"
                :rules="cuposRules"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="model.inscritos"
                label="Estudiantes inscritos"
                prepend-inner-icon="mdi-account-check"
                variant="outlined"
                type="number"
                :rules="inscritosRules"
                required
              />
            </v-col>

            <!-- Estado -->
            <v-col cols="12">
              <v-switch
                v-model="model.estado"
                label="Curso activo"
                color="success"
                inset
                :prepend-icon="model.estado ? 'mdi-check-circle' : 'mdi-close-circle'"
              />
            </v-col>

            <!-- Descripción -->
            <v-col cols="12">
              <v-textarea
                v-model="model.descripcion"
                label="Descripción del curso"
                prepend-inner-icon="mdi-text"
                variant="outlined"
                rows="3"
                :rules="descripcionRules"
                required
              />
            </v-col>

            <!-- URL de imagen -->
            <v-col cols="12">
              <v-text-field
                v-model="model.img"
                label="URL de la imagen"
                prepend-inner-icon="mdi-image"
                variant="outlined"
                :rules="imgRules"
                required
              />
            </v-col>

            <!-- Preview de imagen -->
            <v-col cols="12" v-if="model.img">
              <div class="image-preview">
                <v-img
                  :src="model.img"
                  height="200"
                  cover
                  rounded="lg"
                  class="mb-2"
                />
                <p class="text-caption text-center text-medium-emphasis">
                  Vista previa de la imagen
                </p>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider />

      <!-- Actions -->
      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn
          variant="outlined"
          color="grey"
          @click="$emit('cancel')"
          prepend-icon="mdi-close"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          @click="save"
          :prepend-icon="isEdit ? 'mdi-content-save' : 'mdi-plus'"
        >
          {{ isEdit ? 'Actualizar Curso' : 'Crear Curso' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, watch, ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  course: { type: Object, default: null },
})
const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const form = ref(null)
const open = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const model = reactive({
  codigo: '',
  nombre: '',
  estado: true,
  precio: '',
  duracion: '',
  descripcion: '',
  cupos: 0,
  inscritos: 0,
  img: '',
})

// Validation rules
const codigoRules = [
  v => !!v || 'El código es requerido',
  v => v.length >= 3 || 'El código debe tener al menos 3 caracteres',
]

const nombreRules = [
  v => !!v || 'El nombre es requerido',
  v => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres',
]

const precioRules = [
  v => !!v || 'El precio es requerido',
  v => v > 0 || 'El precio debe ser mayor a 0',
]

const duracionRules = [
  v => !!v || 'La duración es requerida',
]

const cuposRules = [
  v => !!v || 'Los cupos son requeridos',
  v => v > 0 || 'Los cupos deben ser mayor a 0',
]

const inscritosRules = [
  v => v >= 0 || 'Los inscritos no pueden ser negativos',
  v => v <= model.cupos || 'Los inscritos no pueden exceder los cupos',
]

const descripcionRules = [
  v => !!v || 'La descripción es requerida',
  v => v.length >= 10 || 'La descripción debe tener al menos 10 caracteres',
]

const imgRules = [
  v => !!v || 'La URL de imagen es requerida',
  v => /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v) || 'Debe ser una URL válida de imagen',
]

watch(
  () => props.course,
  (c) => Object.assign(model, c ?? { 
    codigo: '', 
    nombre: '', 
    estado: true, 
    precio: '', 
    duracion: '', 
    descripcion: '', 
    cupos: 0, 
    inscritos: 0, 
    img: '' 
  }),
  { immediate: true }
)

const isEdit = computed(() => !!props.course)

const save = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    emit('submit', { ...model })
  }
}
</script>

<style scoped>
.course-form-card {
  border-radius: 16px !important;
}

.image-preview {
  border: 2px dashed #e0e0e0;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
}
</style>