<template>
	<view class="page page-fill">
		<view class="page-block info-list">
			<!-- 头像 -->
			<view class="item-wapper face-line-upbottom">
				<view class="info-words">头像</view>
				
				<view class="right-wapper">
					<image :src="userInfo.faceImage" class="face"></image>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
		<!-- 用户名 -->
			<!-- 头像 -->
			<view class="item-wapper">
				<view class="info-words">昵称</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						{{userInfo.nickname}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 生日 -->
			<view class="item-wapper">
				<view class="info-words">生日</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						{{userInfo.birthday}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			<!-- 性别 -->
			<view class="item-wapper">
				<view class="info-words">性别</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						<view v-if="userInfo.sex == 1">
							男
						</view>
						<view v-else-if="userInfo.sex == 0">
							女
						</view>
						<view v-else>
							未选择
						</view>
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="footer-wapper">
			<view class="footer-words" @click="clearStorage">清理缓存</view>
			<view class="footer-words" style="margin-top: 10upx;">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			clearStorage(){
				uni.clearStorageSync();
				uni.showToast({
					title: "清理缓存成功",
					mask: false,
					duration: 1500
				})
			}
		},
		onShow() {
			let userInfo = this.getGlobalUser('userInfo');
			this.userInfo = userInfo;
		}
	}
</script>

<style>
	@import url("meInfo.css");
</style>
