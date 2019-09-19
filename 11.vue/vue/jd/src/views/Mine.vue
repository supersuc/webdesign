<template>
    <div>
       <img src="//m.360buyimg.com/mobilecms/s750x366_jfs/t1/68142/13/4285/242743/5d27eb37Ee11d66ba/9113667db702e328.jpg!cr_1125x549_0_72!q70.jpg.dpg" alt="" class="heading">
       <ul>
           <li v-for="item in minearry" class="mineitem" @click="itemclick(item)" :key="item.label"> 
               <span class="minetitle">{{item.label}}</span>
               <i class="cubeic-arrow"></i>
           </li>
       </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            minearry:[
                {label:'商品收藏'},
                {label:'我的足迹'},
                {label:'店铺收藏'},
                {label:'我的订单'},
                {label:'退出',type:'exit'},
            ]
        }
    },
    methods:{
        itemclick(item){
            if(item.type=='exit'){
                this.$store.commit('settoken','')
                localStorage.removeItem('token') 
                this.$router.push({path:'/login'})
            }
        }
    }
}
</script>

<style lang="stylus">
    .mineitem
        padding-top 5%
        font-size 14px
        text-align left 
        height 50px
        line-height 50px
        padding-left 5%
        border-bottom 1px solid #eeeeee
        .minetitle
            display inline-block 
            width 90%

    .heading
        width 100%
        height 200px
</style>