<template>
	<view class="page">
		<!-- 视频播放 start -->
		<view class="player">
			<video :src="trailerInfo.trailer" :poster="trailerInfo.poster" class="movie" controls></video>
		</view>
		<!-- 视频播放 end -->

		<!-- 影片基本信息 start -->
		<view class="movie-info">
			<navigator :url='`../cover/cover?cover=${trailerInfo.cover}`'>
				<image :src="trailerInfo.cover" class="cover"></image>
			</navigator>
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
						<block v-if="trailerInfo.score >= 0">
							<trailerStars :innerScore="trailerInfo.score" showNum='0'></trailerStars>
						</block>

						<view class="prise-counts">{{trailerInfo.prisedCounts}} 人点赞</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 影片基本信息 end -->

		<view class="line-wapper">
			<view class="line"></view>
		</view>

		<!-- 剧情介绍 start -->
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{trailerInfo.plotDesc}}</view>
		</view>
		<!-- 剧情介绍 end -->
		
		<!-- 演职人员 start -->
		<view class="scroll-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x="true" class="scroll-list">
				<view 
					class="actor-wapper" 
					v-for="(director,staffIndex) in directorArray" 
					:key="director.staffId">
					<image
					:src="director.photo" 
					mode="aspectFill"
					@click="lookStaffs"
					:data-staffIndex='staffIndex'
					class="single-actor"></image>
					<view class="actor-name">{{director.name}}</view>
					<view class="actor-role">{{director.actName}}</view>
				</view>
				<view 
				class="actor-wapper"
				v-for="(actor, actorIndex) in actorArray"
				:key="actor.staffId">
					<image
					:src="actor.photo" 
					mode="aspectFill"
					@click="lookStaffs"
					:data-staffIndex='actorIndex +directorArray.length'
					class="single-actor"></image>
					<view class="actor-name">{{actor.name}}</view>
					<view class="actor-role">{{actor.actName}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 演职人员 end -->
		
		<!-- 剧照 start -->
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x="true" class="scroll-list">
				<image 
				v-for="(img, imgIndex) in plotPicsArray" 
				:key="img"
				:src="img" 
				mode="aspectFill"
				class="plot-image"
				@click="lookMe(imgIndex)"></image>
			</scroll-view>
		</view>
		<!-- 剧照 end -->
	</view>
</template>

<script>
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		data() {
			return {
				trailerInfo: {},
				plotPicsArray: [], // 剧照
				directorArray: [], // 导演列表
				actorArray: [], // 演员列表
			}
		},
		methods: {
			// 演职人员预览
			lookStaffs(e){
				let staffIndex = e.currentTarget.dataset.staffindex;
				// 拼接导演和演员的数组，成为一个新数组
				let directorArray = this.directorArray;
				let actorArray = this.actorArray;
				let newStaffArray = [];
				newStaffArray = newStaffArray.concat(directorArray).concat(actorArray)
				
				let urls = [];
				for(var i = 0; i < newStaffArray.length; i++){
					let tempPhoto = newStaffArray[i].photo;
					urls.push(tempPhoto);
				}
				uni.previewImage({
					urls: urls,
					current: urls[staffIndex]
				})
			},
			// 剧照预览
			lookMe(imgIndex){
				uni.previewImage({
					urls: this.plotPicsArray,
					current: this.plotPicsArray[imgIndex]
				})
			}
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
						// 把剧照的字符串转换成JSON array
						this.plotPicsArray = JSON.parse(this.trailerInfo.plotPics)

					}
				}
			});

			// 获取导演数据信息
			uni.request({
				url: this.baseUrl + `/search/staff/${trailerId}/${1}`,
				method: 'post',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					qq: '1335436466'
				},
				success: res => {
					if (res.data.status === 200) {
						this.directorArray = res.data.data
					}
				}
			});

			// 获取演员数据信息
			uni.request({
				url: this.baseUrl + `/search/staff/${trailerId}/${2}`,
				method: 'post',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					qq: '1335436466'
				},
				success: res => {
					if (res.data.status === 200) {
						this.actorArray = res.data.data
					}
				}
			});

		},
		// 此函数仅仅只支持在小程序端的分享，分享到微信群和微信好友
		onShareAppMessage(res) {
			return {
				title: this.trailerInfo.name,
				path: `/pages/movie/movie?trailerId=${this.trailerInfo.id}`
			}
		},
		// 监听导航栏的按钮
		onNavigationBarButtonTap(e){
			let index = e.index;
			let trailerInfo = this.trailerInfo;
			let trailerId = trailerInfo.id;
			let trailerName = trailerInfo.name;
			let cover = trailerInfo.cover;
			let poster = trailerInfo.poster;
			
			if (index == 0) {
				// 分享
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: `https://www.imovietrailer.com/#/pages/movie/movie?trailerId=${trailerId}`,
					title: `NEXT超英预告：${trailerName}`,
					summary: `NEXT超英预告：${trailerName}`,
					imageUrl: cover,
					success: (res) => {
						console.log(res)
					}
				})
			}
		},
		components: {
			trailerStars
		}
	}
</script>

<style>
	@import url("movie.css");
</style>
