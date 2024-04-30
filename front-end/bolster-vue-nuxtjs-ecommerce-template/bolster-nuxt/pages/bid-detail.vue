<template>
    <div>
        <Menubar />
        <div class="bid-details-content">
            <!-- 상품 메인 이미지 및 상세 이미지 -->
            <div class="product-layout">
                <div class ="product-name">
                    <h2><b>장원영 포토카드</b></h2>
                </div>
                <div class="main-image-layout">
                    <div class="product-main-image">
                    </div>
                </div>
                <div class="product-detail-image-list">
                    <div v-for="(index) in 4" :key="index" class="product-detail-image">
                    </div>
                </div>
            </div>       

        <!-- 상품 상세 설명 -->
        <div class ="product-details">
            <div class="timer">
                    <b>5 Days 12:00:51</b>
            </div>
             <!-- 타이머 기능 추후 구현 -->
            <div class="description">
                <table>
                    <tr>
                        <td><b>판매자</b></td>
                        <td style="padding-left: 300px;">최소원</td>
                        <!-- {{seller_id}} -->
                    </tr>
                    <tr>
                    <td><b>시작가</b></td>
                    <td style="padding-left: 300px;">25000원</td>
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
                    <div class="item">
                        <button class="btn-bid" @click="bid" v-bind:disabled="agree==false">입찰하기</button>
                        <!-- <a href="#" class="btn btn-bid">입찰하기</a> -->
                    </div>

                    <div class="wishlist-btn">
                        <a href="#" class="btn btn-wish">
                            <i class="far fa-heart" style="color:red">
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
                원영이 팬싸인회에서 추첨받은 포토카드입니다. 
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

    </div>
</template>

<script>

export default {

    data(){
        return {
            getExistPId: false,
            quantity: 1,
            agree:false //체크박스 상태 저장
        }
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
            // 입찰 페이지 이동
            if (this.agree) {
                //'/bid'로 이동하도록 설정
                //  this.$router.push('/bid'); 
            } else {
                // 체크되어 있지 않다면 알림 메시지 표시
                this.$toast.warning("이용약관에 동의해주세요.");
            }
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
    justify-content: center;
}

.product-layout{
    justify-content: center;
    text-align:center;
    align-items: center;
    align-content: center;
    margin-right:150px;
   
}

.product-name {
    margin-top : 50px;
    margin-bottom: 50px;
}

.main-image-layout {
    justify-content: center;
    display: flex;
}

.product-main-image{
    width: 600px;
    height: 600px;
    background-color:lightgrey;
    margin-bottom: 10px;
}

.product-detail-image-list{
    display:flex;
    justify-content : center;
}

.product-detail-image{
    width: 100px;
    height: 100px;
    background-color:lightgrey;
    margin: 20px;
    justify-content : center;
}



.timer {
    font-size: 80px;
    margin-bottom:100px;
}

.product-details {
    justify-content: center;
    text-align:center;
    align-items: center;
    align-content: center;
}

.description{
    align-content: center;
    line-height: 50px;
    font-size: 20px;
}

.td {
    padding-right:200px;
}

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
    margin-top:50px
}

.btn-wish {
    background-color: white;
    width: 200px;
    height: 50px;
    font-size: 20px;
    align-content: center;
    border:black solid 1px;
}

.wished {
    background-color: white;
    width: 200px;
    height: 50px;
    font-size: 20px;
    align-content: center;
    border:black solid 1px;
}

.btn-bid {
    background-color:#ffb400;
    width: 500px;
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

</style>