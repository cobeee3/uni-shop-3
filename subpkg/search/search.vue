<template>
 <view >
   <view class="search-box">
     <uni-search-bar placeholder="搜索" clearButton="always" @input="input" :radius="100" cancelButton="none">
     </uni-search-bar>
    </view>
     <!-- searchList Begin -->
     <view class="sugg-list">
       <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
         <view class="goods-name">
           {{item.goods_name}}
         </view>
         <uni-icons type="arrowright"></uni-icons>
       </view>
     </view>
     <!-- searchList End -->
     <!-- history begin -->
     <view class="history-box">
       <view class="history-title">
         <text>搜索历史</text>
         <uni-icons type="trash" @click="clearHistory"></uni-icons>
       </view>
       <!-- 评论列表 -->
       <view class="history-list">
         <uni-tag :text="item2" v-for="(item2,i2) in historys" :key="i2" inverted="true" @click="gotoGoodsList(item2)">
         </uni-tag>
       </view>
     </view>
     <!-- history end -->
   </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResults: [],
        historyList: []
      };
    },
    onLoad(){
      this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
    },
    computed:{
      historys(){
        return [...this.historyList].reverse();
      }
    },
    methods: {
      input(e) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.kw = e;
          this.getSearchList();
        }, 500)
      },
      clearHistory(){
        this.historyList =[];
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + kw
        })
      },
      async getSearchList() {
        if (this.kw == "") {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsge();
        this.searchResults = res.message;
        this.saveSearchHistory();
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList);
        set.delete(this.kw);
        set.add(this.kw);
        this.historyList = Array.from(set);
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>