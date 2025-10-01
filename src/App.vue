<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <header class="app-header py-3">
      <div class="container-xxl">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand text-accent fw-bold" href="#">Catálogo Interactivo</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Inicio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Catálogo</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <main class="flex-grow-1 py-4 app-main">
      <CatalogoProductos />
    </main>

    <footer class="app-footer py-3 mt-auto">
      <div class="container-xxl text-center text-secondary">
        © 2025 Proyecto Vue con Vite — ABPRO1 - Módulo 7
      </div>
    </footer>
  </div>
</template>

<script>
import CatalogoProductos from './components/CatalogoProductos.vue';

export default {
  name: 'App',
  components: { CatalogoProductos }
};
</script>

<style>
:root {
  color-scheme: dark light;
  --tech-gradient: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  --accent: #00d4ff;
  --accent-light: #66eaff;
  --font-tech: 'Segoe UI', 'Roboto', 'Ubuntu', sans-serif;
}

body {
  background: var(--tech-gradient);
  font-family: var(--font-tech);
  color: #e0e0e0;
  margin: 0;
  transition: background 0.3s ease;
}

/* Header */
.app-header {
  background-color: #111;
  border-bottom: 2px solid var(--accent);
  box-shadow: 0 2px 10px rgba(0, 212, 255, 0.2);
}

.navbar-brand {
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: var(--accent-light);
  text-shadow: 0 0 5px var(--accent);
}

.nav-link {
  color: #ccc;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--accent-light);
}

/* Main */
.app-main {
  background-color: rgba(255, 255, 255, 0.02);
}

/* Footer */
.app-footer {
  background-color: #1a1a1a;
  color: #aaa;
  font-size: 0.9rem;
  border-top: 1px solid #333;
}

/* Container */
.container-xxl {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Utility */
.text-accent {
  color: var(--accent-light);
}

.btn-accent {
  background-color: var(--accent);
  color: #000;
  border: none;
  transition: background 0.3s ease;
}

.btn-accent:hover {
  background-color: var(--accent-light);
  color: #000;
}
</style>
