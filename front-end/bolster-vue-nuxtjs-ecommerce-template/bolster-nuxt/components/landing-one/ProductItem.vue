<template>
    <div :class="className">
        <div class="single-product-box">
            <div class="product-image">
                <div class="image-wrapper">
                <nuxt-link :to="`/products-details/${product.id}`">
                    <img :src="product.image" :alt="product.name" class="product-image" />
                </nuxt-link>
            </div>
            </div>

            <div class="product-content">
                <h3>
                    <nuxt-link :to="`/products-details/${product.id}`">
                        {{ product.name }}
                    </nuxt-link>
                </h3>
                <div>
                    <div style="display: flex; justify-content: space-between;">
                        <div style="margin-right: auto; font-size: 16px; font-weight: bold; color: black;">
                            {{ product.price }}
                        </div>
                        <div style="margin-left: auto; color: gray;">
                            입찰 건
                        </div>
                    </div>
                    <div style="display: flex; color: gray; justify-content: space-between;">
                        <div style="margin-right: auto;" v-if="showBuyNow">
                            또는 즉시 구매
                        </div>
                        <div style="margin-left: auto;">
                            남은 시간
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ProductItem',
    components: {
    },
    data() {
        return {
            showBuyNow: true,
        }
    },
    props: ['product', 'className'],
    computed: {
    },
}
</script>


<style scoped>
.product-image {
    position: relative;
    overflow: hidden;
}

.image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 123.08%;
    background-color: white;
}

.product-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>