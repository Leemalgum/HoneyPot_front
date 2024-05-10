<template>
  <div class="container">
      <div class="main-layout" style="text-align: center;">
          <Banner></Banner>
          <Category></Category>

          <div class="products">
            <div class="latest-products">
              <div class="section-title-filter">
                <button class="category">
                  <nuxt-link to="/products" class="category-link">
                    <span style="padding-right: 10px">최신 등록 상품</span>
                    <i class='fa fa-arrow-right'></i>
                  </nuxt-link>
                </button>            
              </div>   
              <div class="section-product"> 
                <LatestProducts></LatestProducts>
              </div>
            </div>
            <div class="best-sellers">
              <div class="section-title-filter">
                <button class="category">
                  <nuxt-link to="/products" class="category-link">
                    <span style="padding-right: 10px">인기상품</span>
                    <i class='fas fa-arrow-right'></i>
                  </nuxt-link>
                </button>            
              </div>
              <BestSellers></BestSellers>
            </div>
            <div class = "deadline">
              <div class="section-title-filter">
                <button class="category">
                  <nuxt-link to="/products" class="category-link">
                    <span style="padding-right: 10px">마감 임박 상품</span>
                    <i class='fas fa-arrow-right'></i>
                  </nuxt-link>
                </button>            
              </div>
              <DeadlineProducts></DeadlineProducts>
            </div>
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
      BestSellers, DeadlineProducts, Category,
  },
  data() {
      return {
          category: "latest"
      }
  },
  methods: {
     
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-label {
  margin-top: 30px;
  justify-content: space-around;
}

.section-title-latest, .section-title-best, .section-title-deadline {
  cursor: pointer;
}

.active {
  color: #ffb400;
  font-style: bold; 
}

.section-title-filter {
  text-align: left;
  padding-top: 20px;
  height: 90px;
}

.latest-product {
  margin-top: 80px;
  margin-bottom: 80px;
}

.category {
    margin-left: 11px;
    background-color: white;
    color: black;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-color: #ffb400; 
    border-width: 1px; 
    border-style: solid; 
    border-radius: 50px; 
    margin-bottom: 30px;
    width: 180px;
    text-align:center;
    align-items:center;
    transition: background-color 0.3s, box-shadow 0.3s;
  }


  .category:hover {
    border-width: 3px; 
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .category-link {
    display: inline-block;
    text-decoration: none;
    color: black;
}

  .producst{
    padding-top: 100px;
  }
</style>
