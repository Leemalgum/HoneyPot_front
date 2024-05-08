<template>
  <div class="container">
    <div class="wrapper">
      <div class="content">
        <div class="sidebar">
          <Sidebar />
        </div>
        <div class="user-info">
          <div class="header">
            <h4>프로필 관리</h4>
            <button @click="saveProfile" class="save-button">저장</button>
          </div>
          <hr class="section-divider" />
          <div class="profile-container">
            <div class="profile-pic">
              <!-- 이미지 또는 기본 이미지를 v-show로 제어 -->
              <img v-show="profileImage" :src="profileImage" alt="프로필 사진" class="image" />
              <div v-show="!profileImage" class="default-image"></div>
              <button class="upload-button" @click.stop="triggerUpload">+</button>
              <input type="file" ref="fileInput" @change="previewImage" style="display: none;" />
            </div>

            <input v-model="nickname" placeholder="닉네임" class="nickname-input" />
          </div>
          <hr class="section-divider" />
          <div class="interests">
            <button v-for="tag in tags" :key="tag" :class="{ 'selected': selectedTags.includes(tag) }"
              @click="toggleTag(tag)">
              {{ tag }}
            </button>
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
        defaultImage: require('@/assets/img/favicon-honeyPot.png'),
        profileImage: null,
        nickname: '',
        tags: ['BLACKPINK', 'IVE', 'NewJeans', '방탄소년단', 'TWICE', 'Stray Kids', '더보이즈', 'aespa', 'LE SSERAFIM', 'NMIXX', '에스파', '아이유', 'ITZY', 'ENHYPEN', 'TREASURE', 'G-IDLE', 'NCT', 'ATEEZ', '우주소녀', '몬스타엑스', 'SHINee', 'Kep1er', 'CIX', '레드벨벳', '오마이걸', '아이즈원', 'BOYNEXTDOOR', 'ZEROBASEONE', '소녀시대', '오렌지카라멜', 'VIVIZ'],
        selectedTags: []
      }
    },
    methods: {
      saveProfile() {
      // 프로필 저장 로직 구현
      console.log("프로필 정보 저장");
    },
      toggleTag(tag) {
        const index = this.selectedTags.indexOf(tag);
        if (index >= 0) {
          this.selectedTags.splice(index, 1);
        } else {
          if (this.selectedTags.length < 3) {
            this.selectedTags.push(tag);
          } else {
            alert('최대 3개까지만 선택 가능합니다!');
          }
        }
      },
      triggerUpload() {
        this.$refs.fileInput.click();
      },
      previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.profileImage = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    this.profileImage = this.defaultImage; // 파일이 없을 경우 기본 이미지 설정
  }
      },
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

  .user-info {
    flex: 3;
  padding: 5px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .save-button {
    background-color: #ffb400;
    color: white;
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  }

  .nickname-input {
    margin-left: 20px;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 200px;
  }

  .upload-button {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 30px;
    height: 30px;
    background-color: black;
    color: white;
    border-radius: 50%;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }

  .profile-container {
    display: flex;
    align-items: center;
    position: relative;
  }

  .profile-pic {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #dfdfdf;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-pic .default-image {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/favicon-honeyPot.png');
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
  }
  .image {
    width: 100%;
    height: 100%;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
  }

  .interests {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  .interests button {
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: white;
    color: black;
  }

  .interests .selected {
    background-color: #ffb400;
    color: white;
  }

  .section-divider {
  margin-top: 2px;
  border: 1px solid #ccc;
}
</style>
