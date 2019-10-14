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
		
		<!-- 热门英超预告片 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/interest.png" class="hot-ico"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>
		
		<view class="hot-movies page-block">
			<video 
			v-for="item in hotTrailerList"
			:key="item.id"
			:src="item.trailer" 
			:poster="item.poster"
			class="hot-movie-single"
			controls></video>
		</view>
		<!-- 热门英超预告片 end -->
		
		<!-- 猜你喜欢 start-->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		
		<view class="page-block guess-u-like">
			<view class="single-like-movie" v-for="item in guessULikeList" :key="item.id">
				<image :src="item.cover" class="like-movie"></image>
				<view class="movie-desc">
					<view class="movie-title">
						{{item.name}}
					</view>
					<trailerStars :innerScore="9.1" showNum='0'></trailerStars>
					<view class="movie-info">
						{{item.basicInfo}}
					</view>
					<view class="movie-info">
						{{item.releaseDate}}
					</view>
				</view>
				<view class="movie-oper" @click="praiseMe">
					<image src="/static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">
						点赞
					</view>
					<view :animation="animationData" class="animation-opacity praise-me">+1</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 end -->
		
	</view>
</template>

<script>
	// 引入自定义评分组件
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		data() {
			return {
				carouselList: [],
				hotSuperHeroList: [],
				hotTrailerList: [],
				guessULikeList: [],
				animationData: {}
				
			}
		},
		// 页面卸载时的生命周期函数
		onUnload(){
			// 页面卸载的时候清除动画数据
			this.animationData = {}
		},
		onLoad() {
			// 在页面创建的时候，创建一个临时动画对象
			this.animation = uni.createAnimation()
			
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
			
			// 查询热门英超预告片
			uni.request({
				url: this.baseUrl + '/index/movie/hot',
				method: 'post',
				header:{
					'content-type':'application/x-www-form-urlencoded'
					},
				data: {
					qq: '1335436466',
					type: 'trailer'
				},
				success: res => {
					if (res.data.status === 200){
						this.hotTrailerList = res.data.data
					}
				}
			});
			
			// 查询猜你喜欢列表
			uni.request({
				url: this.baseUrl + '/index/guessULike',
				method: 'post',
				header:{
					'content-type':'application/x-www-form-urlencoded'
					},
				data: {
					qq: '1335436466'
				},
				success: res => {
					if (res.data.status === 200){
						this.guessULikeList = res.data.data
					}
				}
			});
		},
		methods: {
			// 实现点赞动画效果
			praiseMe(){
				// 构建动画数据，并且通过step来表示这组动画的完成
				this.animation.translateY(-60).opacity(1).step({duration: 400});
				
				// 导出动画数据到view组件，实现组件的动画效果
				this.animationData = this.animation.export();
				
				// 还原动画
				setTimeout(function() {
					this.animation.translateY(0).opacity(0).step({duration: 0});
					this.animationData = this.animation.export();
				}.bind(this), 500);
			}
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
