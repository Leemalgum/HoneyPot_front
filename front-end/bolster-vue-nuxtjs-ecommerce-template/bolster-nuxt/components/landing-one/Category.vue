<template>
    <div>
      <!-- Start Trending Products Area -->
        <div class="container">
          <div class="section-title">
            <h2><b> 관심 가질만한 상품</b></h2>
          </div>

          <div class="btn-category">
            <button class="category" v-for="(idol, index) in idols" :key="index" @click="filterByIdol(idol)"
              :class="{ active: idol === selectedIdol }">{{idol}}</button>
<!--
              <button class="category" v-for="(idol, index) in idols" :key="index" @click="filterByIdol(idol)"
              :class="{ active: idol === selectedIdol }">{{idol}}</button> -->

            <!-- <button v-for="(btn, index) in 3" :key="index" @click="handleBtnClick(index)">{{ product.idolName }}</button> -->
          </div>
  
          <div class="row">
            <div class="col-md-3" v-for="(product, index) in products.slice(0,4)" :key="index">
              <!-- <div class="col-md-3" v-for="(product, index) in filteredProducts.slice(0,4)" :key="index"> -->
              <ProductItem :product="product"></ProductItem>
            </div>
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
    data() {
      return {
        selectedIdol: ['아이브', '르세라핌', '세븐틴'],
        idols: ['아이브', '르세라핌', '세븐틴'] // 아이돌 이름 배열,
      };
    },

    methods: {
      toggle() {
        mutations.toggleQuickView()
      },
      filterByIdol(idol) {
        this.selectedIdol = idol;
      }
    },
  
    computed: {
      products() {
        return this.$store.state.products.all.filter(
          (product) => product.trending === true
        )
      },

      filteredProducts() {
        if(!this.selectedIdol) return this.products;

        return this.products.filter(product => product.idolName === this.selectedIdol);
      }
  },
}
  </script>
  <style scoped>
  .section-title {
      display:flex;
      margin-top:50px;
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


  .btn-category {
    height: 50px;
  }


  .category {
    margin-right: 10px;
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
    width: 150px;
    text-align:center;
    align-items:center;
    transition: background-color 0.3s, box-shadow 0.3s;
  }


  .btn-category button:hover {
    border-width: 3px; 
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
  }

  .active {
    background-color: #ffb400;
    color: white;
    font-weight: bold;
  }

  </style>