<template>
	<view class="page page-fill">
		<view class="page-block info-list">
			<!-- 头像 -->
			<view class="item-wapper face-line-upbottom" @click="operator">
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

			<!-- 昵称 -->
			<!-- 头像 -->
			<view class="item-wapper" @click="modifyNickName">
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
			<view class="item-wapper" @click="modifyBirthday">
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
			<view class="item-wapper" @click="modifyGender">
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
			<view class="footer-words" style="margin-top: 10upx;" @click="logout">退出登录</view>
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
			// 修改性别
			modifyGender(){
				uni.navigateTo({
					url: '../meGender/meGender'
				})
			},
			// 修改生日
			modifyBirthday(){
				uni.navigateTo({
					url: '../meBirthday/meBirthday'
				})
			},
			// 修改昵称
			modifyNickName(){
				uni.navigateTo({
					url: '../meNickname/meNickname'
				})
			},
			// 操作头像
			operator() {
				let userInfo = this.getGlobalUser('userInfo');
				uni.showActionSheet({
					itemList: ["查看我的头像", "从相册中选择上传"],
					success: res => {
						if (res.tapIndex == 0) {
							// 预览头像
							let faceArray = []
							faceArray.push(this.userInfo.faceImage)
							// 头像预览
							uni.previewImage({
								urls: faceArray,
								current: faceArray[0]
							})
						} else if (res.tapIndex == 1) {
							// 选择上传头像
							uni.chooseImage({
								count: 1,
								sizeType: ["compressed"],
								sourceType: ["album"],
								success: (res) => {
									// 获得临时路径
									let tempFilePaths = res.tempFilePaths[0];
									// #ifdef H5
									// 跳转到头像图片展示页面
									uni.navigateTo({
										url: `../meFace/meFace?tempFilePaths=${tempFilePaths}`
									})
									// #endif
									// #ifndef H5
									uni.navigateTo({
										url: "../faceCrop/faceCrop?tempFilePaths=" + tempFilePaths
									})
									// #endif 
								}
							})
						}
					}
				});
			},
			// 用户退出登录
			logout() {
				// 获取localStorage里面的用户信息
				let userInfo = this.getGlobalUser('userInfo');
				// 发送退出登录的请求
				uni.request({
					url: this.baseUrl + `/user/logout?userId=${userInfo.id}&&qq=1335436466`,
					method: 'POST',
					success: (res) => {
						if (res.data.status == 200) {
							uni.removeStorageSync("userInfo");
							uni.switchTab({
								url: '../me/me'
							})
						}
					}
				})

			},
			// 清理缓存按钮
			clearStorage() {
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
