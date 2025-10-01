<script>
export default {
  name: 'DetalleProducto',
  props: {
    producto: {
      type: Object,
      required: true,
      validator(p) {
        return ['id','nombre','precio','imagen','stock','descripcion'].every(k => k in p);
      }
    }
  },
  emits: ['cerrar']
};
</script>

<template>
    <!-- Overlay estilo modal usando utilidades de Bootstrap -->
    <div class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-grid place-items-center" @click.self="$emit('cerrar')" style="z-index: 1050;">
      <section class="card shadow-lg" style="width: min(720px, 92vw);">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h3 class="h5 mb-0">{{ producto.nombre }}</h3>
          <button class="btn btn-outline-secondary btn-sm" @click="$emit('cerrar')" aria-label="Cerrar">✕</button>
        </div>
  
        <img
          :src="producto.imagen"
          :alt="`Imagen de ${producto.nombre}`"
          class="w-100 object-fit-contain"
          style="height: 320px"
        />
  
        <div class="card-body d-grid gap-2">
          <p class="mb-0"><span class="fw-semibold">Precio:</span> ${{ producto.precio.toLocaleString() }}</p>
          <p class="text-secondary mb-0">{{ producto.descripcion }}</p>
          <span
            class="badge"
            :class="producto.stock ? 'text-bg-success' : 'text-bg-danger'"
            >{{ producto.stock ? 'En stock' : 'Sin stock' }}</span
          >
        </div>
      </section>
    </div>
  </template>
  

  <style scoped>
  .object-fit-cover { object-fit: cover; }
  .d-grid { display: grid; }
  .place-items-center { place-items: center; }
  </style>
  