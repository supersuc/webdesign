<template>
    <div class="panelsbox">
        <!-- //左边导航 -->
        <cube-scroll class="leftpanels">
            <ul>
                <li v-for="(list,index) in tabslabel" @click="selectlist(index)" :class="list.active?'active':''" :key="index"> 
                    {{list.label}}
                </li>
            </ul>
        </cube-scroll>
        <!-- 右边内容 -->
        <cube-scroll class="rightpanels">
            <ul class="ultop">
                <li>热门分类</li>
                <li>排行榜></li>
            </ul>
            <ul class="ulbody">
                <li v-for="(tag,index) in tags" :key="index" :data="tags">
                    <img :src="tag.image">
                    <p>{{tag.label}} <i class="cubeic-add" @click="addtocart($event,tag)"></i></p>
                </li>
            </ul>
        </cube-scroll>
        <div class="ball-wrap">
            <transition
                @beforeEnter='beforeEnter'
                @enter='enter'
                @afterEnter='afterEnter'
            >
                <div class="ball" v-if="ball.show">
                    <div class="inner">
                        <i class="cubeic-add"></i>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ball:{
                show:false,
                el:''
            },
            tags:[],
            tabslabel:[
                {
                    label:'热门推荐',
                    active:true
                },
                {
                    label:'手机数码',
                    active:false
                },
                {
                    label:'家用电器',
                    active:false
                },
                {
                    label:'电脑办公',
                    active:false
                },
                {
                    label:'计生情趣',
                    active:false
                },
                {
                    label:'美妆护肤',
                    active:false
                },
                {
                    label:'个人清洁',
                    active:false
                },
                {
                    label:'清洁卫生',
                    active:false
                },
                {
                    label:'美妆护肤',
                    active:false
                },
                {
                    label:'个人清洁',
                    active:false
                },
                {
                    label:'清洁卫生',
                    active:false
                },
                {
                    label:'美妆护肤',
                    active:false
                },
                {
                    label:'个人清洁',
                    active:false
                },
                {
                    label:'清洁卫生',
                    active:false
                },
                {
                    label:'个人清洁',
                    active:false
                },
                {
                    label:'清洁卫生',
                    active:false
                },

            ]
        }
    },
    methods:{
        //点击左侧分类
        selectlist(index){
            this.tabslabel.forEach((val,ind)=>{
                if(index==ind){
                    val.active=true
                }else{
                    val.active=false
                }
            })
            this.getclassify(index)
        },
        //获取分类
       async getclassify(index){
                const result=await this.$http.get('/api/classify',{params:{type:index}})
                this.tags=result.data
                console.log(this.tags)
        },
        //添加商品到购物车
        addtocart(e,tag){
            this.$store.commit('tocart',tag)
            this.ball.show=true
            //获取点击元素
            this.ball.el=e.target
        },
        beforeEnter(el){
            //让小球移动到点击的位置
            //获取小球点击的位置
            const dom=this.ball.el
            console.log(dom) //获取点击位置的bom节点
            const rect=dom.getBoundingClientRect() //获取点击位置的dom位置，坐标
            console.log(rect)
            const x=rect.left-window.innerWidth*0.7-6 //6是为了让小球与点击位置重合
            const y=-(window.innerHeight-rect.top)+25 //25是为了让小球与点击位置重合
            console.log(x,y)
            el.style.display='block'
            el.style.transform=`translate3d(0,${y}px,0)`
            const inner=el.querySelector('.inner')
            inner.style.transform=`translate3d(${x}px,0,0)`
        },
        enter(el,done){
            //触发重绘
            document.body.offsetHeight
            //小球移动回到原点，就是购物车的位置
            el.style.transform=`translate3d(0,0,0)`
            const inner=el.querySelector('.inner')
            inner.style.transform=`translate3d(0,0,0)`
            //过渡完成后执行的事件
            el.addEventListener('transitionend',done)
        },
        afterEnter(el){
            //结束隐藏小球
           this.ball.show=false  
           el.style.display='none'
        },
    },
    created(){
        // 获取默认的分类数据
        this.getclassify(0)
    },
    mounted(){
        //设置滚动盒子的高度
         const leftpanels=document.querySelector('.leftpanels')
         const rightpanels=document.querySelector('.rightpanels')
         const bodyheight=document.documentElement.clientHeight
         leftpanels.style.height=bodyheight-57+'px'
         rightpanels.style.height=bodyheight-57+'px'
    }
}
</script>

<style lang="stylus">
    .ball-wrap
        .ball
            position fixed
            left 70%
            bottom 20px
            z-index 1003
            color red
            transition all 1s cubic-bezier(0.49,-0.29,0.75,0.41) //动画效果(贝塞尔曲线)
            .inner
                width 18px
                height 18px
                transition all 1s linear
                i 
                    font-size 22px
    .panelsbox
        display flex
        .leftpanels
            width 30%
            li
                height 50px
                line-height 50px
                border-bottom 1px soild #ffffff
                color #333
                background #f8f8f8
                font-size 14px
            .active
                background #ffffff
                color #e93b3d
        .rightpanels
            width 70%
            .ulbody
                padding-top 20px    
                display flex
                flex-wrap wrap
                li
                   margin-left 4px
                   padding-top 15px
                   width 30%
                   justify-content center
                   align-items center
                   font-size 12px
                   img 
                        width 80px
                        height 80px
            .ultop
                display flex
                justify-content space-between
                font-size 14px
                font-weight bold
                margin-top 20px
            .ultop>li:first-of-type
                font-weight bold
                margin-left 10px
            .ultop>li:last-of-type
                margin-right 10px
            
            

</style>