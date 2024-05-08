<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>Login</li>
                    <li>비밀번호 찾기</li>
                </ul>
            </div>
        </div>

        <div class="login-area ptb-60">
            <div class="container">
                <div class="row">

                    <div class="login-content">
                        <div class="section-title" style="background-color: white;">
                            <h2>비밀번호 찾기</h2>
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
                                    v-model="userId"
                                    type="text"
                                    class="form-control"
                                    placeholder=""
                                    name="userId"
                                />
                            </div>

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
