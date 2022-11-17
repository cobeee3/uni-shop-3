<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滑动区 -->
      <scroll-view scroll-y="true" style="height:300rpx">
        <view></view>
      </scroll-view>
      <!-- 右侧滑动区 -->
    </view>
    <view class="scroll-view-container">
      <!-- 左侧滑动 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
        <view class="left-scroll-view-item active">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
        <view class="left-scroll-view-item">xxxx</view>
      </scroll-view>
      <!-- 右侧滑动 -->
      <scroll-view scroll-y="true" :style="{height:wh+'px'}">
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
        <view>yyyy</view>
      </scroll-view>
    </view>
>>>>>>> cate
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh:0,
        cateList:[]
      };
    },
    onLoad(){
      const sysinfo = uni.getSystemInfoSync();
      this.wh = sysinfo.windowHeight;
      this.getCateList();
    },
    methods:{
     async getCateList(){
        const{data: res} = await uni.$http.get('/api/public/v1/categories');
        console.log('hello@');
        console.log(res);
        if(res.meta.status !==200) return uni.$showMsg();
        this.cateList = res.message;
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
  .left-scroll-view{
    width: 120px;
    .left-scroll-view-item{
      background-color: #F7F7F7;
      line-height: 60px;
      text-align:center; 
      font-size:12px;
      &.active{
        background-color: #fff;
        position: relative;
        &::before{
          content:' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top:50%;
          left:0;
          transform: translateY (-50%);
          
        }
      }
    }
  }
}

</style>
