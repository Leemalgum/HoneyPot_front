<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li>회원가입</li>
                    <li>회원 정보</li>
                </ul>
            </div>
        </div>
        <br><br><br>
        <div class="container">
            <div class="step-indicator">
                <div class="step active">
                    <div class="step-number">1</div>
                    <div class="step-text">약관 동의</div>
                </div>
                <div class="step-line"></div>
                <div class="step current">
                    <div class="step-number">2</div>
                    <div class="step-text">정보 입력</div>
                </div>
                <div class="step-line"></div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-text">아티스트 선택</div>
                </div>
            </div>

        <div class="signup-area ptb-60">
            <div class="container">
                <div class="signup-content">
                    <!-- 아이디 필터링하기 -->
                    <label style="color: darkgray; display: inline-block; text-align: right; width: 100%;"><h4 style="color: orangered; display: inline;">*</h4>표시는 필수 입력 항목입니다.</label>
                    <form class="signup-form">
                        <div class="form-group">
                            <label>회원 사진</label>
                            <label style="color: lightgray">프로필 사진은 200x200 픽셀 이하, 10MB 이하의 JPEG, PNG 형식의 파일만 올리실 수 있습니다.</label>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                @change="handleFileUpload"
                            />
                            <p v-if="sizeExceeded" style="color: red;">파일 크기가 너무 큽니다. (최대 5MB까지 허용됩니다.)</p>
                            <p v-if="formatInvalid" style="color: red;">올바른 이미지 형식이 아닙니다. (JPEG 또는 PNG 형식을 허용합니다.)</p>
                            <!-- 파일 미리보기를 위한 이미지 태그 -->
                            <img v-if="imageUrl" :src="imageUrl" alt="Profile Picture Preview" style="max-width: 200px; max-height: 200px;">
                        </div>

                        <div class="form-group">
                            <label>ID <h4 style="color: orangered; display: inline;">*</h4></label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="4자 이상 20자 이하, 영소문자, 숫자, 특수문자(_) 가능"
                                id="id"
                                name="id"
                                v-model="id"
                            />
                        </div>

                        <div class="form-group">
                            <label>비밀번호<h4 style="color: orangered; display: inline;">*</h4></label>
                            <input
                                type="password"
                                class="form-control"
                                placeholder="8자 이상 16자 이하의 숫자 하나, 특수문자 하나 이상을 포함한 영문자)"
                                id="password"
                                name="password"
                                v-model="password"
                                @input="checkPassword"
                            />
                        </div>

                        <div class="form-group">
                            <label>비밀번호 확인<h4 style="color: orangered; display: inline;">*</h4></label>
                            <input
                                type="password"
                                class="form-control"
                                placeholder="비밀번호를 한 번 더 입력해 주세요."
                                id="password-check"
                                name="password-check"
                                v-model="passwordCheck"
                                @input="checkPassword"
                            />
                            <span v-if="passwordMatch && password !== '' && passwordCheck !== ''" style="color: green;">비밀번호가 일치합니다.</span>
                            <span v-else-if="password !== '' && passwordCheck !== ''" style="color: red;">위와 동일한 비밀번호를 입력해주세요.</span>
                            <!-- 입력란이 비어 있을 때 경고 메시지를 표시하지 않음 -->
                        </div>

                        <div class="form-group">
                            <label>이름</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                id="name"
                                name="name"
                                v-model="name"
                            />
                        </div>

                        <div class="form-group">
                            <label>별명<h4 style="color: orangered; display: inline;">*</h4></label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="2자 이상, 10자 이하의 한글,숫자,영문자"
                                id="nickname"
                                name="nickname"
                                @input="checkInputValidity"
                                v-model="nickname"
                            />
                            <p v-if="showSpecialCharacterWarning" style="color: red;">_와- 를 제외한 특수문자는 입력하실 수 없습니다.</p>
                            <p v-if="showLengthWarning" style="color: red;">글자수는 2자 이상 10자 이하여야 합니다.</p>
                        </div>

                        <div class="form-group">
                            <label>휴대전화번호<h4 style="color: orangered; display: inline;">*</h4></label>
                            <div class="input-group">
                                <!--                                <div class="input-group-prepend">
                                                                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        국가 선택
                                                                    </button>
                                                                    <div class="dropdown-menu">
                                                                        <a class="dropdown-item" href="#">한국</a>
                                                                        <a class="dropdown-item" href="#">미국</a>
                                                                        <a class="dropdown-item" href="#">영국</a>
                                                                        &lt;!&ndash; 다른 국가들을 필요에 따라 추가하세요 &ndash;&gt;
                                                                    </div>
                                                                </div>-->
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="-을 제외한 숫자만 입력해주세요"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    @keydown.prevent="preventNonNumeric"
                                    v-model="mobileNumber"
                                />
                            </div>
                        </div>


                        <div class="form-group">
                            <label>Email<h4 style="color: orangered; display: inline;">*</h4></label>
                            <input
                                type="email"
                                class="form-control"
                                placeholder="아이디@도메인주소.com"
                                id="email"
                                name="email"
                                v-model="email"
                            />
                        </div>

                        <div class="row">
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label>우편번호</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder=""
                                        v-model="postcode"
                                        id="zipcode"
                                        name="zipcode"
                                        readonly
                                    />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label style="visibility: hidden;">미사용 라벨</label>
                                    <button type="button" id="postcode" class="btn btn-primary btn-block" @click="execDaumPostcode">우편번호 찾기</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>주소</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                id="address"
                                name="address"
                                v-model="address"
                                readonly
                            />
                        </div>

                        <div class="form-group">
                            <label>상세주소</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                id="address-details"
                                name="address-details"
                                v-model="detailAddress"
                            />
                        </div>

                        <div class="form-group">
                            <label>생년월일 8자리</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                id="birthdate"
                                name="birthdate"
                                v-model="birthdate"
                            />
                        </div>
                        <div id="gender-app">
                            <div class="form-group">
                                <label>성별</label>
                                <div class="btn-group" role="group" aria-label="Gender" style="width: 100%;">
                                    <button type="button" id="gender-btn" class="btn btn-primary" @click="selectGender('male')" :class="{ 'active': selectedGender === 'male', 'clicked': selectedGender === 'male' }">남자</button>
                                    <button type="button" id="gender-btn" class="btn btn-primary" @click="selectGender('female')" :class="{ 'active': selectedGender === 'female', 'clicked': selectedGender === 'female' }">여자</button>
                                    <button type="button" id="gender-btn" class="btn btn-primary" @click="selectGender('not_specified')" :class="{ 'active': selectedGender === 'not_specified', 'clicked': selectedGender === 'not_specified' }">선택 안함</button>
                                </div>
                                <input type="hidden" name="gender" v-model="selectedGender">
                            </div>
                        </div>
                        <br><br>
                        <button type="submit" class="btn btn-primary">회원 정보 입력</button>
                        <br>
<!--                        <nuxt-link to="/" class="return-store"
                        >메인으로 돌아가기</nuxt-link
                        >-->
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style>
.btn-primary {
    background-color: #ffb400;
    border: none;

    &:hover {
        border: 1px solid black;
    }
}

#gender-btn {
    background-color: white;
    color : black;
    border: 1px solid gray;
}

#gender-btn:hover {
    border: 1.8px solid #ffb400;
    color: #ffb400;
}

#gender-btn.clicked {
    border: 1px solid #ffb400;
    color: #ffb400;
}


#postcode {
    background-color: gray;
    color: white;
}


#postcode:hover {
    background-color: transparent;
    color: black;
    border: 1.5px solid black;
}

.step-indicator {
    width: 50%; /* 컨테이너의 너비의 절반으로 설정 */
    margin: 0 auto; /* 화면 가운데 정렬 */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.step-number {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    border: 2px solid gainsboro;
    background-color: white;
    color: gainsboro;
    margin-bottom: 5px;
}

.step-text {
    color: darkgray;
}

.step.active .step-number {
    border-color: gainsboro;
    background-color: white;
}

.step.current .step-number {
    border-color: #FFB400;
    background-color: #FFB400;
    color: white;
}

.step.current .step-text {
    color: black;
}

.step-line {
    height: 1px;
    flex-grow: 1; /* 이 부분을 조정하여 실선이 원 사이에서 꽉 차도록 합니다 */
    background-color: gainsboro;
    margin: 0 5px; /* 원과 실선 사이의 간격을 조절합니다 */
}

</style>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Vue from 'vue';

export default {
    components: {
        TopHeader,
        Menubar,
    },
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.onload = () => console.log('카카오 우편번호 서비스 로드 완료');
        document.head.appendChild(script);
    },
    data() {
        return {
            profileImage: null,
            id: '',
            password: '',
            name: '',
            nickname: '',
            mobileNumber: '',
            email: '',
            postcode: '',
            address: '',
            detailAddress: '',
            birthDate: '',
            selectedGender: '',

            imageUrl: null, // 업로드된 이미지의 URL을 저장할 변수
            sizeExceeded: false, // 파일 크기가 제한을 초과했는지 여부를 저장할 변수
            formatInvalid: false, // 파일 형식이 유효한지 여부를 저장할 변수
            showSpecialCharacterWarning: false,
            showLengthWarning: false,
            passwordCheck: '',
            passwordMatch: false
        };
    },
    methods: {
        selectGender(gender) {
            this.selectedGender = gender;
        },
        submitForm() {
            console.log("성별 정보:", this.selectedGender);
        },
        execDaumPostcode() {
            new daum.Postcode({
                oncomplete: (data) => {
                    let addr = ''; // 주소 변수
                    let extraAddr = ''; // 참고항목 변수

                    // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                        // 조합된 참고항목을 해당 필드에 넣는다.
                        this.extraAddress = extraAddr;
                    } else {
                        this.extraAddress = '';
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    this.postcode = data.zonecode;
                    this.address = addr;
                    // 커서를 상세주소 필드로 이동한다.
                    this.$refs.detailAddress.focus();
                }
            }).open();
        },
        checkInputValidity(event) {
            const value = event.target.value;
            const regex = /[^\w\dㄱ-ㅎㅏ-ㅣ가-힣-_]/; // 특수문자를 제외한 문자를 검사하는 정규식

            // 글자수가 0, 1 또는 11 이상일 때 경고 메시지 표시
            if (value.length < 2 || value.length > 10) {
                this.showLengthWarning = true;
            } else {
                this.showLengthWarning = false;
            }

            // 특수문자가 포함되어 있는지 검사하여 경고 메시지 표시
            if (regex.test(value)) {
                this.showSpecialCharacterWarning = true;
            } else {
                this.showSpecialCharacterWarning = false;
            }
        },
        preventNonNumeric(event) {
            // 입력된 키가 숫자가 아닌 경우 입력을 막습니다.
            if (!/^\d+$/.test(event.key)) {
                event.preventDefault();
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0]; // 선택된 파일 가져오기
            // 파일 크기 확인 (최대 5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.sizeExceeded = true;
                return;
            } else {
                this.sizeExceeded = false;
            }
            // 파일 형식 확인 (JPEG 또는 PNG)
            if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
                this.formatInvalid = true;
                return;
            } else {
                this.formatInvalid = false;
            }
            // FileReader 객체를 사용하여 파일을 읽고 이미지 URL을 생성
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageUrl = e.target.result; // 이미지 URL을 변수에 저장하여 미리보기에 표시
            };
            reader.readAsDataURL(file);
            this.profileImage = file;
        },
        checkPassword() {
            this.passwordMatch = this.password === this.passwordCheck;
        },
    },
};
</script>
