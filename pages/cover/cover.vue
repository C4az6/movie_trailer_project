<template>
	<view class="black">
		<image :src="cover" mode="widthFix" class="cover" @longpress="operator"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover: ''
			}
		},
		methods: {
			operator(){
				uni.showActionSheet({
					itemList: ["保存图片到本地"],
					success: (res)=>{
						// 下标为0则下载
						if (res.tapIndex == 0){
							uni.showLoading({
								title: '图片保存中...'
							})
							uni.downloadFile({
								url: this.cover,
								success: (res) => {
									let tempFilePath = res.tempFilePath
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: (res) => {
											uni.showToast({
												title: "保存成功",
												duration: 2000
											})
										},
										complete: () => {
											uni.hideLoading()
										}
									})
								}
							});
						}
					}
				})
			}
		},
		onLoad(params) {
			const {cover} = params
			this.cover = cover
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: '#000000'
			});
		}
	}
</script>

<style>
.black {
	background-color: #000;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
}

.cover {
	align-self: center;
}
</style>
