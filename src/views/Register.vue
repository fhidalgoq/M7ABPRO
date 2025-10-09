<template>
  <div class="register-page">
    <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
      <v-row justify="center" class="w-100">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="register-card" elevation="8">
            <!-- Header -->
            <div class="register-header pa-8 text-center">
              <v-icon size="64" color="success" class="mb-4">mdi-account-plus</v-icon>
              <h1 class="text-h4 font-weight-bold mb-2">Crear Cuenta</h1>
              <p class="text-body-1 text-medium-emphasis">Únete a nuestra plataforma educativa</p>
            </div>

            <!-- Form -->
            <v-card-text class="pa-8 pt-0">
              <v-form @submit.prevent="register">
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

                <v-text-field
                  v-model="confirmPassword"
                  label="Confirmar contraseña"
                  type="password"
                  prepend-inner-icon="mdi-lock-check"
                  variant="outlined"
                  class="mb-4"
                  :rules="confirmPasswordRules"
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
                  color="success"
                  size="large"
                  block
                  :loading="loading"
                  @click="register"
                  prepend-icon="mdi-account-plus"
                >
                  Crear Cuenta
                </v-btn>
              </v-form>
            </v-card-text>

            <!-- Footer -->
            <v-card-actions class="pa-8 pt-0">
              <v-divider class="mb-4" />
              <div class="text-center w-100">
                <p class="text-body-2 text-medium-emphasis mb-3">
                  ¿Ya tienes una cuenta?
                </p>
                <v-btn
                  to="/login"
                  variant="outlined"
                  color="primary"
                  block
                  prepend-icon="mdi-login"
                >
                  Iniciar Sesión
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
const confirmPassword = ref('')
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

const confirmPasswordRules = [
  v => !!v || 'Confirma tu contraseña',
  v => v === password.value || 'Las contraseñas no coinciden',
]

const register = async () => {
  if (email.value && password.value && confirmPassword.value) {
    await store.dispatch('auth/register', { 
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
.register-page {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  min-height: 100vh;
}

.register-card {
  border-radius: 20px !important;
  overflow: hidden;
}

.register-header {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>