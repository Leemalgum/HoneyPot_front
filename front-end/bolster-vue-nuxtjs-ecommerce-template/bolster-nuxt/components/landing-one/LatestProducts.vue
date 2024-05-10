<template>
  <div>
    <!-- Start All Products Area -->
    <div class="container">
        <button @click="leftSlide" class="btn-left" :class="{'disabled': currentIndex === 0 }">
          <i class="fas fa-chevron-left"></i>
        </button>
      <div class="row">
         <div class="col-md-3" v-for="(product, index) in slicedProducts" :key="index">
           <ProductItem :product="product"></ProductItem>
         </div>
       </div>
          <button @click="rightSlide" class="btn-right" :class="{'disabled': currentIndex === this.totalSlides - 1 }">
            <i class="fas fa-chevron-right"></i>
          </button>
    </div>
  </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import { mutations } from '../../utils/sidebar-util'
import ProductItem from './ProductItemMain'

export default {
  components: {
    QuckView,
    ProductItem,
  },
  data() {
    return {
      currentIndex: 0,
      itemsPerPage: 4,
      totalSlides:3,
    };
  },

  methods: {

    leftSlide() {
       if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
    },
    rightSlide() {
      if (this.currentIndex < this.totalSlides - 1) {
        this.currentIndex += 1;
      }
    },
  },
  computed: {
    products() {
      return this.$store.state.products.all;
    },
    props: ['product'],
    slicedProducts() {
      const start = this.currentIndex * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
  },
}
</script>
<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
  }

.btn-left, .btn-right {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;
  margin: 20px;
  outline: none;
  padding: 5px;
  margin-bottom: 150px;
}

.btn-left i,
.btn-right i {
  color: #999;
}

.btn-left:hover i,
.btn-right:hover i {
  color: black;
}

.btn-left.disabled i {
  color: #999; /* 비활성화 상태일 때 색상 */
}

.btn-right.disabled i {
  color: #999; /* 비활성화 상태일 때 색상 */
}

</style>