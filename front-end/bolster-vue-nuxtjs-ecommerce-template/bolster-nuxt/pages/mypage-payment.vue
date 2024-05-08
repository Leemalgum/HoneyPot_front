<template>
    <div class="container">
        <div class="wrapper">
            <div class="content">
                <div class="sidebar">
                    <Sidebar />
                </div>
                <div class="payment-data">
                    <div class="header">
                        <h4>결제 수단 관리</h4>
                    </div>
                    <hr class="section-divider" />
                    <div class="payment-management">
                        <div class="payment-header">
                            <h5>결제 수단 추가/변경</h5>
                            <button @click="openAddModal" class="add-payment-button">결제 수단 추가</button>
                        </div>
                        <!-- Modal for Adding Payment Method -->
                        <div v-if="showModal" class="modal">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5>카드 등록하기</h5>
                                    <span @click="showModal = false" class="close">&times;</span>
                                </div>
                                <form @submit.prevent="addPaymentMethod">
                                    <div class="form-group">
                                        <label for="card-number">카드 번호</label>
                                        <input type="text" id="card-number" v-model="cardNumber" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="validity-period">유효기간</label>
                                        <input type="text" id="validity-period" v-model="paymentType" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="birth-date">생년월일 6자리</label>
                                        <input type="text" id="birth-date" v-model="paymentType" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="card-password">카드 비밀번호</label>
                                        <input type="text" id="card-password" v-model="paymentType" required>
                                    </div>
                                    <button type="submit" class="btn-change">추가</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script>
  import Sidebar from '../components/all-products/Sidebar'
  
  export default {
    components: {
      Sidebar
    },
    data() {
    return {
      showModal: false,
      rawCardNumber: ''
    }
    },
    // watch: {
    // cardNumber(value) {
    //   this.cardNumber = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    // }
    // },
    computed: {
    cardNumber: {
      get() {
        // 사용자에게 보여지는 형식
        let numbers = this.rawCardNumber.replace(/\D/g, '');
        if (numbers.length > 4) {
          numbers = numbers.replace(/^(.{4})(.{4})(.{4})(.*)$/, "$1 $2 $3 $4");
          numbers = numbers.substring(0, 19).split(' ').map((part, index) => {
            if (index === 1 || index === 2) return '****'; // 중간 8자리를 ****로 마스킹
            return part;
          }).join(' ');
        }
        return numbers;
      },
      set(value) {
        this.rawCardNumber = value;
      }
    }
  },
    methods: {
    openAddModal() {
      this.showModal = true;
    },
    addPaymentMethod() {
      // 로직을 구현하세요 (API 호출 등)
      alert('결제 수단이 추가되었습니다.');
      this.encryptAndSendData();
      this.showModal = false;  // 모달 닫기
    },
    encryptAndSendData() {
      // 입력된 데이터 암호화 (여기에 암호화 로직 추가)
      const encryptedData = this.encryptCardNumber(this.cardNumber);
      console.log('Encrypted Data:', encryptedData); // 실제 프로덕션에서는 로깅을 사용하지 마세요.
      alert('결제 수단이 추가되었습니다.');
    },
    encryptCardNumber(number) {
      // 여기에 암호화 라이브러리를 사용하는 코드 추가
      return number; // 단순 예시로, 실제 암호화된 값 반환
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
  
  .payment-data {
    flex: 3;
    padding: 5px;
  }

  .payment-header {
    margin-bottom: 20px;
    display: flex;
  justify-content: space-between;
  align-items: center;
  }
  
  .section-divider {
    margin-top: 10px;
    border: 1px solid #ccc;
  }

  .add-payment-button {
    background-color: #ffb400;
    color: white;
    border: none;
    padding: 7px 20px;
    border-radius: 30px;
    cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn-change {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #ffb400;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.close {
  float: right;
  font-size: 28px;
  cursor: pointer;
}
</style>
  