<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo','updateToken']),
      getUserInfo(e) {
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
        console.log(e);
        this.updateUserInfo(e.detail.userInfo)
        this.getToken(e.detail)
      },
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => err)
        if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败1！')
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        console.log(query);
        console.log("queryXXXXX2");
        const {
          data: loginResult
        } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        if (loginResult.meta.status == 200) return uni.$showMsg('登录失败2！')
        this.updateToken(loginResult.message.token)
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background: #F8F8F8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    // &::after{
    //   content:'';
    //   display:block;
    //   width: 100%;
    //   height: 40px;
    //   background: pink;
    //   position:absolute;
    //   left:0;
    //   bottom:0;
    // }
    .btn-login {
      width: 90%;
      background: #C00000;
      border-radius: 100px;
      margin: 15px 0;
    }

    .tips-text {
      color: gray;
      font-size: 12px;
    }
  }
</style>
