<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>Login</li>
                    <li>아이디 찾기</li>
                </ul>
            </div>
        </div>

        <div class="login-area ptb-60">
            <div class="container">
                <div class="row">

                    <div class="login-content">
                        <div class="section-title" style="background-color: white;">
                            <h2>아이디 찾기</h2>
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
                                <label>이름</label>
                                <input
                                    v-model="name"
                                    type="text"
                                    class="form-control"
                                    placeholder=""
                                    name="name"
                                />
                            </div>

                            <div class="form-group">
                                <label>휴대폰 번호</label>
                                <input
                                    v-model="mobileNumber"
                                    type="text"
                                    class="form-control"
                                    placeholder=""
                                    name="mobileNumber"
                                />
                            </div>

                            <div class="form-group">
                                <label>인증번호</label>
                                <input
                                    v-model="certification"
                                    type="text"
                                    class="form-control"
                                    placeholder=""
                                    name="certification"
                                />
                            </div>

                            <div class="form-group">
                                <label>email</label>
                                <input
                                    v-model="email"
                                    type="email"
                                    class="form-control"
                                    placeholder=""
                                    name="email"
                                />
                            </div>

                            <button id="findId-btn" class="btn btn-primary">아이디 찾기</button>

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
    mounted() {
    },
    data() {
        return {
            formError: null,
            formUsername: '',
            formPassword: '',
        }
    },
    methods: {

    },
}
</script>
