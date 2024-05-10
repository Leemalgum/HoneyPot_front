<template>
    <div class="container">
      <div class="main-layout" style="text-align: center;">
        <Banner></Banner>
        <Category></Category>
        <div class ="product">
          <LatestProducts></LatestProducts>
          <BestSellers></BestSellers>
          <DeadlineProducts></DeadlineProducts>
        </div>
      </div>
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/landing-one/Banner';
import LatestProducts from '../components/landing-one/LatestProducts';
import DeadlineProducts from '../components/landing-one/DeadlineProducts.vue';
import BestSellers from '../components/landing-one/BestSellers.vue';
import Category from '../components/landing-one/Category.vue';


export default {
  components: {
    TopHeader, Menubar, Banner, LatestProducts,
    BestSellers, DeadlineProducts,Category,
  }
}
</script>

<style scoped>

  .product{
    display: flex;
    justify-content: center;
    margin-top:100px;
  }
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
  }

.main-layout{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
