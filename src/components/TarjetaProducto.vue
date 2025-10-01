<script>
export default {
  name: 'TarjetaProducto',
  props: {
    id: { type: [String, Number], required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true },
    stock: { type: Boolean, required: true },
    descripcion: { type: String, required: true }
  },
  emits: ['agregar-al-carrito', 'ver-detalle'],
  created() {
    console.log(`TarjetaDeProducto-Created ${this.nombre}`);
  },
  mounted() {
    console.log(`TarjetaDeProducto-Mounted ${this.nombre}`);
  },
  beforeUnmount() {
    console.log(`TarjetaDeProducto-BeforeUnmount ${this.nombre}`);
  },
  methods: {
    agregarAlCarrito() {
      this.$emit('agregar-al-carrito', this.id);
    },
    verDetalle() {
      this.$emit('ver-detalle', this.id);
    }
  }
};
</script>

<template>
    <article
      class="card h-100 shadow-sm"
      :class="{ 'opacity-75': !stock }"
      @click="verDetalle"
    >
      <img
        :src="imagen"
        :alt="`Imagen de ${nombre}`"
        class="card-img-top object-fit-cover"
        style="height: 180px"
      />
  
      <div class="card-body d-grid gap-2">
        <div class="d-flex justify-content-between align-items-start">
          <h3 class="h6 mb-0">{{ nombre }}</h3>
          <span class="fw-bold">${{ precio.toLocaleString() }}</span>
        </div>
  
        <p class="text-secondary mb-0 line-clamp-3">
          {{ descripcion }}
        </p>
        <div class="pt-1">
          <slot name="footer"></slot>
        </div>
        <span
          class="badge"
          :class="stock ? 'text-bg-success' : 'text-bg-danger'"
        >
          {{ stock ? 'En stock' : 'Sin stock' }}
        </span>
  
        <button
          class="btn btn-dark btn-sm mt-1"
          :disabled="!stock"
          @click.stop="agregarAlCarrito"
          title="Agregar al carrito"
        >
          Agregar al carrito
        </button>
  
      </div>
    </article>
  </template>
    
  <style scoped>
  .object-fit-cover { object-fit: cover; }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  