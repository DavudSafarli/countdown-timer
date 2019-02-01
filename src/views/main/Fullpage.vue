<template>
<div id="fullpage">
        <explore-page id="explore" @link="a"></explore-page>
        <home-page id="index" @link="a"></home-page>
        <create id="create" @link="a"></create>
        <about-page id="about" @link="a"></about-page>
</div>
</template>

<script>
export default {
    methods: {
        a(e) {
            this.stop = true;
            
            let href = e.currentTarget.getAttribute('href')
            this.$router.push(href)
        },
    },
    mounted() {
        if (location.hash) {
            setTimeout(function() {
                window.scrollTo(0, 0);
            }, 1);
        }
        if (location.hash) {
            setTimeout(function() {
                window.scrollTo(0, 0);
            }, 10);
        }
        let main = document.querySelector('#fullpage')
        TweenLite.to(main, 0, 
        {
            x: '-100%'
        });
        let els = document.querySelectorAll('.fullpage-page')
        let l = els.length
        for (let i = 0; i < l; i++) {
            let id = els[i].getAttribute('id')
            els[i].setAttribute('data-page-id', i)
            els[i].style.zIndex = l + 1 - i
        }
    }
}
</script>

<style>
.fas {
    margin: 0 5px;
    margin-top: 2.1%;
}
body{
    overflow: hidden;
}

html {
    overflow: hidden;
}
#fullpage {
    display: flex;
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
    background: #e74c3c;
    position: relative;
}
</style>
