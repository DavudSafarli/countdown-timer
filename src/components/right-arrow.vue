<template>
    <a :href="href" class="round bttn">
        <div class="r-arrow"></div>
    </a>
    
</template>

<script>
export default {
    props: ['href']
}
</script>

<style>
.r-arrow {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 30px;    
    height: 30px;
    border-radius: 50%;
    box-sizing: border-box;
}

.r-arrow:before{
    transition: 0.5s ease all;
    content: "";
    position: absolute;
    left: 50%;
    top: 95%;
    width: 50%;
    height: 50%;
    border-right: 8px solid #2c3e50;
    border-bottom: 8px solid #2c3e50;
    -webkit-transform: translate(-70% -50%) rotate(-45deg);
    transform: translate(-70%, -50%) rotate(-45deg);
}
.round{
    overflow: hidden;
    margin: 0!important;
    padding: 0!important;
    width: 110px!important;
    height: 60px!important;
    /* border-radius: 50%; */
    /* background: #3d3d3d; */
    /* border: 2px solid #fff; */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.1);
}
.round:hover .r-arrow:before{
    border-right: 8px solid #fff;
    border-bottom: 8px solid #fff;
}


</style>
