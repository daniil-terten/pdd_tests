<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-6">
<!--                <div class="card card-default">-->
                <div class=" p-3 pb-md-4 mx-auto text-center">
                    <h1 class="display-5 fw-think">Вход</h1>
                </div>
                    <div class="">
                        <div class="alert alert-danger" v-if="has_error && !success">
                            <p v-if="error == 'login_error'">Проверьте правильность введенных данных</p>
                            <p v-else>Ошибка соединения</p>
                        </div>
                        <form autocomplete="off" @submit.prevent="login" method="post">
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input type="email" id="email" class="form-control border-danger" placeholder="user@example.com" v-model="email" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Пароль</label>
                                <input type="password" id="password" class="form-control border-danger" v-model="password" required>
                            </div>
                            <div class="button d-flex align-content-end">
                                <button type="submit" class=" mt-2 btn btn-primary">Войти</button>
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
            email: null,
            password: null,
            success: false,
            has_error: false,
            error: ''
        }
    },
    mounted() {
        //
    },
    methods: {
        login() {
            // get the redirect object
            var redirect = this.$auth.redirect()
            var app = this

            this.$auth.login({
                data: {
                    email: app.email,
                    password: app.password
                },
                success: function() {
                    // handle redirection
                    app.success = true
                    const redirectTo = 'indexView'
                    this.$router.push({name: redirectTo})
                },
                error: function() {
                    app.has_error = true
                    app.error = res.response.data.error
                },
                rememberMe: true,
                fetchUser: true
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
