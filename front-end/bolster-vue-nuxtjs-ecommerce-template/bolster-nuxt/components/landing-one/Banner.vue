<template>
    <!-- Start Main Banner Area -->
    <!-- 배너 입찰 많은 순으로 -->

    <div class="home-slides owl-carousel owl-theme">
        <carousel
            :autoplay = true
            :autoplayTimeout = 3000
            :navigationEnabled = "true"
            navigationNextLabel="<i class='fas fa-arrow-right'></i>"
            navigationPrevLabel="<i class='fas fa-arrow-left'></i>"
            :paginationEnabled = true
            :perPage="1"
        >
        <slide v-for="(slide, index) in slides" :key="index">
            <nuxt-link :to="'/bid-details/' + 1">
                <!-- ${product.product_Id} -->
            <div :class="'main-banner item-bg' + (index + 1)">
                    <div class="d-table">
                        <div class="d-table-cell">
                            <div class="container">
                                <div class="main-banner-content">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nuxt-link>
        </slide>
    </carousel>
</div>

            
    <!-- End Main Banner Area -->
</template>

<script>
export default {
    name: 'Banner',
    data(){
        return{
            slides: [
                {
                    id: 1,
                    image: require('../../assets/img/main-banner1.jpg')
                },
                {
                    id: 2,
                    image: require('../../assets/img/main-banner2.jpg')
                },
                {
                    id: 3,
                    image: require('../../assets/img/main-banner3.jpg')
                },
                {
                    id: 4,
                    image: require('../../assets/img/main-banner4.jpg')
                },
                {
                    id: 5,
                    image: require('../../assets/img/main-banner5.jpg')
                },
                {
                    id: 6,
                    image: require('../../assets/img/main-banner6.jpg')
                },
            ]
        }
    }
}
</script>
<style scoped>

.main-banner:hover {
    cursor: pointer;
}
.home-slides {
    width: 100%;
}

.main-banner {
    height: 500px;
}


</style>