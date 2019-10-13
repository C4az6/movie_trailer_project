<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="item in carouselList" :key="item.id">
				<image :src="item.image" class="carousel"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: 'https://www.imovietrailer.com/superhero',
				carouselList: []
			}
		},
		onLoad() {
			uni.request({
				url: this.baseUrl + '/index/carousel/list',
				method: 'post',
				header:{
					'content-type':'application/x-www-form-urlencoded'
					},
				data: {
					qq: '1335436466'
				},
				success: res => {
					if (res.data.status === 200){
						this.carouselList = res.data.data
					}
				}


			});
		},
		methods: {

		}
	}
</script>

<style>
	@import url("index.css");
</style>
