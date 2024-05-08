<template>
    <div class="container">
        <div class="wrapper">
            <div class="content">
                <div class="sidebar">
                    <Sidebar />
                </div>
                <div class="stock-request">
                    <div class="header">
                        <h4>상품 등록</h4>
                    </div>
                    <hr class="section-divider" />
                    <form @submit.prevent="submitForm">
                        <div class="inline-control">
                            <label for="productName">상품명:</label>
                            <input type="text" id="productName" v-model="product.name" required>
                        </div>
                        <div class="price-control">
                            <label for="priceUnit">호가 단위:</label>
                            <button @click="decrementPriceUnit">-</button>
                            <input id="priceUnit" type="number" v-model.number="product.priceUnit">
                            <button @click="incrementPriceUnit">+</button>
                        </div>
                        <div class="price-control">
                            <label for="buyNow">즉시 구매가:</label>
                            <button @click="decrementBuyNow">-</button>
                            <input id="buyNow" type="number" v-model.number="product.buyNowPrice">
                            <button @click="incrementBuyNow">+</button>
                        </div>
                        <div class="price-control">
                            <label for="startingBid">경매 시작가:</label>
                            <button @click="decrementStartingBid">-</button>
                            <input id="startingBid" type="number" v-model.number="product.startingBid">
                            <button @click="incrementStartingBid">+</button>
                        </div>

                        <div class="image-upload-header">
                            <label>이미지 업로드:</label>
                            <button @click="addImage" v-if="images.length < 5">+ 추가</button>
                        </div>
                        <div class="image-upload-list">
                            <div v-for="(image, index) in images" :key="index" class="image-upload-control">
                                <input :key="imageKeys[index]" type="file" @change="onFileChange($event, index)"
                                    accept="image/*">
                                <button v-if="image" @click="cancelImageUpload(index)">x</button>
                            </div>
                        </div>


                        <div>
                            <label>상품 상세 설명:</label>
                            <TinyMCEEditor />
                        </div>
                        <button type="submit">상품 등록</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script>
import Sidebar from '../components/all-products/Sidebar'
import TinyMCEEditor from '~/components/TinyMCEEditor'

 
export default {
  components: { 
    TinyMCEEditor,
    Sidebar
  },
  data() {
    return {
      product: {
        name: '',
        buyNowPrice: 0,
        startingBid: 0,
        priceUnit:0,
        description: ''
      },
      images: ['', ''],
      imageKeys: [0, 0, 0, 0, 0],
      content: '',
      editorOptions: {}
    };
  },
  
  methods: {
    submitForm() {
      console.log('Submitted:', this.product);
      alert('상품이 등록되었습니다!');
    },
    incrementBuyNow() {
      this.product.buyNowPrice += 1000;
    },
    decrementBuyNow() {
      this.product.buyNowPrice = Math.max(0, this.product.buyNowPrice - 1000);
    },
    incrementStartingBid() {
      this.product.startingBid += 1000;
    },
    decrementStartingBid() {
      this.product.startingBid = Math.max(0, this.product.startingBid - 1000);
    },
    incrementPriceUnit() {
      this.product.priceUnit += 1000;
    },
    decrementPriceUnit() {
      this.product.priceUnit = Math.max(0, this.product.priceUnit - 1000);
    },
    addImage() {
      if (this.images.length < 5) {
        this.images.push('');
      }
    },
    cancelImageUpload(index) {
        this.$set(this.images, index, '');
        this.imageKeys[index]++;
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    onFileChange(event, index) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$set(this.images, index, e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.$set(this.images, index, '');
      }
    }
  }
}
</script>

<style scoped>
.wrapper .content {
  display: flex;
  width: 100%;
}

.sidebar {
  flex: 1;
}

.section-divider {
  margin-top: 10px;
  border: 1px solid #ccc;
}

.stock-request {
  flex: 3;
  padding: 5px;
  }

  button {
    background-color: white; /* 배경 색상 변경 */
    color: black; /* 글자 색상 변경 */
    border: 1px solid #ccc; /* 테두리 추가 */
    padding: 5px 15px;
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 15px;
}

button:hover {
    background-color: #f0f0f0; /* 호버 시 배경 색상 변경 */
}

input[type="text"], input[type="number"], input[type="file"] {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
}

label {
    margin: 10px 0;
    display: block;
    font-weight: bold;
    font-size: medium;
}

textarea {
  width: 100%; /* 너비 설정 */
  height: 150px; /* 높이 설정 */
  padding: 8px; /* 패딩 설정 */
  border-radius: 5px; /* 경계선 둥글게 설정 */
  border: 1px solid #ccc; /* 테두리 설정 */
}
.inline-control {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.inline-control label, .image-upload-control label {
    white-space: nowrap;
    margin-right: 10px;
}

.image-upload-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px; /* 파일 입력 리스트와의 간격 조정 */
}

.image-upload-list {
    display: flex;
    flex-direction: column; /* 파일 입력 필드를 세로 방향으로 배열 */
}

.image-upload-control {
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 파일 입력과 취소 버튼을 왼쪽으로 정렬 */
    margin-bottom: 5px; /* 각 파일 입력란 간의 간격 조정 */
}

.image-upload-control input[type="file"] {
    flex-grow: 1;
    margin-right: 10px; /* 파일 선택과 제거 버튼 사이의 간격 */
}



.price-control {
  display: flex; /* Enables flexbox layout */
  align-items: center; /* Vertically centers the items in the line */
  justify-content: start; /* Aligns items to the start of the flex container */
}

.price-control label {
  white-space: nowrap; /* Prevents the label from wrapping */
  margin-right: 10px; /* Right margin for spacing between label and buttons */
}

.price-control input[type="number"] {
  flex-grow: 1; 
  width: 60%;
  margin: 0 5px; 
}
.stock-request button[type="submit"] {
    background-color: #ffb400; /* 노란색 배경 */
    color: white; /* 흰색 글씨 */
    width: 100%; /* 가로 길이를 최대로 설정 */
    padding: 10px 0; /* 상하 패딩 추가 */
    font-size: 16px; /* 폰트 크기 조정 */
}


</style>
