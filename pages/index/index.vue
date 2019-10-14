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
			<view class="single-poster" v-for="item in hotSuperHeroList" :key="item.id">
				<view class="poster-wapper">
					<image :src="item.cover" class="poster"></image>
				</view>
				<view class="movie-name">
					{{item.name}}
				</view>
				<!-- 使用评分组件 -->
				<trailerStars :innerScore="item.score" showNum='1'></trailerStars>
			</view>
		</scroll-view>
		<!-- 热门超英end -->
	</view>
</template>

<script>
	// 引入自定义评分组件
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		data() {
			return {
				carouselList: [],
				hotSuperHeroList: []
			}
		},
		onLoad() {
			// 查询轮播图
			uni.request({
				url: this.baseUrl + '/index/carousel/list?type=superhero',
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
			
			// 查询热门英超
			uni.request({
				url: this.baseUrl + '/index/movie/hot',
				method: 'post',
				header:{
					'content-type':'application/x-www-form-urlencoded'
					},
				data: {
					qq: '1335436466',
					type: 'superhero'
				},
				success: res => {
					if (res.data.status === 200){
						this.hotSuperHeroList = res.data.data
					}
				}
			});
		},
		methods: {

		},
		components: {
			// 注册自定义组件
			trailerStars
		}
	}
</script>

<style>
	@import url("index.css");
</style>
