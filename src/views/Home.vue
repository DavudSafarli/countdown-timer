<template>
<div id="home">
    <div class="container c1" id="container1">
        <div class="left">
            <a class="button b-30 button-left" href=""><i class="fas fa-angle-double-left"></i>Explore</a>
        </div>
        <div class="right">

            <a @click.prevent="a" class="button b-30 button-right" href="#container2">Create<i class="fas fa-angle-double-right"></i></a>
        </div>
        <div class="heading-text">
            <h1>Create & Share</h1>
        </div>
        <timer></timer>
    </div>
    <div id="container2" class="container c2">
        <create></create>
    </div>
    <div id="container3" class="container c3">
        <!-- <create></create> -->
    </div>
    <div id="container4" class="container c4">
        <!-- <create></create> -->
    </div>
</div>
</template>

<script>
export default {
    methods: {
        a(e) {
            let href = e.currentTarget.getAttribute('href')
            this.$router.push(href)
        }
    },
    mounted() {
        // document.querySelectorAll('.button').forEach(element => {
        //     element.addEventListener('click', (e)=>{
        //         e.preventDefault()
        //     })
        // });
        let els = document.querySelectorAll('.container')
        let l = els.length
        let ul = document.createElement('ul')
        for (let i = 0; i < l; i++) {
            let id = els[i].getAttribute('id')
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.setAttribute('href', '#' + id)
            li.appendChild(a)
            ul.appendChild(li)
            els[i].setAttribute('data-page-id', i)
            els[i].style.zIndex = l + 1 - i
        }

        // this.refs.nav.
    }
}
</script>

<style>

html {
    overflow: hidden;
}
#home {
    display: flex;
}

.c2 {
    background: #d63031;
}
.c3{
    background: black;
}
.c4{
    background: yellow;
}

.container {
    flex-grow: 1;
    min-width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.left {
    height: 100%;
    flex-grow: 1;
    background: #81ecec;
    position: relative;
}

.right {
    height: 100%;
    flex-grow: 1;
    background: #d63031;
    position: relative;
}

#home .wrap {
    margin-top: -5%;
}

.fas {
    margin: 0 5px;
    margin-top: 2.1%;
}

.heading-text h1 {
    z-index: 99;
    text-align: left;
    position: relative;
    white-space: nowrap;
    color: #2d3436;
    font-size: calc(20px + 2.5vw);
    margin-top: 8px;
    text-transform: uppercase;
}

.heading-text {
    z-index: 9;
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
    font-family: 'Myfont Bold';
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
    background-color: rgb(129, 236, 236);
    box-shadow: 0px 5px 0px 0px rgb(104, 211, 211);
    color: #d63031;
    left: 0;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
}
</style>
