<template>
<div class="fullpage-page show">
    <div class="text" v-if="timer.deleted">
        Timer has been deleted. It was UP!
    </div>
    <div class="container text" v-if="timer">
        <template v-if="data">
            <h1>{{data.name}}</h1>
        </template>
    </div>
    <timer v-if="render" :day="timer.day" :hour="timer.hour" :min="timer.min" :sec="timer.sec" :stop="false"></timer>
    <div v-if="data" class="data container">
        <div class="text desc">{{data.about}}</div>
        <div class="text timezone">{{data.timezone}}</div>
    </div>
    <template v-if="timer.finished">
        <div class="finished">Timer is up. It will be <span style="color: yellow">deleted</span></div>
    </template>
</div>
</template>

<script>
import {mapGetters ,mapActions, mapState} from "vuex";
import store from "../store";
export default {
    
    data() {
        return {
            timer: {},
            stop: false,
            id: null,
            render: false
        }
    },

    computed: {
        ...mapGetters(["get_mine"]),
        data(){
            console.log('a')
            return this.get_mine(this.id)
        }
    },
    async mounted() {
        let id = this.$route.params.id;
        let timer = await store.dispatch("fetch_timer_local", id)
        this.id = id
        this.timer = timer
        this.render = true;
    },


};
</script>

<style scoped>
.warn{
    color: yellow;
}
.timezone{
    color: #ddd!important;
    font-size: 20px!important;
    align-self: flex-end;
}
.desc{
    color: #ececec!important;
}
.show {
    flex-direction: column;
    justify-content: space-around;
}

.show .wrap {
    position: relative;
}

.finished {
    font-size: calc(19px + 0.3vw);
}

h1 {
    margin-top: -5px;
    font-size: calc(28px + 3vw);
}

.text {
    flex-grow: 0.2;
    cursor: pointer;
    font-family: "Pacifico";
    top: 0;
    padding-top: 5px;
    color: #fff;
    font-size: 40px;
}

.show {
    background: #ff4757;
}
.data{
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
</style>
