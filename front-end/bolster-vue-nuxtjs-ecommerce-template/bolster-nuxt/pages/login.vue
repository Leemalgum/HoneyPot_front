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

                                <div class="links-container">
                                    <nuxt-link to="/findid" class="forgot-id">
                                        아이디 찾기
                                    </nuxt-link>
                                    <div class="separator">|</div>
                                    <nuxt-link to="/findpassword" class="forgot-password">
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


</style>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'

export default {
    components: {
        TopHeader,
        Menubar,
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
    },
}
</script>
