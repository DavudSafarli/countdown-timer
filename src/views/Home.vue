<template>
<div class="fullpage-page" ref="a">
    <div class="left">
        <a @click.prevent="$emit('link', $event)" class="button b-30 button-left" href="#explore">
        <i class="fas fa-angle-double-left"></i>Explore
      </a>
    </div>
    <div class="right">
        <a
        @click.prevent="$emit('link', $event)"
        class="button b-30 button-right"
        href="#create">
        Create
        <i class="fas fa-angle-double-right"></i>
      </a>
    </div>
    <div class="heading-text">
        <h1>Create & Share</h1>
    </div>
    <timer v-if="render" :day="date.day" :hour="date.hour" :min="date.min" :sec="date.sec" :stop="get_stopHomeTimer"></timer>
</div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
    methods: {
        ...mapMutations(['set_state'])
    },
    data() {
        return {
            render: false,
            date: null,
            stop: false
        };
    },
    mounted() {
        let vue = this
        if(document.readyState ==  'complete'){
            console.log('complete')
            doWhenMount();
        }else{
            window.addEventListener('load', doWhenMount(), false)
        }

        function doWhenMount() {
            console.log('fully loaded')
            let date = [2020, 1, 2, 24, 0, 0];
            let time = vue.$store.dispatch("create", {
                date,
                timezone: ''
            }).then(res => {
                vue.date = res;
                vue.render = true;
            });
        }
    },
    computed: {
        ...mapGetters(['get_stopHomeTimer'])
    }
};
</script>

<style scoped>
.left {
    background: #81ecec;
}

.right {
    background: #e74c3c;
}

#home .wrap {
    margin-top: -5%;
}

.heading-text h1 {
    position: relative;
    color: #2d3436;
    font-size: calc(20px + 2.5vw);
    margin-top: 8px;
    text-transform: uppercase;
}

.heading-text {
    top: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.b-30 {
    position: absolute;
    bottom: 10%;
}

.button {
    font-family: "museo";
    display: flex;
    justify-content: center;
    text-decoration: none;
    text-align: center;
    padding: calc(8px + 0.4vw) 1.5vw;
    font-size: calc(10px + 1.5vw);
    text-decoration: none;
    margin: 20px;
    color: #fff;
    outline: none;
    width: calc(90px + 8vw);
}

.button:active {
    transform: translate(0px, 5px);
    -webkit-transform: translate(0px, 5px);
    box-shadow: 0px 1px 0px 0px;
}

.button-left {
    background-color: rgb(231, 76, 60);
    box-shadow: 0px 5px 0px 0px rgb(206, 51, 35);
    color: #81ecec;
    right: 0;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
}

.button-left:hover {
    background-color: rgb(255, 102, 86);
}

.button-right:hover {
    background-color: rgb(153, 255, 255);
}

.button-right {
    color: #d63031;
    left: 0;
    background-color: rgb(129, 236, 236);
    box-shadow: 0px 5px 0px 0px rgb(104, 211, 211);
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
}
</style>
