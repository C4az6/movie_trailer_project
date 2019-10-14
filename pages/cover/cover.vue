<template>
	<view class="black">
		<image :src="cover" mode="widthFix" class="cover"></image>
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
