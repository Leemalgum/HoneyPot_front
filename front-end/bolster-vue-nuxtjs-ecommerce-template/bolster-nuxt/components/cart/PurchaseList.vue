<template>
    <div class="container">
        <h4>구매 목록</h4>
        <form style="margin-top: 16px;">
            <div class="cart-table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr style="text-align: center;">
                            <th style="width: 40%;">상품정보</th>
                            <th style="width: 20%;">진행상태</th>
                            <th style="width: 20%;">배송상태</th>
                            <th style="width: 20%;">구매일자</th>
                        </tr>
                    </thead>

                    <tbody v-if="product.length > 0">
                        <tr v-for="(product, i) in product" :key="i" style="text-align: center;">
                            <td class="product-information" style="text-align: left;">
                                <nuxt-link :to="'/bid-details/' + product.id" class="product-detail">
                                    <div style="display: flex;">
                                        <div style="margin-right: 10px;">
                                            <img :src="product.image" width="60px" />
                                        </div>
                                        <div>
                                            <h6>
                                                {{ product.name }}
                                            </h6>
                                            {{ product.sellerId }}
                                            <br>
                                            {{ product.details }}
                                            <br>
                                            {{ product.price }}
                                        </div>
                                    </div>
                                </nuxt-link>
                            </td>

                            <td class="progress-status">
                                {{ product.progressStatus }}
                            </td>

                            <td class="delivery-status">
                                {{ product.deliveryStatus }}
                            </td>

                            <td class="purchase-date">
                                {{ product.purchaseDate }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 테스트용 데이터로 초기화된 cart 배열
            product: [
                {
                    id: 1,
                    sellerId: 'army82801',
                    name: 'BTS JIN PHOTOCARD',
                    details: 'PERMISSION TO DANCE ON STAGE  미니포카',
                    price: '27,000',
                    quantity: 2,
                    image: require('../../assets/img/jin.jpg'),
                    progressStatus: '결제완료',
                    deliveryStatus: '배송준비중',
                    purchaseDate: '2024.04.28'
                }, {
                    sellerId: 'army44t343',
                    name: 'BTS JIN PHOTOCARD',
                    details: 'PERMISSION TO DANCE ON STAGE  미니포카',
                    price: 20,
                    quantity: 1,
                    image: require('../../assets/img/jin.jpg'),
                    progressStatus: '결제완료',
                    deliveryStatus: '배송준비중',
                    purchaseDate: '2024.04.28'
                }
            ]
        }
    },
}
</script>
<style scoped="scoped">
.table td,
.table th {
    color: black;
}

.product-detail {
    color: black;
    cursor: default;
}

.product-detail:hover {
    cursor: pointer;
}
</style>