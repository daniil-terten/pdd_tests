<template>
    <div class="container py-3">

        <div class=" p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-5 fw-think">Выберите вариант тестирования</h1>
        </div>
        <div id="select" class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm border-primary">
                        <div class="card-header py-3 bg-primary">
                            <h4 class="my-0 fw-normal text-white">Экзамен</h4>
                        </div>
                        <div class="card-body">
                            <img src="img/test.jpg" alt="">
                            <router-link to="/testing/1">
                                <button type="button" class="w-100 btn btn-lg btn-outline-danger">Начать тестирование</button>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm border-primary">
                        <div class="card-header py-3 bg-primary">
                            <h4 class="my-0 fw-normal text-white">По темам</h4>
                        </div>
                        <div class="card-body">
                            <div class="cardContainer1">
                                <div class="card1" :class="className">
                                    <div class="front1">
                                        <img src="img/konus-or.jpg" alt="">
                                    </div>
                                    <div class="back1">
                                        <svg id="1" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="first bi bi-arrow-down" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                        </svg>
                                        <br>
                                        <div class="btn-group " >
                                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Выбрать тему
                                            </button>
                                            <div class="dropdown-menu" >
                                                <a class="dropdown-item" v-for="theme in themes" href="">{{theme.name}}</a>
                                            </div>
                                        </div>
                                        <br>
                                        <svg  xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="two bi bi-arrow-up" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
<!--                            <img src="img/konus-or.jpg" alt="">-->

                                <button v-on:click="flipCard" type="button" class="w-100 btn btn-lg btn-outline-danger">Выбрать тему</button>

                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm border-primary">
                        <div class="card-header py-3 text-white bg-primary border-primary">
                            <h4 class="my-0 fw-normal">Марафон</h4>
                        </div>
                        <div class="card-body">
                            <img src="img/rul.jpg" alt="">
                            <router-link to="/testing">
                                <button type="button" class="w-100 btn btn-lg btn-outline-danger">Начать тестирование</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "indexView",
    data: ()=>({
        className: "",
        flagClass: false,
        themes:[]
    }),
    mounted() {
        this.loadThemes();
    },
    methods:{
        loadThemes(){
            axios.get('/api/v1/tests')
                .then(res => {
                    this.themes = res.data;
                    this.flag = true;
                });
        },
        flipCard(){
            if(!this.flagClass){
                this.className = "flipped";
                this.flagClass = true;
            }
            else {
                this.className = " ";
                this.flagClass = false;
            }
        }
    }
}
</script>

<style >
.container {
    max-width: 960px!important;
}
#select{
    margin-top: 30px;
}
img{
    width: 250px;
    margin-bottom: 20px;
}
</style>
<style scoped>
img{
    height: 214px;
}
.cardContainer1{
    transition: all .3s ease;
    perspective: 800px;
    height: 214px;
    margin-bottom: 20px;
}
.card1{
    width: 99%;
    /*height: 214px;*/
    -webkit-transition: -webkit-transform 0.6s;
    -moz-transition: -moz-transform 0.6s;
    -o-transition: -o-transform 0.6s;
    transition: transform 0.6s;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
}
.card1.flipped
{
    -webkit-transform: rotateY( 180deg );
    -moz-transform: rotateY( 180deg );
    -o-transform: rotateY( 180deg );
    transform: rotateY( 180deg );
}
.card1 .front1, .card1 .back1 {
    display: block;
    height: 100%;
    width: 100%;
    /*line-height: 60px;*/
    /*color: white;*/
    /*text-align: center;*/
    /*font-size: 4em;*/
    position: absolute;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
}
.card1 .back1 {
    /*margin-top: 10px;*/
    position: absolute;
    -webkit-transform: rotateY( 180deg );
    -moz-transform: rotateY( 180deg );
    -o-transform: rotateY( 180deg );
    transform: rotateY( 180deg );
}
svg.first{
    margin-bottom: 15px;
}
svg.two{
    margin-top: 15px;
}
</style>
