<template>
  <div>
    <!-- Start Best Sellers Area -->
      <div class="container">
        <div class="section-title">
          <h2>인기 상품</h2>
        </div>

        <div class="row">
          <ProductItem
              v-for="(product, index) in products.slice(0, 4)"
              :product="product"
              :key="index"
              @clicked="toggle"
            ></ProductItem>
            <div class="btn-more-layout">
              <nuxt-link to="/products" class="btn-more-products">더보기</nuxt-link>  
              <!-- 경매 상품 리스트 페이지로 이동해서 조회순으로 목록 보여줌  -->
            </div>
          </div>
        </div>
    <!-- End Best Sellers Area -->
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
        (product) => product.bestSellers === true
      )
    },
  },
}
</script>
<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align:center;
  }

</style>