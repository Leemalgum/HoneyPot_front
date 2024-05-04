<template>
    <div>
        <TopHeader />
        <Menubar />
        <!-- Start Page Title Area -->
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li><nuxt-link to="/">메인페이지</nuxt-link></li>
                    <li>결제페이지</li>
                </ul>
            </div>
        </div>
        <CartItems />
        <CheckoutItem />
    </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
// import CartItems from '../components/cart/CartItems'
// import CheckoutItem from '../components/cart/CheckoutItem';
import CheckoutItem from '../components/cart/honeyCheckoutItem';
export default {
    components: {
        TopHeader,
        Menubar,
        // CartItems,
        CheckoutItem,
        
    }
}
</script>