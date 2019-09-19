import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store=new Vuex.Store({
  state: {
    token:'',
    cartarry:JSON.parse(localStorage.getItem('cartarry')) || [],//存储购物车的数组
  },
  mutations: {
    settoken(state,token){
      //设置vuex的token
      state.token=token
    },
    //添加商品到购物车
    tocart(state,tag){
      let goods=state.cartarry.find(v=>v.title==tag.label)
        if(goods){
            goods.cartCount+=1
        }else{
          state.cartarry.push({title:tag.label,cartCount:1})
        }
    },
    //购物车的加一
    cartadd(state,index){
      state.cartarry[index].cartCount++
    },
    cartremove(state,index){
      if(state.cartarry[index].cartCount>1){
        state.cartarry[index].cartCount--
      }else{
        if(window.confirm('确定从购物车删除此商品嘛？')){
          state.cartarry.splice(index,1)
        }
      }
    },
    //清空购物车
    clearcart(state){
      state.cartarry=[]
    },
  },
  actions: {

  },
  //相当于vue的计算属性computed
  getters:{
    countsum:state=>{
      let num=0
      state.cartarry.forEach(v=>{
        num+=v.cartCount 
      })
      return num
    }
  }
})
//监听每次调用mutations的时候，都会进这里，可以加事件
store.subscribe((mutations,state)=>{
  localStorage.setItem('cartarry',JSON.stringify(state.cartarry))
})
export default store
