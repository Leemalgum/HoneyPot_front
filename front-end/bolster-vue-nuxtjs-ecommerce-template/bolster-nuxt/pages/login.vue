<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>Login</li>
                </ul>
            </div>
        </div>

        <div class="login-area ptb-60">
            <div class="container">
                <div class="row">

                    <div class="login-content">
                        <div class="section-title" style="background-color: white;">
                            <h2>Login</h2>
                        </div>

                        <form
                            class="login-form"
                            v-if="!$store.state.authUser"
                            @submit.prevent="login"
                        >
                            <p v-if="formError" class="error">
                                {{ formError }}
                            </p>
                            <div class="form-group">
                                <label>아이디</label>
                                <input
                                    v-model="formUsername"
                                    type="text"
                                    class="form-control"
                                    placeholder=""
                                    name="username"
                                />
                            </div>

                            <div class="form-group">
                                <label>비밀번호</label>
                                <input
                                    v-model="formPassword"
                                    type="password"
                                    class="form-control"
                                    placeholder=""
                                    name="password"
                                />
                            </div>

                            <button type="submit" class="btn btn-primary">Login</button>
                            <br>
                            <a id="kakao-login-btn" @click="kakaoLogin">
                                <img src="../assets/img/kakao_button.png"
                                     alt="카카오 로그인"
                                     style="width: auto; height: auto;"/>
                            </a>
                            <!--                                <div @click="kakaoLogout">로그아웃</div>-->
                            <br><br>
                            <div class="links-container">
                                <nuxt-link to="/findId" class="forgot-id">
                                    아이디 찾기
                                </nuxt-link>
                                <div class="separator">|</div>
                                <nuxt-link to="/findPassword" class="forgot-password">
                                    비밀번호 찾기
                                </nuxt-link>
                                <div class="separator">|</div>
                                <nuxt-link to="/signup" class="honeypot-signup">
                                    회원가입
                                </nuxt-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.links-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.forgot-password, .forgot-id, .honeypot-signup, .separator {
    display: inline-block;
}

.btn-primary {
    background-color: #ffb400;
    border: none;

    &:hover {
        border: 1px solid black;
    }
}

.kakao-login {
    border: none;
    padding: 0;
    margin: 0;
    background: none;
}

#kakao-login-btn {
    /* 기본 스타일 */
    /*
    padding: 10px 20px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    */
    cursor: pointer; /* 마우스 커서를 포인터로 설정 */

    /* hover 시 스타일 */
    transition: background-color 0.3s ease; /* hover 시 부드러운 전환 효과 */
}

/* 마우스 커서를 손가락 모양으로 변경 */
#kakao-login-btn:hover {
    cursor: pointer;
}

</style>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'

export default {
    components: {
        TopHeader,
        Menubar,
    },
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';

        // Kakao SDK 스크립트가 로드된 후에 실행될 함수를 지정합니다.
        script.onload = () => {
            console.log('카카오 SDK 스크립트 로드 완료');

            // Kakao SDK 스크립트가 로드된 후에 Kakao.init()을 호출합니다.
            window.Kakao.init("c09ba2b5d947c0381265485bac8961d6");
        };
        document.head.appendChild(script);
    },
    data() {
        return {
            formError: null,
            formUsername: '',
            formPassword: '',
        }
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch('login', {
                    username: this.formUsername,
                    password: this.formPassword,
                })
                this.formUsername = ''
                this.formPassword = ''
                this.formError = null
                this.$router.push('/')
            } catch (error) {
                this.formError = error.message
            }
        },
        kakaoLogin() {
            window.Kakao.Auth.login({
                scope: "profile_image, account_email",
                success: this.getKakaoAccount,
            });
        },
        getKakaoAccount() {
            window.Kakao.API.request({
                url: "/v2/user/me",
                success: (res) => {
                    const kakao_account = res.kakao_account;
                    const ninkname = kakao_account.profile.ninkname;
                    const email = kakao_account.email;
                    console.log("ninkname", ninkname);
                    console.log("email", email);

                    //로그인처리구현

                    alert("로그인 성공!");
                },
                fail: (error) => {
                    console.log(error);
                },
            });
        },
        kakaoLogout() {
            window.Kakao.Auth.logout((res) => {
                console.log(res);
            });
        },
    },
}
</script>
