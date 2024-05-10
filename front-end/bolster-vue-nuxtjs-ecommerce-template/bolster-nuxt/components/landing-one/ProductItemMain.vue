<template>
    <div :class="className">
        <div class="single-product-box" >
            <div class="product-image">
                <nuxt-link :to="`/bid-details/1`">
                    <!-- <nuxt-link :to="`/bid-details/${product.productId}`">-->
                    <img :src="product.image" :alt="product.name"/>
                    <!-- <img :src="product.imageHover" :alt="product.name" /> -->
                </nuxt-link>

                <!-- <nuxt-link :to="`/bid/${product.productId}`">
                    <img :src="product.productImage" :alt="product.productName" />
                    <img :src="product.imageHover" :alt="product.name" />
                </nuxt-link> -->

                <!-- <Timer
                    v-if="product.timePeriod"
                    v-bind:dateTime="product.dateTime"
                ></Timer> -->
            </div>

            <div class="product-content" style="text-align: left;">
                <div class="main_description">
                    <div class="idol_name">
                        아이돌 명
                        <!-- {{ product.idolName }} -->
                    </div>
                    <div class="product_type">
                        상품 타입
                        <!-- {{ product.productType }} -->
                    </div>
                </div>
                <h3>
                    <nuxt-link :to="`/products-details/${product.id}`">
                        {{ product.name }}
                        <!-- {{product.productName}} -->
                        <!-- 상품 이름을 카테고리 테이블의 아이돌 이름으로  -->
                    </nuxt-link>
                </h3>

                <div class="product-price">
                    <!-- <span class="old-price" v-if="product.offer">
                        ${{ product.price - product.offerPrice }}
                    </span> -->
                    <span class="new-price">{{ product.price }}원</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Timer from './Timer'

export default {
    name: 'ProductItem',
    components: {
        Timer,
    },
    data() {
        return {
            getExistPId: null,
        }
    },
    props: ['product', 'className'],
    computed: {
        // cart() {
        //     return this.$store.getters.cart
        // },
    },
    methods: {
        quickView(e) {
            this.$emit('clicked')
        },
        // addToCart(item) {
        //     const product = [
        //         {
        //             id: item.id,
        //             name: item.name,
        //             price: item.price,
        //             image: item.image,
        //             quantity: 1,
        //         },
        //     ]

        //     if (this.cart.length > 0) {
        //         let id = item.id
        //         this.getExistPId = id
        //         let cartIndex = this.cart.findIndex((cart) => {
        //             return cart.id == id
        //         })

        //         if (cartIndex == -1) {
        //             this.$store.dispatch('addToCart', product)
        //             this.$toast('Added to cart', {
        //                 icon: 'fas fa-cart-plus',
        //             })
        //         } else {
        //             this.$store.dispatch('updateCart', {
        //                 id,
        //                 unit: 1,
        //                 cart: this.cart,
        //             })
        //             this.$toast.info('Already added to the cart and update with one')
        //         }
        //     } else {
        //         this.$store.dispatch('addToCart', product)
        //         this.$toast('Added to cart', {
        //             icon: 'fas fa-cart-plus',
        //         })
        //     }
        // },
    },
}
</script>
<style scoped>
    .main_description {
        display:flex;
        justify-content: space-between;
    }
    .product-image{
        vertical-align: middle;
        align-content: center;
        text-align: center;
    }

    .product-content{
        text-align:left;
        width:100%;
    }

    .product-image img{
        width: 100%;
        height: 300px;
    }

</style>