<template>
    <div class="container">
        <div class="bid-details-content">
            <!-- 상품 메인 이미지 및 상세 이미지 -->
            <div class="product-layout">
                    <div class="product-main-image">
                        <img class="main-image" :src="product.image" alt="Product Image">
                    </div>
                    <div class="product-detail-image-list">
                        <img v-for="(image, index) in product.image.slice(0,4)" :key="index" :src="product.image" alt="Product Image" class="product-detail-image">                            <!-- <img :src="product.image"> -->
                        <!-- </div> -->
                    </div>
            </div>      
            

            <!-- 상품 상세 설명 -->
            <div class ="product-details">
                <div class="timer">
                    <b>5 Days 12:00:51</b>
                </div>
             <!-- 타이머 기능 추후 구현 -->
               
             <div class="description">
                    <div class ="product-name">
                            <b>{{product.name}}</b>
                    </div>
                    <hr>
                    <table>
                        <tr>
                            <td><b>판매자</b></td>
                            <td style="padding-left: 300px;">{{product.Id}}</td>
                            <!-- {{seller_id}} -->
                        </tr>
                        <tr>
                        <td><b>시작가</b></td>
                        <td style="padding-left: 300px;">{{product.price}}</td>
                    <!-- {{start_price}}원 -->
                    
                        </tr>
                        <td><b>현재가</b></td>
                        <td style="padding-left: 300px;">40000원</td>
                            <!-- {{price}}원 -->
                        
                        <tr>
                            <td><b>즉시 판매가</b></td>
                            <td style="padding-left: 300px;">50000원</td>
                            <!-- {{buy_now}}원 -->
                        </tr>
                    </table>
                </div>
    

            <div class="caution">
                <!-- 이용약관-->
                <b>주의사항</b>
                <hr>
                <div class="terms">
                    <span>제 1항</span>
                </div>
                <div class="confirm">
                    <input class="inp-cbx" id="cbx" type="checkbox" v-model="agree">
                    <label class="cbx" for="cbx">
                        <span>
                            <svg width="12px" height="10px" viewbox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg>
                        </span>
                        <span>이용약관을 확인하였으며 이에 동의합니다.</span>
                    </label>
                </div>
            </div>

            <div class="buttons">

                        <button class="btn-bid" @click="bid" :disabled="!agree" >입찰하기</button>
                        <!-- <a href="#" class="btn btn-bid">입찰하기</a> -->
                    <div class="wishlist-btn">
                        <a href="#" class="btn-wish">
                            <i class="far fa-heart" style="color:red; text-align:center">
                            </i>
                        </a>
                        <div style="text-align: right; vertical-align:bottom; margin-top:20px;">
                            <span class="views">조회수</span>
                            <span>2000</span>
                        </div>
                    </div>
                </div>
                </div>
                </div>

 

        <div class="text-description">
            <b><h2>제품설명</h2></b>
            <div class="detail-desciprtion-text">
                <!-- 상품 상세 설명 추가 -->
                {{product.details}}
            </div>
        </div>

        <div class="detail-image-description">
            <div>
                <div class="big-detail-image-list">
                    <div v-for="(index) in 2" :key="index" class="detail-big-image">
                    </div>
                    <button class="more-button" @click="more">더보기</button>
                </div>
            </div>
        </div>

        <div class="bid-modal" v-if="bidCheck == true" >
                            <div class="bid-modal-container">
                                    <div class = "label" style="display: flex; justify-content: space-around;" >
                                        <div class="input-label">
                                            현재 최고가
                                        </div>
                                        <div class="input">
                                            {{price}} 원
                                        </div>
                                    </div>
                                    <div class = "label" style="display: flex; justify-content: space-around;" >
                                        <div class="input-label">
                                            호가 단위 입찰
                                        </div>
                                        <div class="input" style= " display: flex; justify-content:space-around; text-align:right" >
                                            <button class="minus" @click="bid" >-</button>
                                            <div class="price">
                                                <!-- {{price%10}} -->
                                            </div>
                                            <button class="plus" @click="plus" >+</button>
                                            원
                                        </div>
                                    </div>
                                    <div class = "label" style="display: flex; justify-content: space-around;" >
                                        <div class="input-label">
                                            총 금액
                                        </div>
                                        <div class="input">
                                            {{price}} 원
                                        </div>
                                    </div>
                                    <div class="modal-btn" style="display:flex;" >
                                        <button class="btn-bid-confirm" @click="bidConfirm">입찰</button>
                                        <button class="btn-bid-cancel" @click="bidCancel">취소</button>
                                </div>
                               </div>
                               </div>


    </div>
</template>

<script>

export default {
    data(){
        return {
            getExistPId: false,
            quantity: 1,
            agree:false, //체크박스 상태 저장
            product: null,
            bidCheck:false,
            price: 16000,
        }
    },
    created() {
        // 동적 라우트 매개변수인 상품 ID를 가져옵니다.
        const productId = this.$route.params.id;
        // Vuex 스토어에서 해당 상품을 조회합니다.
        this.product = this.$store.state.products.all.find(product => product.id === parseInt(productId));
    }, 
    props: ['product_id', 'product_name', 'price', 'image1', 'image2', 'image3','image4' ],
    computed: {
        
    },
    methods: {
       
        timer() {
            const timer = new Timer({
            label: 'test-timer',
            // 추후 경매 시작 시간으로 수정
            startTimestamp: 1563074001233 // 2024-04-27 11:13:21.233Z
            });
        },

        more() {
            //더보기 버튼 누르면 이미지 출력
        },

        bid() {
            this.bidCheck=true;
            // 입찰 페이지 이동
        },

        bidCancel() {
            this.bidCheck = false;
        },

        wish(){
            this.isWished = !this.isWished;
        }

    }
}
</script>

<style scoped>

.bid-details-content {
    display: flex;
    width: 100%;
}

.product-layout{
    margin-right: 50px;
    width: 100%;
}

.product-name {
    padding-bottom: 10px;
    font-size: 30px;
    text-align:left;
}

.tr{
    font-size: 30px;

}

.main-image-layout {
    justify-content: center;
    display: flex;
}

.product-main-image{
    padding-top: 50px;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-image {
    max-width: 500px;
    max-height: 500px;
}

.product-detail-image-list{
    display:flex;
    justify-content: space-around;
}

.product-detail-image{
    width: 15%; /* 이미지 너비를 조정합니다. */
    max-height: 100%; /* 최대 높이를 100%로 설정하여 비율을 유지합니다. */
    object-fit: contain;
}

.timer {
    font-size: 50px;
    margin-bottom:20px;
    margin-top: 80px;
    text-align: right;
}

.product-details {
    justify-content: center;
    text-align:center;
    align-items: center;
    align-content: center;
    width: 50%;
}

/* .description{
    text-align: left;
    line-height: 50px;
    font-size: 15px;
    width: 50%;
} */



.caution{
    margin-top:30px;
    text-align: left;
}

.terms {
    width: 800px;
    height: 100px;
}

.confirm {
    justify-content: center;
    align-content: center;
    font-size:20px;
    text-align: center;
}
.buttons {
    display: flex;
    justify-content: space-around;
    margin-top:50px;
    width:100%;
}

.btn-wish {
    background-color: white;
    width: 50px;
    height: 50px;
    font-size: 20px;
    align-content: center;
    border:black solid 1px;
    text-align:center;
}
.btn-bid {
    background-color:#ffb400;
    width: 50%;
    height: 50px;
    color:white;
    font-size: 20px;
    border:#ffb400 solid 1px;
}

.text-description{
    justify-content : center;
    align-items: center;
    text-align:center;  
    margin-top: 100px;
    margin-bottom:30px;
}

.detail-desciprtion-text {
    margin-top: 30px;
}


.detail-image-description {
    display:flex;
    justify-content : center;
    align-items: center;
    text-align:center;   
}

.big-detail-image-list {
    justify-content : center;
}

.detail-big-image {
    width: 1000px;
    height: 1000px;
    background-color:lightgrey;
    margin: 100px;
}


.more-button {
    width: 500px;
    height:60px;
    background-color: white;
    border: 1px solid #ddd;
    color: black;
}

.bid-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.bid-modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  width: 600px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.label {
    justify-content: space-around;
}

.input-label{
    text-align:left;
    width: 50%;
    margin-bottom: 30px;
}
.input{
    text-align:right;
    width: 50%;
}

.btn-bid-confirm {
    background-color:#ffb400;
    color:white;
    font-size: 20px;
    border:#ffb400 solid 1px;
    width: 50%;
}

.btn-bid-cancel {
    background-color:white;
    color:black;
    font-size: 20px;
    border:white solid 1px;
    width: 50%;
}

.wishlist-btn {
    text-align:center;
}
</style>