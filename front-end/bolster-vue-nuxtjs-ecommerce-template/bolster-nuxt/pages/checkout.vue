<template>
    <div>
        <TopHeader />
        <Menubar />
        <CheckoutItem />
    </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import CheckoutItem from '../components/cart/CheckoutItem';
export default {
    components: {
        TopHeader,
        Menubar,
        CheckoutItem,
    }
}
</script>