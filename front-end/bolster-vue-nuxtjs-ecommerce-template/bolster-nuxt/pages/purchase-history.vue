<template>
     <div class="container">
        <div class="wrapper">
            <div class="content">
                <div class="sidebar">
                    <Sidebar/>
                </div>
                <div class="cart-items">
                    <PurchaseList />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Sidebar from '../components/all-products/Sidebar'
    import PurchaseList from '../components/cart/PurchaseList'

    export default {
        components: {
            Sidebar,
            PurchaseList
        }
    }
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
}

.content {
    display: flex;
}

.sidebar {
    flex: 0 0 25%; /* 사이드바 너비 */
}

.cart-items {
    flex: 1; /* 카트 아이템이 나머지 공간을 채움 */
}
</style>
