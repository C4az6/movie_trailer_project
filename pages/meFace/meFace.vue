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
			// 图片上传
			upload(){
				console.log('确认上传.');
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
