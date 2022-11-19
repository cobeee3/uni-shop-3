<template>
  <view>
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滑动 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChange(i)">{{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧滑动 -->
      <scroll-view :style="{height:wh+'px'}" scroll-y="true" :scroll-top="scrollTop">
        <block v-for="(item2,i2) in cateLevel2" :key="i2">
          <view class="cate-lv2">
            <view class="cate-lv2-title">
              / {{item2.cat_name}}/
            </view>
            <!-- 三级目录s -->
            <view class="cate-lv3-list">
              <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click=gotoGoodsList(item3)>
                <image :src="item3.cat_icon" mode="widthFix"></image>
                <text>{{item3.cat_name}}</text>
              </view>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList: [],
        active: 0,
        cateLevel2: [],
        cateLevel3: [],
        scrollTop:0
      };
    },
    onLoad() {
      const sysinfo = uni.getSystemInfoSync();
      this.wh = sysinfo.windowHeight-50;
      this.getCateList();
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories');
        if (res.meta.status !== 200) return uni.$showMsg();
        this.cateList = res.message;
        this.cateLevel2 = this.cateList[0].children;
        this.cateLevel3 = this.cateLevel2[0].children;
      },
      activeChange(i) {
        this.active = i;
        this.cateLevel2 = this.cateList[i].children;
        this.cateLevel3 = this.cateLevel2[i].children;
        this.scrollTop = this.scrollTop ===0?1:0;
      },
      gotoGoodsList(item3){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+ item3.cat_id
        })
      },
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #F7F7F7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #fff;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY (-50%);

          }
        }
      }
    }

  .cate-lv2 {
      .cate-lv2-title {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
      }
    }
  .cate-lv3-list{
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 28%;
      border: 1px solid black;
      margin-bottom: 10px;
      image{
        width: 60px;
        height: 60px;
      }
      text{
        font-size: 12px;
      }
    }
  }

  }
</style>
