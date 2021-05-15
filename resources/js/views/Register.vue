<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-6">
<!--                <div class="card card-default">-->
                <div class=" p-3 pb-md-4 mx-auto text-center">
                    <h1 class="display-5 fw-think">Регистрация</h1>
                </div>
                    <div class="">
                        <div class="alert alert-danger" v-if="has_error && !success">
                            <p v-if="error == 'registration_validation_error'">Validation Errors.</p>
                            <p v-else>Ошибка, проверьте правильность введенных данных!</p>
                        </div>
                        <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
                            <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.name }">
                                <label for="name">Имя пользователя</label>
                                <input type="text" id="name" class="form-control border-danger" placeholder="Иван" v-model="name">
                                <span class="help-block" v-if="has_error && errors.name">{{ errors.name }}</span>
                            </div>
                            <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                                <label for="email">E-mail</label>
                                <input type="email" id="email" class="form-control border-danger" placeholder="user@example.com" v-model="email">
                                <div class="alert alert-danger" v-if="has_error && errors.email">
                                    <span >Данный E-mail уже используется</span>
                                </div>
                            </div>
                            <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                                <label for="password">Пароль</label>
                                <input type="password" id="password" class="form-control border-danger" v-model="password">
                                <div class="alert alert-danger" v-if="has_error && errors.password">
                                    <span >Пароли не совпадают</span>
                                </div>
                            </div>
                            <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                                <label for="password_confirmation">Повторите пароль </label>
                                <input type="password" id="password_confirmation" class="form-control border-danger" v-model="password_confirmation">
                            </div>
                            <div class="d-flex">
                                <button type="submit" class="mt-2 btn btn-primary">Регистрация</button>
                            </div>
                        </form>
                    </div>
<!--                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            has_error: false,
            error: '',
            errors: {},
            success: false
        }
    },
    methods: {
        register() {
            let app = this
            this.$auth.register({
                data: {
                    name: app.name,
                    email: app.email,
                    password: app.password,
                    password_confirmation: app.password_confirmation
                },
                success: function () {
                    app.success = true
                    this.$router.push({name: 'login', params: {successRegistrationRedirect: true}})
                },
                error: function (res) {
                    // console.log(res.response.data.errors)
                    app.has_error = true
                    app.error = res.response.data.error
                    app.errors = res.response.data.errors || {}

                }
            })
        }
    }
}
</script>
<style scoped>
.alert{
    margin-bottom: 5px;
    margin-top: 5px;
    padding-top: 7px!important;
    padding-bottom: 7px!important;
}
p{
    margin-bottom: 0px!important;
}
label{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 3px;
}
button{
    font-size: 16px;
    margin-left: auto;
    margin-top: 20px!important;
    padding-right: 16px;
    padding-left: 16px;
}
.button{
    width: 100%;
}
</style>

