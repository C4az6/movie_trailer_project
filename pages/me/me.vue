<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userIsLogin">
				<!-- 用户如果登录了，就显示用户自己头像 -->
				<image src="../../static/icos/108x108.png" class="face"></image>
			</view>
			<view v-else>
				<!-- 用户如果没有登录，就显示默认头像 -->
				<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
			</view>
	
			<view class="info-wapper" v-if="userIsLogin">
				<view class="nickname">NEXT 学院</view>
				<view class="nav-info">ID: 123456789wasd</view>
			</view>
			<view v-else>
				<view class="nickname regist-login">登录 / 注册</view>
			</view>

			<view class="set-wapper" v-if="userIsLogin">
				<image src="../../static/icos/settings.png" class="settings"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 默认用户是未登录状态
				userIsLogin: false
			}
		},
		methods: {

		}
	}
</script>

<style>
	@import url("me.css");
</style>
