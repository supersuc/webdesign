<template>
    <div id="index">
        <!-- 轮播图 -->
        <cube-slide ref="slide" :data="items" @change="changePage">
            <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
                <a :href="item.url">
                    <img :src="item.image" class="slideimg">
                 </a>
            </cube-slide-item>
        </cube-slide>
        <!-- //滚动分类 -->
        <cube-slide ref="slidelists" :auto-play="false" :data="lists">
            <cube-slide-item v-for="(list, index) in lists" :key="index">
               <ul class="listul">
                   <li class="listli" v-for="(item,index1) in list" :key="index1">
                       <a :href="item.url">
                           <img :src="item.image">
                           <p>{{ item.label}}</p>
                       </a>
                   </li>
               </ul>
            </cube-slide-item>
        </cube-slide>
        <!-- //主页内容 -->
        <cube-scroll-nav ref="goodslist" :data="goods" @change="changeHandler">
            <cube-scroll-nav-panel v-for="(good,index) in goods" :key="index" :label="good.title">
              <ul class="goodul">
                  <li class="goodli" v-for="(item,index1) in good.foods" :key="index1">
                      <div>
                          <img :src="item.icon">
                          <p>{{item.name}}</p>
                      </div>
                  </li>
              </ul>
            </cube-scroll-nav-panel>
        </cube-scroll-nav>
        <!-- //主页内容 -->
    </div>
</template>


<script>
export default {
  data() {
    return {
        // 轮播数组
      items: [],
    //   滚动分类数组
      lists:[], 
      goods:[],
    }
  },
  methods: {
    changePage(current) {
    //   console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
      console.log(item, index)
    },
    changeHandler(label) {
      console.log('changed to:', label)
    }
  },
 async created(){
        try{
            //获取轮播图数据
            const items=await this.$http.get('/api/banner')
            this.items=items.data
            console.log(this.items)
            //获取滚动分类
            const lists=await this.$http.get('/api/rollinglist')
            this.lists=lists.data
            console.log(this.lists)
            //获取主页数据
            const goods=await this.$http.get('/api/goods')
            this.goods=goods.data
            console.log(this.goods)
        }catch(err){
            console.log(err)
        }
  }
}
</script>

<style lang="stylus">
  .cube-slide-item
      background-color #F6F6F6
  .listul
      width 97%
      margin-left 1.5%
      margin-top 5px
      margin-bottom 5px
      display flex
      flex-wrap wrap
      background-color #FFFFFF
      border-radius 10%
  .listli
      width 20%
      justify-content center
      img 
        width 35px
        height 35px
        border-radius 50%
        padding 5px 0
      p
        font-size 2px
        padding-bottom 10px
  .slideimg
      width 375px
      height 182px
  .cube-scroll-nav-panel-title
        font-size 21px 
        padding-top 20px
        padding-bottom 20px
  .cube-sticky
        background-color #F6F6F6
  .cube-scroll-nav-panels
        width 95%
        margin-top 8%
        margin-left 2.5%
        background-color #FFFFFF
  
  .goodul
      display flex
      flex-wrap wrap
  .goodli
      width 50%
      justify-content center
      img 
        width 150px
        height 150px
        padding 5px 0
      p
        font-size 16px
        padding-bottom 10px
</style>
