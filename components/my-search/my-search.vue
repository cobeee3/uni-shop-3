<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box"  :style="{'border-radius':radius+'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods:{
      searchBoxHandler(){
        console.log('!!!~~~');
        this.$emit('click')
      }
    },
    props:{
      bgcolor:{
        type:String,
        default:'#C00000'
      },
      radius:{
        type:Number,
        default:18
      }
    }
    
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  // background: #C00000;
  display: flex;
  padding: 0 10px;
  align-items: center;
   .my-search-box{
     height: 36px;
     margin: 0 auto;
     // border-radius: 18px;
     background: #fff;
     display: flex;
     justify-content: center;
     align-items: center;
     width: 100%;
      .placeholder{
        font-size: 15px;
        margin-left:5px
      
      }
   }
}
</style>