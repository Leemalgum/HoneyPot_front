<template>
    <div>
        <h4>마이페이지</h4>
        <hr>
        <div>
            <h5>계정 관리</h5>
            <ul style="list-style-type: none;">
                <li>
                    <a href="#">회원 정보 관리</a>
                </li>
                <li>
                    <a href="#">결제 수단 관리</a>
                </li>
            </ul>
        </div>
        <div>
            <h5>내역</h5>
            <ul style="list-style-type: none;">
                <li :class="{ active: isActive }">
                    <nuxt-link to="/purchase-history">구매 목록</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/sales-history">판매 목록</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/bid-history">입찰 목록</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isActive: Boolean
    }
}
</script>
<style scoped="scoped">
li {
    margin: 15px 0;
    font-size: 18px;
}

a {
    color: black;
}

.active,
a:hover {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    /* 호버시에 텍스트 그림자 효과 추가 */
}
</style>