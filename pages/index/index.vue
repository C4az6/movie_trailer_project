<template>
	<view class="page">
		<!-- 轮播图start -->
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="item in carouselList" :key="item.id">
				<image :src="item.image" class="carousel"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图end -->
		
		<!-- 热门超英start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="page-block hot">
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
				</view>
				<view class="movie-name">
					蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
				</view>
				<view class="movie-score-wapper">
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-yellow.png" class="start-icon"></image>
					<image src="../../static/icos/star-gray.png" class="start-icon"></image>
					<view class="movie-score">
						9.1
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 热门超英end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
