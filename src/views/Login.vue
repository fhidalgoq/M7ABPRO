<template>
  <div class="login-page">
    <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
      <v-row justify="center" class="w-100">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="login-card" elevation="8">
            <!-- Header -->
            <div class="login-header pa-8 text-center">
              <v-icon size="64" color="primary" class="mb-4">mdi-school</v-icon>
              <h1 class="text-h4 font-weight-bold mb-2">Bienvenido</h1>
              <p class="text-body-1 text-medium-emphasis">Inicia sesión en tu cuenta</p>
            </div>

            <!-- Form -->
            <v-card-text class="pa-8 pt-0">
              <v-form @submit.prevent="login">
                <v-text-field
                  v-model="email"
                  label="Correo electrónico"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  variant="outlined"
                  class="mb-4"
                  :rules="emailRules"
                  required
                />
                
                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  class="mb-4"
                  :rules="passwordRules"
                  required
                />

                <v-alert 
                  v-if="error" 
                  type="error" 
                  variant="tonal"
                  class="mb-4"
                  closable
                  @click:close="clearError"
                >
                  {{ error }}
                </v-alert>

                <v-alert 
                  v-if="successMessage" 
                  type="success" 
                  variant="tonal"
                  class="mb-4"
                  closable
                  @click:close="clearSuccess"
                >
                  {{ successMessage }}
                </v-alert>

                <v-btn
                  color="primary"
                  size="large"
                  block
                  :loading="loading"
                  @click="login"
                  prepend-icon="mdi-login"
                >
                  Iniciar Sesión
                </v-btn>
              </v-form>
            </v-card-text>

            <!-- Footer -->
            <v-card-actions class="pa-8 pt-0">
              <v-divider class="mb-4" />
              <div class="text-center w-100">
                <p class="text-body-2 text-medium-emphasis mb-3">
                  ¿No tienes una cuenta?
                </p>
                <v-btn
                  to="/register"
                  variant="outlined"
                  color="primary"
                  block
                  prepend-icon="mdi-account-plus"
                >
                  Crear Cuenta
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const email = ref('')
const password = ref('')
const error = computed(() => store.state.auth.error)
const successMessage = computed(() => store.state.auth.successMessage)
const loading = computed(() => store.state.auth.loading)

const emailRules = [
  v => !!v || 'El correo es requerido',
  v => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
]

const passwordRules = [
  v => !!v || 'La contraseña es requerida',
  v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
]

const login = async () => {
  if (email.value && password.value) {
    await store.dispatch('auth/login', { 
      email: email.value, 
      password: password.value 
    })
  }
}

const clearError = () => {
  store.commit('auth/SET_ERROR', null)
}

const clearSuccess = () => {
  store.commit('auth/SET_SUCCESS_MESSAGE', null)
}
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.login-card {
  border-radius: 20px !important;
  overflow: hidden;
}

.login-header {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>