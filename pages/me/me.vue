<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userIsLogin">
				<!-- 用户如果登录了，就显示用户自己头像 -->
				<image :src="userInfo.faceImage" class="face"></image>
			</view>
			<view v-else>
				<!-- 用户如果没有登录，就显示默认头像 -->
				<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
			</view>
	
			<view class="info-wapper" v-if="userIsLogin">
				<view class="nickname">{{userInfo.nickname}}</view>
				<view class="nav-info">{{userInfo.id}}</view>
			</view>
			<view v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">登录 / 注册</view>
				</navigator>
			</view>

			<view class="set-wapper" v-if="userIsLogin">
				<navigator url="../meInfo/meInfo">
					<image src="../../static/icos/settings.png" class="settings"></image>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 默认用户是未登录状态
				userIsLogin: false,
				userInfo: {}
			}
		},
		methods: {

		},
		// 页面显示时候的生命周期函数
		onShow(){
			// 用户状态的切换
			let userInfo = this.getGlobalUser("userInfo");
			if(userInfo != null) {
				this.userIsLogin = true;
				this.userInfo = userInfo
			}else {
				this.userIsLogin = false;
				this.userInfo = {};
			}
		}
	}
</script>

<style>
	@import url("me.css");
</style>
