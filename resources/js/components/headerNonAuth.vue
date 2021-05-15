<template>
    <div>
        <header class="p-3 ">
            <div class="container">
                <div class="bor d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <router-link to="/">
                        <a href="#" class="d-flex logo align-items-center mb-2 mb-lg-0  text-decoration-none">
                            <img src="img/Logo.jpg" alt="">
                        </a>
                    </router-link>
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" >
                        <li v-if="$auth.check()">
                            <router-link to="/statistics" class="nav-link px-2 text-primary">
                                <a href="#" class="nav-link px-2 text-primary">Статистика</a>
                            </router-link>
                        </li>
                    </ul>
                    <div v-if="$auth.check()">
                        <span>{{$auth.user().name}}</span>
                        <button type="button" class="btn btn-outline-dark" @click="$auth.logout()">Выйти</button>
                    </div>
                    <div class="text-end" v-if="!$auth.check()">
                        <router-link to="/login">
                            <button type="button" class="btn btn-outline-dark me-2">Войти</button>
                        </router-link>
                        <router-link to="/register">
                            <button type="button" class="btn btn-primary">Зарегистрироваться</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
name: "headerNonAuth",
    data: ()=>({
        flagAuth: false
    }),
    mounted() {
        this.load();
        setTimeout(this.load, 1000);
    },
    methods:{
    load(){
        this.flagAuth = this.$auth.check();

    },
    user(){
        console.log(this.$auth.user().id);
    },
    }
}
</script>

<style scoped>
span{
    margin-right: 10px;
}
a.logo{
    margin-right: 40px ;
}
img{
    height: 45px;
    /*margin-right: 20px;*/
    width: auto;
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin-top: auto;
    margin-bottom: auto;
}
div.bor{
    padding-bottom: 15px;
    border-bottom: 1px solid #dee2e6;
}
li a{
    font-size: 18px;
}
ul{
    height: 59px;
}
</style>
