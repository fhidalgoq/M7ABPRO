<script>
import TarjetaProducto from './TarjetaProducto.vue';
import DetalleProducto from './DetalleProducto.vue';

export default {
  name: 'CatalogoProductos',
  components: { TarjetaProducto, DetalleProducto },
  data() {
    return {
      productos: [
        {
          id: 1,
          nombre: 'Teclado Mecánico',
          precio: 39990,
          imagen: 'https://ddtech.mx/assets/uploads/38b23072e16e5fc73019fed533753334.png',
          stock: true,
          descripcion: 'Teclado mecánico con switches rojos y retroiluminación RGB.'
        },
        {
          id: 2,
          nombre: 'Mouse Inalámbrico',
          precio: 14990,
          imagen: 'https://centrale.cl/wp-content/uploads/Kensington-Pro-Fit-Ergo-Vertical-Mouse-InalC3A1mbrico-Mouse-Vertical-Ergon_vLcAxTD.webp',
          stock: true,
          descripcion: 'Mouse ergonómico inalámbrico con 5 botones programables.'
        },
        {
          id: 3,
          nombre: 'Audífonos Over-Ear',
          precio: 29990,
          imagen: 'https://blikstore.com/cdn/shop/files/soul250_audifono_inalambrico_gris_s1-1-70e77f0d-3592-4cb8-b6f5-6e54a43a752e.jpg?v=1755554329',
          stock: false,
          descripcion: 'Cancelación de ruido pasiva y sonido balanceado.'
        }
      ],
      carrito: [],
      productoSeleccionadoId: null
    };
  },
  computed: {
    productoSeleccionado() {
      return this.productos.find(p => p.id === this.productoSeleccionadoId) || null;
    },
    carritoDetallado() {
      return this.carrito.map(id => this.productos.find(p => p.id === id)).filter(Boolean);
    },
    totalCarrito() {
      return this.carritoDetallado.reduce((acc, p) => acc + p.precio, 0);
    },
    DetalleProducto() {
      return DetalleProducto;
    }
  },
  methods: {
    agregarAlCarrito(id) {
      this.carrito.push(id);
    },
    abrirDetalle(id) {
      this.productoSeleccionadoId = id;
    },
    cerrarDetalle() {
      this.productoSeleccionadoId = null;
    }
  }
};
</script>

<template>
    <section class="container-xxl py-3 text-center">
      <h2 class="h2 mb-3">Catálogo de productos</h2>
  
      <div class="row g-3 text-center" style="justify-content: center;">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="p in productos" :key="p.id">
          <TarjetaProducto
            :id="p.id"
            :nombre="p.nombre"
            :precio="p.precio"
            :imagen="p.imagen"
            :stock="p.stock"
            :descripcion="p.descripcion"
            @agregar-al-carrito="agregarAlCarrito"
            @ver-detalle="abrirDetalle"
          >
            <template #footer>
              <span v-if="p.precio < 20000" class="badge text-bg-warning text-dark">Oferta</span>
              <span v-else-if="!p.stock" class="badge text-bg-danger">Agotado</span>
            </template>
          </TarjetaProducto>
        </div>
      </div>
  
      <aside class="mt-4 p-3 border rounded-3 bg-light">
        <h4 class="h3">Carrito</h4>
        <p v-if="carrito.length === 0" class="text-secondary mb-0">Aún no agregas productos.</p>
  
        <ul v-else class="list-group list-group-flush">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="item in carritoDetallado"
            :key="item.id"
          >
            <span>{{ item.nombre }}</span>
            <span class="fw-semibold">${{ item.precio.toLocaleString() }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>${{ totalCarrito.toLocaleString() }}</strong>
          </li>
        </ul>
      </aside>
  
      <!-- Detalle dinámico -->
      <component
        v-if="productoSeleccionado"
        :is="DetalleProducto"
        :producto="productoSeleccionado"
        @cerrar="cerrarDetalle"
      />
    </section>
  </template>
  