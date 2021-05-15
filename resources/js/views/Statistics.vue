<template>
    <div class="container">
        <div class=" p-3 pb-md-4 mx-auto text-center mb-4">
            <h1 class="display-5 fw-think">Статистика</h1>
        </div>
        <div  class="row mb-1">
            <div class="col-sm-5"><h4>Правильно решенные вопросы:</h4></div>
            <div class="col-sm-7 pt-2">
                <b-progress :value="questions" max="100" variant="primary" ></b-progress>
            </div>
        </div>
        <div  class="row mb-1">
            <div class="col-sm-5"><h4>Пройденные темы:</h4></div>
            <div class="col-sm-7 pt-2">
                <b-progress :value="themes" max="10" variant="primary" ></b-progress>
            </div>
        </div>
        <div  class="row mb-1">
            <div class="col-sm-5 fw-think"><h4 class="display-8 fw-think">Всего баллов:</h4></div>
            <div class="col-sm-7 pt-2">
                <b-progress :value="score" max="110" variant="primary" ></b-progress>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Statistics",
    data: () =>({
        questions: 0,
        themes: 0,
        score: 0,
        allStatistic: []
    }),
    mounted() {
        this.loadProgress();
    },
    methods:{
        loadProgress(){
            let userId = this.$auth.user().id;

            axios.get('/api/v1/result/'+userId)
                .then(res => {
                    this.allStatistic = res.data;
                }).finally(this.calculateProgress);


        },
        calculateProgress(){
            let mass = [];
            let flag = false;
            for (let i = 0;i < this.allStatistic.length; i++){
                for (let j = 0; j < mass.length; j++){
                    if (mass[j].test_id == this.allStatistic[i].test_id){
                        flag=true;
                        if (this.allStatistic[i].right > mass[j].right){
                            mass[j]={
                                right: this.allStatistic[i].right,
                                test_id: this.allStatistic[i].test_id
                            }
                        }
                    }
                }
                if (!flag) {
                    mass[mass.length] = {
                        right: this.allStatistic[i].right,
                        test_id: this.allStatistic[i].test_id
                    }
                    flag = false;
                }
            }
            for (let j = 0; j < mass.length; j++){
                this.questions = this.questions + mass[j].right;
            }
            this.themes = mass.length;
            this.score = mass.length + this.questions;
            console.log(this.allStatistic);
            console.log(mass);

        },
        unique(arr) {
            let result = [];

            for (let str of arr) {
                if (!result.includes(str)) {
                    result.push(str);
                }
            }

            return result;
        }
    }
}
</script>

<style scoped>
h4{
    font-weight: 300!important;
}
.row{
    margin-top: 20px;
}
</style>
