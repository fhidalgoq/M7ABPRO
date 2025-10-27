<template>
  <v-app-bar app color="primary" elevation="0" height="70">
    <v-container class="d-flex align-center">
      <!-- Logo y título -->
      <div class="d-flex align-center">
        <v-icon size="32" color="white" class="mr-3">mdi-school</v-icon>
        <v-app-bar-title class="text-h5 font-weight-bold text-white">
          AdWeb Online
        </v-app-bar-title>
        <v-chip v-if="isAuth" color="white" variant="flat" size="small" class="ml-4">
          <v-icon start>mdi-account</v-icon>
          {{ email }}
        </v-chip>
      </div>

      <v-spacer />

      <!-- Navegación -->
      <div v-if="isAuth" class="d-flex align-center">
        <v-btn
          to="/home"
          variant="text"
          color="white"
          prepend-icon="mdi-home"
          class="mr-2"
          :class="{ 'v-btn--active': $route.path === '/home' }"
        >
          Inicio
        </v-btn>
        <v-btn
          to="/admin"
          variant="text"
          color="white"
          prepend-icon="mdi-cog"
          class="mr-2"
          :class="{ 'v-btn--active': $route.path.startsWith('/admin') || $route.path.startsWith('/edit') }"
        >
          Administración
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              color="white"
              prepend-icon="mdi-account-circle"
              class="mr-2"
            >
              {{ userDisplayName }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title class="text-body-2">
                {{ email }}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item @click="logout" prepend-icon="mdi-logout">
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isAuth = computed(() => authStore.isAuth)
const email = computed(() => authStore.userEmail)

const userDisplayName = computed(() => {
  const emailValue = email.value
  return emailValue ? emailValue.split('@')[0] : 'Usuario'
})

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
