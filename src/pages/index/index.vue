<script setup lang="ts">

import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue'
import { postLoginWxMini } from '@/services/login'
import type { LoginData } from '@/services/login'



let avatarUrl = ref({
  url: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
});

let bool = ref(false)

let code = ''
let uuid = ''

onLoad(async () => {
  const option = uni.getLaunchOptionsSync()
  uuid = option.query?.uuid
  postLogin({ code })

})


const onGetPhoneNumber: UniHelper.ButtonOnGetphonenumber = (event) => {
  const mobileCode = event.detail!.code!

  const iv = event.detail!.iv!
  const encryptedData = event.detail!.encryptedData!
  if (mobileCode) {
    postLogin({
      code: "",
      mobileCode: mobileCode,
      encryptedData: encryptedData,
      ivStr: iv
    })
  }
  console.log("获取到的数据:", event, code, mobileCode, encryptedData, iv, mobileCode)
}

const postLogin = (loginData: LoginData) => {
  uni.login({
    provider: 'weixin',
    success: (res) => {
      loginData.code = res.code
      loginData.uuid = uuid
      postLoginWxMini(loginData)
        .then((data) => {
          if(data.status != 200 || data.data!.code != 200){
            bool.value = true
            console.log("请注册账号",data);
          }else{
            bool.value = false
          }
        }).catch((err => {
          bool.value = true
          console.log("响应失败", err);
        }))
    },
  })
}


const onbindchooseavatar: UniHelper.ButtonOnChooseavatar = (event) => {
  avatarUrl.value.url = event.detail!.avatarUrl!
  console.log("获取头像:", avatarUrl.value.url);

}


</script>

<template>
  <view class="content">
    <button  class="avatar-wrapper logo" open-type="chooseAvatar" @chooseavatar="onbindchooseavatar">
      <image class="avatar" :src="avatarUrl.url"></image>
    </button>

    <view v-if="bool"  class="text-area login">
      <button class="button phone" type="primary" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
        <text class="icon icon-phone"></text>
        一键登录
      </button>
    </view>
    <view class="tips">登录/注册即视为你同意《服务条款》和《隐私协议》</view>
  </view>
</template>


<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
}

.avatar {
  position: absolute;
  left: 0;
  height: 200rpx;
  width: 200rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.phone {
  background-color: #2ec2a2;
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
