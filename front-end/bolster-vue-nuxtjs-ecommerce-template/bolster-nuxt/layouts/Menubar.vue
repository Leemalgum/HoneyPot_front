<template>
    <div>
        <div :class="['navbar-area']">
            <div class="comero-nav">
                <div class="container">
                    <nav class="navbar navbar-expand-md navbar-light">
                        <nuxt-link class="navbar-brand" to="/">
                            <img
                                src="../assets/img/honeypotLogo.png"
                                alt="logo"
                                style="width: 100px; height: auto;"/>
                        </nuxt-link>

                        <b-navbar-toggle target="navbarSupportedContent"></b-navbar-toggle>

                        <b-collapse
                            class="collapse navbar-collapse"
                            id="navbarSupportedContent"
                            is-nav="is-nav">
                            <div class="search-bar">
                                <input type="text" placeholder="판매자나 상품명을 검색해 보세요." class="search-input"></div>
                            <div class="others-option">
                                <div class="option-item">
                                    <nuxt-link to="/login">구독</nuxt-link>
                                </div>
                                <div class="option-item">
                                    <nuxt-link to="/login">판매하기</nuxt-link>
                                </div>
                                <div class="option-item">
                                    <nuxt-link to="/mypage-main">마이페이지</nuxt-link>
                                </div>
                                <div class="option-item">
                                    <nuxt-link to="/login">로그아웃</nuxt-link>
                                </div>
                            </div>
                        </b-collapse>
                    </nav>
                </div>
                <hr class="footer-line"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {components: {}, data() {}, mounted() {}, computed: {}, methods: {}}
</script>
<style scoped="scoped">
.search-bar {
    border-radius: 50px;
    background-color: #fff;
    /* 흰색 배경 */
    padding: 10px 20px;
    border: 1px solid #ccc;
    /* 회색 테두리 */
    margin-top: 10px;
}

.search-input {
    width: 300px;
    /* 고정된 너비 */
    border: none;
    background: transparent;
    outline: none;
    font-size: 16px;
}

.search-input::placeholder {
    color: #999;
}

.others-option {
    margin-top: 10px;
}
</style>
<!--이맑음 작성-->
