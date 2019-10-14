<template>
	<view class="page">
		<!-- 视频播放 start -->
		<view class="player">
			<video :src="trailerInfo.trailer" :poster="trailerInfo.poster" class="movie" controls></video>
		</view>
		<!-- 视频播放 end -->

		<!-- 影片基本信息 start -->
		<view class="movie-info">
			<image :src="trailerInfo.cover" class="cover"></image>

			<view class="movie-desc">
				<view class="title">{{trailerInfo.name}}</view>
				<view class="basic-info">{{trailerInfo.basicInfo}}</view>
				<view class="basic-info">{{trailerInfo.originalName}}</view>
				<view class="basic-info">{{trailerInfo.totalTime}}</view>
				<view class="basic-info">{{trailerInfo.releaseDate}}</view>

				<view class="score-block">
					<view class="big-score">
						<view class="socre-words">综合评分：</view>
						<view class="movie-score">{{trailerInfo.score}}</view>
					</view>
					<view class="score-starts">
						<trailerStars :innerScore="trailerInfo.score" showNum='0'></trailerStars>
						
						<view class="prise-counts">{{trailerInfo.prisedCounts}} 人点赞</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 影片基本信息 end -->
	</view>
</template>

<script>
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		data() {
			return {
				trailerInfo: {}
			}
		},
		methods: {

		},
		onLoad(params) {
			// 获取上一个页面传入的参数
			let trailerId = params.trailerId;

			// 获取预告片的详细信息
			uni.request({
				url: this.baseUrl + `/search/trailer/${trailerId}`,
				method: 'post',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					qq: '1335436466'
				},
				success: res => {
					if (res.data.status === 200) {
						this.trailerInfo = res.data.data
					}
				}
			});
		},
		components: {
			trailerStars
		}
	}
</script>

<style>
@import url("movie.css");
</style>
