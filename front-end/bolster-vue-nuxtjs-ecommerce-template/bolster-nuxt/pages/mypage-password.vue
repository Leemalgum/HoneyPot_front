<template>
    <div class="container">
      <div class="wrapper">
        <div class="content">
          <div class="sidebar">
            <Sidebar />
          </div>
          <div class="user-data">
            <div class="header">
              <h4>회원 정보 관리</h4>
            </div>
            <hr class="section-divider" />
            <div class="password-change">
              <div class="password-header">
                <h5>비밀번호 변경</h5>
              </div>
              <form @submit.prevent="changePassword">
                <div class="form-group">
                  <label for="current-password">현재 비밀번호</label>
                  <input type="password" id="current-password" v-model="currentPassword" required>
                </div>
                <div class="form-group">
                  <label for="new-password">새 비밀번호</label>
                  <input type="password" id="new-password" v-model="newPassword" required>
                </div>
                <div class="form-group">
                  <label for="confirm-password">새 비밀번호 확인</label>
                  <input type="password" id="confirm-password" v-model="confirmPassword" required>
                </div>
                <button type="submit" class="btn-change">비밀번호 변경</button>
              </form>
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
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    methods: {
      changePassword() {
        // 비밀번호 변경 로직을 여기에 추가하세요.
        alert("비밀번호 변경 요청이 처리되었습니다.");
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
  
  .user-data {
    flex: 3;
    padding: 5px;
  }

  .password-header {
    margin-bottom: 20px;
  }
  
  .section-divider {
    margin-top: 10px;
    border: 1px solid #ccc;
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
  </style>
  