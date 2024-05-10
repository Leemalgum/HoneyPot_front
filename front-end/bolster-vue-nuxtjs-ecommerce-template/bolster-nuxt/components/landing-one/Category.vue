<template>
    <div>
      <!-- Start Trending Products Area -->
        <div class="container">
          <div class="section-title">
            <h2> 관심 가질만한 상품</h2>
          </div>
  
          <div class="row">
            <ProductItem
              v-for="product in products"
              :product="product"
              :key="product.id"
              @clicked="toggle"
              :className="`col-lg-3 col-md-6 col-sm-6`"
            ></ProductItem>
          </div>
        </div>
      <!-- End Trending Products Area -->
      <QuckView />
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
  
    methods: {
      toggle() {
        mutations.toggleQuickView()
      },
    },
  
    computed: {
      products() {
        return this.$store.state.products.all.filter(
          (product) => product.trending === true
        )
      },
    },
  }
  </script>
  <style scoped>
  .section-title {
      display:flex;
      margin-top:30px;
      justify-content: center;
      text-align: center;
  }
 

  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align:center;
  }


  </style>