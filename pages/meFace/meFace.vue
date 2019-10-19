<template>
	<view class="page page-fill">
		<view class="pending-wapper">
			<image id="face" :src="tempFilePaths" class="pending-face" mode="scaleToFill"></image>
		</view>
		
		<view class="notice">
			<view class="notice-words">
				请从相册中选择合适的图片哦~
			</view>
		</view>
		
		<view class="footer-opertor">
			<view class="opertor-words" @click="reSelect">重新选择</view>
			<view class="opertor-words" @click="upload">确认上传</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempFilePaths: ''
			}
		},
		methods: {
			// 确认上传
			upload(){
				let userInfo = this.getGlobalUser('userInfo');
				uni.showLoading({
					mask: true,
					title: '正在上传,请稍后...'
				});
				uni.uploadFile({
					url: this.baseUrl + `/user/uploadFace?qq=1335436466&&userId=${userInfo.id}`,
					name: 'file',
					filePath: this.tempFilePaths,
					header: {
						"headerUserId": userInfo.id,
						"headerUserToken": userInfo.userUniqueToken
					},
					success: (res) => {
						let dataRes = JSON.parse(res.data);
						if(dataRes.status == 200){
							let userInfo = dataRes.data;
							// 覆盖localStorage里面的缓存数据
							uni.setStorageSync("userInfo", userInfo);
							// 返回到上一个页面
							uni.navigateBack({
								delta: 1
							})
						}else if (dataRes.status == 502 || dataRes.status == 500) {
							uni.showToast({
								title: dataRes.msg,
								image: "../../static/icos/error.png"
							})
						}
					},
					complete: () => {
						// 隐藏加载框
						uni.hideLoading();
					}
				})
			},
			reSelect(){
				// 重新选择头像
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album"],
					success: (res) => {
						// 获得临时路径
						let tempFilePaths = res.tempFilePaths[0];
						this.tempFilePaths = tempFilePaths;
					}
				})
			}
		},
		onLoad(params){
			console.log(params);
			this.tempFilePaths = params.tempFilePaths;
		}
	}
</script>

<style>
@import url("meFace.css");
</style>
