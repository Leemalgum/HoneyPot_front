<template>
  <div class="container">
    <div class="wrapper">
      <div class="content">
        <div class="sidebar">
          <Sidebar />
        </div>
        <div class="address-container">
          <div class="header">
            <h4>회원 정보 관리</h4>
          </div>
          <hr class="section-divider" />
          <div class="address-management">
            <div class="address-header">
              <h5>배송지 관리</h5>
              <button @click="openAddModal" class="add-address-button">배송지 추가</button>

            </div>
            <div class="address-info">
              <div v-for="(address, index) in addresses" :key="address.id" class="address-item">
                <div class="address-details">
                  <h6>{{ address.name }}</h6>
                  <p>{{ address.recipient }} {{ address.phone }}
                  <br>{{ address.address }}, {{ address.details }} [{{ address.postcode }}]</p>
                </div>
                <div class="button-group">
                  <button @click="openEditModal(address)" class="edit-button">수정</button> 
                  
                  <button @click="deleteAddress(index)" class="delete-button">삭제</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5>{{ isEdit ? '배송지 수정' : '배송지 추가' }}</h5>
          <span @click="closeModal" class="close">&times;</span>
        </div>

        <form @submit.prevent="submitForm" class="modal-form">
          <div class="form-group">
            <p></p>
            <label for="postcode">우편번호</label>
            <div class="input-group">
              <input id="postcode" v-model="address.postcode" type="text" disabled>
              <button @click.prevent="openPostcodeFinder" class="colored-button">우편번호 찾기</button>
            </div>
          </div>
          <div class="form-group">
            <label for="address">주소지</label>
            <input id="address" v-model="address.address" type="text" disabled>
          </div>
          <div class="form-group">
            <label for="details">상세주소</label>
            <input id="details" v-model="address.details" type="text">
          </div>
          <div class="form-group">
            <label for="name">배송지명</label>
            <input id="name" v-model="address.name" type="text">
          </div>
          <div class="form-group">
            <label for="recipient">수령인</label>
            <input id="recipient" v-model="address.recipient" type="text">
          </div>
          <div class="form-group">
            <label for="phone">휴대폰</label>
            <input id="phone" v-model="address.phone" type="text">
          </div>
          <button type="submit" class="colored-button" >{{ isEdit ? '수정하기' : '등록하기' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/all-products/Sidebar';

export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => console.log('카카오 우편번호 서비스 로드 완료');
    document.head.appendChild(script);
  },
  computed: {
  isFormValid() {
    const valid = this.address.name && this.address.recipient && this.address.phone &&
           this.address.address && this.address.details && this.address.postcode;
    console.log('isFormValid:', valid); // 디버깅 메시지
    return valid;
  }
  },
  components: {
    Sidebar
  },
  data() {
    return {
      showModal: false,  // 모달 표시 상태를 제어하는 데이터 속성
      addresses: [],     // 이 배열은 주소 데이터를 저장합니다.
      address: {
        postcode: '',
        address: '',
        details: '',
        name: '',
        recipient: '',
        phone: ''
      },
      isEdit: false      // 편집 상태 여부
    };
  },
  methods: {
    openAddModal() {
      if (this.addresses.length >= 3) {
      alert('최대 3개의 주소만 등록할 수 있습니다.');
      return;
    }
      this.isEdit = false;
      this.clearAddress();
      this.showModal = true;  // 모달 열기
    },
    openEditModal(selectedAddress) {
      this.isEdit = true;
      this.address = { ...selectedAddress };  // 선택한 주소 정보를 모달에 로드
      this.showModal = true;
    },
    deleteAddress(index) {
      this.addresses.splice(index, 1);  // 주소 삭제 로직
    },
    closeModal() {
      this.showModal = false;  // 모달 닫기
    },
    openPostcodeFinder() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.address.postcode = data.zonecode;
          this.address.address = data.address;
        }
      }).open();
    },
    submitForm() {
      console.log('submitForm called'); // 디버깅 메시지
      if (!this.isFormValid) {
      alert('모든 내용을 작성해야 합니다.');
      return;
    }
      if (this.isEdit) {
      // 수정 로직
      const index = this.addresses.findIndex(a => a.id === this.address.id);
      if (index !== -1) {
        this.addresses.splice(index, 1, { ...this.address });
      }
    } else {
      // 추가 로직
      this.address.id = Date.now();  // 간단한 ID 생성 로직
      this.addresses.push({...this.address});

    }
    this.closeModal();
    },
    updateAddress() {
      // 주소 업데이트 로직
    },
    addAddress() {
      this.addresses.push({ ...this.address });  // 주소 추가 로직
    },
    clearAddress() {
      this.address = {
        postcode: '',
        address: '',
        details: '',
        name: '',
        recipient: '',
        phone: ''
      };
    },

  }
};
</script>

<style scoped>


.wrapper .content {
  display: flex;
  width: 100%;
}

.sidebar {
  flex: 1;
}

.address-container {
  flex: 3;
  padding: 5px;
  
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.address-info {
  font-size: 16px; 
  color: #333;
}

.address-item {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.edit-button, .delete-button {
  font-size: 14px;
  margin-top: 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
}

.section-divider {
  margin-top: 10px;
  border: 1px solid #ccc;
}
.add-address-button {
  background-color: #ffb400;
  color: white;
  border: none;
  padding: 7px 20px;
  border-radius: 30px;
  cursor: pointer;
}
.button-group {
  display: flex;
  justify-content: flex-end;
}


/* .address-item button {
  background-color: #ffb400; 
  color: white; 
  border: none; 
  border-radius: 10px; 
  margin: 5px;
  padding: 5px 10px;
} */


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  max-width: 600px;
  box-shadow: none;
}

.close {
  float: right;
  font-size: 28px;
  cursor: pointer;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  margin-bottom: 5px;
}

.input-group {
  display: flex;
}

input[type="text"], .colored-button {
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: none;
}

input[type="text"] {
  flex: 1;
  margin-right: 10px;
}
.colored-button {
  background-color: #ffb400;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  /* 추가적으로 !important를 사용해 강제 적용을 시도할 수 있습니다 */
  /* background-color: #ffb400 !important;
  color: white !important; */
}

/* .text-button {
  background: none;
  border: none;
  color: black;
  cursor: pointer;
} */

  </style>
