<template>
    <div>
        <form action="/">
             <van-row class="input-sect">
                 <van-col class="input-sect-text">
                     小区: 
                 </van-col>
                 <van-col class="input-sect-content">
                    <van-search
                        v-model="sectName"
                        shape="round"
                        placeholder="请输入小区名称"
                        @input="querySect"
                    />
                    <van-list>
                        <van-cell v-for="item in sectList" :key="item.id" :title="item.name" />
                    </van-list>
                </van-col>
             </van-row>
        </form>
    </div>
</template>

<script>

import {Toast, Button, Search, Dialog, List, Cell, Col, Row} from 'vant'
import Api from '@/api/api.js'

export default {
    data(){
        return {
            sectName: '',
            sectList: []
        }
    },
    components: {
        [Button.name]: Button,
        [Search.name]: Search,
        [List.name]: List,
        [Cell.name]: Cell,
        [Row.name]: Row,
        [Col.name]: Col
    },
    mounted(){

    },
    methods: {
        querySect(){
            if(!this.sectName){
                return false;
            }
            Api.getSectList({sect_name: this.sectName}).then((response)=>{
                let data = response.data
                if(data.success){
                    if(data.result.sect_info.length > 0) {
                        this.sectList = data.result.sect_info
                        console.log(this.sectList)
                    }
                }
            }).catch((error)=>{
                Toast(error)
            })
        }
    }

}
</script>

<style scoped>

.input-sect {
    margin: 1rem 1rem 0.2rem 1rem;
}

.input-sect-text {
    margin-top: 0.4rem;
    font-size: 0.5rem;
    
}

</style>
