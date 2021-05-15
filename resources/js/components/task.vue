<template>
    <div >
        <b-modal centered title="Результаты тестирования" v-model="modalShow" ok-only>
            <p>Правильно решенных: <span class="text-success">{{valRightAnswers}}</span></p>
            <p>Неправильно решенных: <span class="text-danger">{{valWrongAnswers}}</span></p>
        </b-modal>
        <div class="nav-questions" v-if="indexLoad">
            <svg @click="prevSlider" style="color: #1d68a7" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            <div class="carousel-parent1">
                <div class="carousel1" :style="{'margin-left':'-'+ (100*indexSlider) + '%'}">
                    <div class="carousel-item1" v-for="(obj, index) in arrObjAnswers">
                        <button

                            v-bind:value="index"
                            v-on:click="currentQuestion($event)"
                            type="button"
                            class="btn"
                            :class="{'btn-primary' : index == indexCurrent,
                            'btn-outline-primary' : index!= indexCurrent&&obj.indexFinally == 0,
                            'btn-danger': obj.indexFinally == 2,
                            'btn-success' : obj.indexFinally == 1}">
                            {{index + 1}}
                        </button>
                    </div>
                </div>
            </div>
            <svg @click="nextSlider" style="color: #1d68a7" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
        </div>
        <form method="post" action="" >
            <div>
                <div class="d-flex justify-content-center mt-5" v-if="!indexLoad">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
                <div v-else>
                    <h1>{{questions[indexCurrent].question}}</h1>
                    <div class="d-flex">
                        <img src="img/картинка 1.png" alt="">
                        <div class="flex-column">
                            <div class="form-check mb-2" v-for="(answer, index) in arrObjAnswers[indexCurrent].answers">
                                <input v-model="picked[indexCurrent]" v-bind:value="answer"
                                       class="form-check-input" type="radio" name="flexRadioDefault"
                                       :id="'flexRadioDefault' + index"
                                       v-bind:disabled="arrObjAnswers[indexCurrent].indexFinally == 1 || arrObjAnswers[indexCurrent].indexFinally == 2">
                                <label class="form-check-label"
                                       :class="{'text-success': index == indexRightInput[indexCurrent], 'text-danger': index == indexWrongInput[indexCurrent]}"
                                       :for="'flexRadioDefault' + index">
                                    {{answer}}
                                </label>
                            </div>
                        </div>
                    </div>
                    <input type="checkbox" class="btn-check" id="btn-check-2" checked autocomplete="off">
                    <label class="btn btn-primary" for="btn-check-2" v-on:click="nextQuestion">{{button[indexButton]}}</label>
                    <span class="ml-2">{{result}}</span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "task",
    data: () => ({
        picked: [],
        result: "",
        questions: [],
        arrObjAnswers: [],
        // answers: [],
        indexCurrent: 0,
        button: ["Проверить", "Следующий", "Завершить"],
        indexButton: 0,
        indexLoad: false,
        indexDis: false,
        indexSlider: 0,
        indexRightInput: [],
        indexWrongInput: [],
        flagLastQuestion: {
            flag: false,
            indexNextQuestion: 0
        },
        modalShow: false,
        valRightAnswers: 0,
        valWrongAnswers: 0
    }),
    mounted() {
        this.loadQuestions(this.$route.params.id);
        // this.arrAnswers()
    },

    watch:{
        indexCurrent: function (val, oldVal) {
            if(val!=0 && val%12 == 0){
                console.log(val);
                this.nextSlider();
            }
        },
        $route(to, from){
            this.loadQuestions(this.$route.params.id);
            this.$forceUpdate();
        }
    },
    methods:{
        currentQuestion(e){
            this.indexCurrent = e.target.value;
            if (this.arrObjAnswers[this.indexCurrent].indexFinally == 0){
                this.indexButton = 0;
            } else{
                this.indexButton = 1;
            }
        },
        loadQuestions(id){
            console.log(this.$route.params.id);
            if (undefined == id){
                axios.get('api/v1/questions/')
                    .then(res => {
                        this.questions = res.data;
                    }).finally(this.arrAnswers);
            } else{
                axios.get('api/v1/questions/'+id)
                    .then(res => {
                        this.questions = res.data;
                    }).finally(this.arrAnswers);
            }
            // this.$route.params.id
        },

        //Срабатывает по нажатию кнопки, проверяет правильность ответа, меняет значение кнопки
        nextQuestion(){
            console.log(this.picked[this.indexCurrent]);
            //Проверка решенности всех вопросов
            if (this.indexButton!=2) {
                let flagLast = false;
                //Проверка решен ли вопрос
                if (this.arrObjAnswers[this.indexCurrent].indexFinally == 0) {

                    //Проверка на правильности выбранного ответа
                    if (this.picked[this.indexCurrent] == this.questions[this.indexCurrent].r_answer) {
                        this.arrObjAnswers[this.indexCurrent].indexFinally = 1;
                        this.indexButton = 1;
                    } else if (this.picked[this.indexCurrent] == undefined) {
                        this.result = "Выберите ответ";
                    } else {
                        this.arrObjAnswers[this.indexCurrent].indexFinally = 2;
                        this.indexButton = 1;
                    }
                    this.indexDis = true;
                    // подсвечивание правильного и не правильного ответов(нужно занести в отдельную функцию)
                    for (let i = 0; i < this.arrObjAnswers[this.indexCurrent].answers.length; i++) {
                        if (this.arrObjAnswers[this.indexCurrent].answers[i] == this.questions[this.indexCurrent].r_answer && this.picked[this.indexCurrent] != undefined) {
                            this.indexRightInput[this.indexCurrent] = i;
                        } else if (this.picked[this.indexCurrent] == this.arrObjAnswers[this.indexCurrent].answers[i] && this.arrObjAnswers[this.indexCurrent].indexFinally == 2) {
                            this.indexWrongInput[this.indexCurrent] = i;
                        }
                    }

                } else {

                    this.result = "";
                    this.indexCurrent++;
                    this.indexButton = 0;
                    this.indexDis = false;
                }
                for (let i = 0; i < this.arrObjAnswers.length; i++) {
                    if (this.arrObjAnswers[i].indexFinally == 0) {
                        flagLast = true;
                    }
                }
                if (!flagLast) {
                    this.indexButton = 2;
                }
            } else {
                let app = this;
                let StatisticForm = {
                    right: 0,
                    wrong: 0,
                    test_id: app.$route.params.id,
                    user_id: app.$auth.user().id
                };
                //Подсчет ответов
                for (let i = 0; i < this.arrObjAnswers.length; i++){
                    if (this.arrObjAnswers[i].indexFinally == 1){
                        StatisticForm.right++;
                    } else {
                        StatisticForm.wrong++;
                    }
                }
                this.valRightAnswers = StatisticForm.right;
                this.valWrongAnswers = StatisticForm.wrong;
                this.modalShow = true;
                this.store(StatisticForm);
            }
            // console.log(this.picked);
            // console.log(this.questions.length);
        },
        store(form) {
            console.log(form);
            axios.post('/api/v1/result', form, {
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(res => {
                    if (res.data.status) {
                        // this.$router.push('/');
                        this.modalShow = true;
                    }
                    // else {
                    // }
                })
        },
        shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        },
        arrAnswers(){
            this.arrObjAnswers = [];
            let answers = [];
            for (let i = 0; i < this.questions.length; i++){
                answers = [];
                answers.push(this.questions[i].r_answer, this.questions[i].w_answer1);
                if (this.questions[i].w_answer2 != null){
                    answers.push(this.questions[i].w_answer2);
                    if (this.questions[i].w_answer3 != null){
                        answers.push(this.questions[i].w_answer3);
                        if (this.questions[i].w_answer4 != null){
                            answers.push(this.questions[i].w_answer4);
                            if (this.questions[i].w_answer5 != null){
                                answers.push(this.questions[i].w_answer5);
                            }
                        }
                    }
                }
                this.shuffle(answers);
                this.arrObjAnswers[i] = {
                    indexFinally : "0",
                    answers : answers,
                    indexRight: 0
                }

            }
            this.indexLoad = true;
            console.log(this.indexLoad);
            console.log(this.arrObjAnswers[0].answers);
            console.log(this.arrObjAnswers);
        },
        nextSlider() {
            let app = this;
            if(this.indexSlider < (Math.ceil(app.arrObjAnswers.length/12)-1)){
                this.indexSlider++;
            }
        },
        prevSlider(){
            if (this.indexSlider!=0) {
                this.indexSlider--;
            }
        }
    }
}
</script>

<style scoped>

div.form-check{
    margin-bottom: 15px;
}
input.form-check-input{
    margin-top: 7px;
    width: 1.2em;
    height: 1.2em;
    margin-left: -1.7em;
}
label{
    font-size: 20px;
}
div.flex-column{
    /*margin-top: 10px;*/
    margin-left: 30px;
}
h1{
    margin-top: 15px;
    margin-bottom: 15px;
}
img{
    height: 350px;
    width: auto;
    margin-bottom: 30px;
}
.nav-questions{
    margin-left: auto;
    margin-right: auto;
    display: flex;
    width: 100%;
    justify-content: space-around;
}
.carousel-parent1{
    width: 84%;
    overflow: hidden;
}
.carousel1{
    display: flex;
    /*display: inline-block;*/
    /*justify-content: center;*/
    transition: all ease .5s;
}
.carousel-item1{
    min-width: 55px;
    max-width: 55px;
    margin-left: 5px;
    margin-right: 5px;

}
.carousel-item1 button{
    max-width: 44px;
    width: 90%;
}
svg{
    cursor: pointer;
}
</style>
