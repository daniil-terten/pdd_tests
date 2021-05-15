<template>
    <div class="container py-3">
        <div class="p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-5 fw-think">Тестирование по темам</h1>
            <i class="bi bi-arrow-down"></i>
            <div class="py-5" v-if="flag">
                <span>Выберите тему</span>
                <div class="btn-group " >
                    <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Выберите тему
                    </button>
                    <div class="dropdown-menu" >
                        <a class="dropdown-item" v-for="theme in themes" href="">{{theme.name}}</a>
                    </div>
                </div>
            </div>
            <div class="cardContainer">
                <div class="card" :class="className" v-on:click="flipCard">
                    <div class="front"><h3 class="cardTitle">Flip me!</h3></div>
                    <div class="back">
                        <div class="content">
                            <h3 class="cardTitle">I was made with CSS3</h3>
                            <br/>
                            <p id="happy"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";

export default {
    name: "Select",
    data: () => ({
        themes:[],
        flag: false,
        className: "",
        flagClass: false
    }),
    mounted() {
        this.loadThemes();
    },
    methods:{
        loadThemes(){
            axios.get('/api/tests')
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

<style scoped>
.cardContainer{
    transition: all .3s ease;
    perspective: 800px;
    padding-left: 1%;
}
.card{
    width: 99%;
    height: 200px;
    cursor: pointer;
    -webkit-transition: -webkit-transform 0.6s;
    -moz-transition: -moz-transform 0.6s;
    -o-transition: -o-transform 0.6s;
    transition: transform 0.6s;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
}
.card.flipped
{
    -webkit-transform: rotateY( 180deg );
    -moz-transform: rotateY( 180deg );
    -o-transform: rotateY( 180deg );
    transform: rotateY( 180deg );
}
.card .front, .card .back {
    display: block;
    height: 100%;
    width: 100%;
    line-height: 60px;
    color: white;
    text-align: center;
    font-size: 4em;
    position: absolute;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
    box-shadow: 3px 5px 20px 2px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 2px 5px rgba(0, 0, 0, 0.26);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 2px 5px rgba(0, 0, 0, 0.26);
}
.card .back {
    background: #03446A;
    -webkit-transform: rotateY( 180deg );
    -moz-transform: rotateY( 180deg );
    -o-transform: rotateY( 180deg );
    transform: rotateY( 180deg );
}
.cardContainer .card .front {
    background: #2aa9e0;
}
</style>
