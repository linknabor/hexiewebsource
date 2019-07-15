<template>
   <div class="abo">
       <div class="avatar-wrap rel ov">
        <div class="filter-img avatar-wrap center-bg" ></div>
    </div>

   </div>
</template>

<script>
// import bg from '../assets/images/img/bg_abort.jpg';
export default {
   data () {
       return {
       };
   },
   mounted() {},

   components: {},

   methods: {},

   computed: {},
}
</script>

<style  scoped>
.abo {
    background-color: #fffff8;
    padding-bottom: 1px;
}
.avatar-wrap {
    height: 15rem;
    text-align: center;
}
.rel {
    position: relative;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
.filter-img {
    background-image: url('../assets/images/img/bg_abort.jpg') ;
    background-size: cover;
    background-position: center;
}

</style>