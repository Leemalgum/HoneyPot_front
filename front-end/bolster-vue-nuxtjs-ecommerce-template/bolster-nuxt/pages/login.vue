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
                            v-if="!authUser"
                            @submit.prevent="serviceLogin"
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
                                <nuxt-link to="/signup-policy" class="honeypot-signup">
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

<style scoped>
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
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#kakao-login-btn:hover {
    cursor: pointer;
}
</style>

<script>
import { ref, onMounted } from 'vue';
import TopHeader from '../layouts/TopHeader';
import Menubar from '../layouts/Menubar';
import axios from 'axios';
import apiClient from '../api/apiClient'; // apiClient를 가져옵니다

export default {
    name: 'LoginPage',
    components: {
        TopHeader,
        Menubar,
    },
    setup() {
        const formUsername = ref('');
        const formPassword = ref('');
        const formError = ref(null);
        const kakaologinBackUrl = 'http://localhost:8080/api/oauth2/kakaologin';
        const serviceloginBackUrl = 'http://localhost:8080/auth/login';
        const authUser = ref(null);
        // const router = useRouter();
        // const store = useStore();

        /*        const login = async () => {
                    try {
                        await this.$store.dispatch('login', {
                            username: formUsername.value,
                            password: formPassword.value,
                        });
                        formUsername.value = '';
                        formPassword.value = '';
                        formError.value = null;
                        this.$router.push('/');
                    } catch (error) {
                        formError.value = error.message;
                    }
                };*/

        onMounted(() => {
            const script = document.createElement('script');
            script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
            script.onload = () => {
                console.log('카카오 SDK 스크립트 로드 완료');
                window.Kakao.init('c09ba2b5d947c0381265485bac8961d6'); // 여기에 JavaScript 키를 넣습니다.
            };
            document.head.appendChild(script);
        });

        const serviceLogin = async () => {
            try {
                const response = await apiClient.post('/auth/login', {
                    username: formUsername.value,
                    password: formPassword.value,
                });
                console.log('서버 응답:', response.data);
                if (response.data.success) {
                    authUser.value = response.data.data.user;

                    const accessToken = response.data.data.accessToken;
                    const refreshToken = response.data.data.refreshToken;
                    const accessTokenExpiration = response.data.data.accessTokenExpiration;
                    const refreshTokenExpiration = response.data.data.refreshTokenExpiration;
                    const redirectUrl = response.data.data.redirectUrl;

                    sessionStorage.setItem('JWT_TOKEN', accessToken);
                    sessionStorage.setItem('REFRESH_TOKEN', refreshToken);
                    sessionStorage.setItem('ACCESS_TOKEN_EXPIRATION', accessTokenExpiration);
                    sessionStorage.setItem('REFRESH_TOKEN_EXPIRATION', refreshTokenExpiration);

                    await fetchProtectedData();

                    if (redirectUrl) {
                        console.log('Redirecting to:', redirectUrl);
                        window.location.href = redirectUrl;
                    } else {
                        console.log('Redirecting to home page');
                        window.location.href = '/';
                    }

                } else {
                    formError.value = response.data.message;
                }
            } catch (error) {
                console.error('There was an error!', error);
                formError.value = '로그인 실패. 다시 시도해 주세요.';
            }
        };

        const fetchProtectedData = async () => {
            const token = sessionStorage.getItem('JWT_TOKEN');
            if (token) {
                try {
                    const response = await fetch('http://localhost:8080/api/protected', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    console.log('Protected Data:', data);
                } catch (error) {
                    console.error('Error fetching protected data:', error);
                }
            } else {
                console.error('No token found in session storage');
            }
        };


        const kakaoLogin = () => {
            window.Kakao.Auth.login({
                scope: 'profile_image, account_email',
                success: (authObj) => {
                    console.log(authObj);
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        success: async (res) => {
                            const kakaoAccount = res.kakao_account;
                            const userData = {
                                accessToken: authObj.access_token,
                                expiresIn: authObj.expires_in,
                                refreshToken: authObj.refresh_token,
                                refreshTokenExpiresIn: authObj.refresh_token_expires_in,
                                email: kakaoAccount.email,
                                profileImage: kakaoAccount.profile.profile_image_url,
                            };
                            console.log('User Data:', userData);
                            try {
                                const response = await apiClient.post('/api/oauth2/kakaologin', userData, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                                console.log(response.data);
                                if (response.data.success) {
                                    authUser.value = response.data.data.user;

                                    const accessToken = response.data.data.accessToken;
                                    const refreshToken = response.data.data.refreshToken;
                                    const accessTokenExpiration = response.data.data.accessTokenExpiration;
                                    const refreshTokenExpiration = response.data.data.refreshTokenExpiration;
                                    const redirectUrl = response.data.data.redirectUrl;

                                    sessionStorage.setItem('JWT_TOKEN', accessToken);
                                    sessionStorage.setItem('REFRESH_TOKEN', refreshToken);
                                    sessionStorage.setItem('ACCESS_TOKEN_EXPIRATION', accessTokenExpiration);
                                    sessionStorage.setItem('REFRESH_TOKEN_EXPIRATION', refreshTokenExpiration);

                                    await fetchProtectedData();

                                    if (redirectUrl) {
                                        console.log('Redirecting to:', redirectUrl);
                                        window.location.href = redirectUrl;
                                    } else {
                                        console.log('Redirecting to home page');
                                        window.location.href = '/';
                                    }

                                    fetchProtectedData();
                                } else {
                                    formError.value = response.data.message;
                                }
                            } catch (error) {
                                console.error('There was an error!', error);
                                formError.value = '로그인 실패. 다시 시도해 주세요.';
                            }
                        },
                        fail: (err) => {
                            console.error(err);
                            formError.value = '사용자 정보 요청 실패. 다시 시도해 주세요.';
                        },
                    });
                },
                fail: (err) => {
                    console.error(err);
                },
            });
        };

        return {
            formUsername,
            formPassword,
            formError,
            authUser,
            serviceLogin,
            kakaoLogin,
            fetchProtectedData,
        };
    },
};
</script>
