<style scoped>

	.foot{
    width: 100%;
     height: 72px;
     line-height: 80px;
     text-align: center;
     position: fixed;
     bottom: 0;
   }
   .foot-item{
    display: block;
     width: 25%;
     float: left;
     font-size: 0.4rem;
   }
   .foot-item:link,.foot-item:visited{
     background-color: white;
     color: black;
     
   }
   .foot-item:hover,.foot-item:active{
     display: block;
     color: white;
     background-color: #C8C6C6;
   }
	
	.content  {
		padding-bottom: 72px;	
	}

</style>

<template>
	<div class="index">
		<router-view class="contetn"></router-view>			
		<div class="foot">	
			 <router-link class="foot-item" to="/service">服务</router-link>
		     <router-link class="foot-item" to="/market">集市</router-link>
		     <router-link class="foot-item" to="/community">社区</router-link>
		     <router-link class="foot-item" to="/my">我的</router-link>
		</div>	
	</div>
</template>

<script>
  import cookie from 'js-cookie'
	export default{
    mounted(){
        let url = '/initSession4Test/47'
        this.axios.get(
            url, 
            {
              params: {},
            },
        ).then(
            
            function(res) {

                //console.log(res)
            }
        ).catch(
            function(err) {
                console.log(err)
            }
        );
    }
	}
</script>