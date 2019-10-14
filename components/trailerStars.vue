<template name="trailerStars">
	<view class="movie-score-wapper">
		<image 
		v-for="yello in yelloScore"
		src="/static/icos/star-yellow.png" 
		class="start-icon">
		</image>
		
		<image 
		v-for="gray in grayScore"
		src="/static/icos/star-gray.png" 
		class="start-icon"></image>
		
		<view class="movie-score" v-if="showNum == 1">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'trailerStars',
		data() {
			return {
				yelloScore: 0,
				grayScore: 0
			};
		},
		
		props:{
			innerScore: 0,		// 定义外部传入的分数
			showNum: 0		// 是否需要
		},
		
		// 生命周期组件创建完成后被调用
		created(){
			let tempScore = 0
			if(this.innerScore != null && this.innerScore != undefined && this.innerScore != ''){
				tempScore = this.innerScore
			}
			
			let yelloScore = parseInt(tempScore / 2);
			let grayScore =  5 - yelloScore;
			this.yelloScore = yelloScore;
			this.grayScore = grayScore;
		}
	}
</script>

<style>
	.movie-score-wapper {
		display: flex;
		flex-direction: row;
	}
	
	.start-icon {
		width: 20upx;
		height: 20upx;
		margin-top: 6px;
	}
	
	.movie-score {
		font-size: 12px;
		color: grey;
		margin-left: 8upx;
		padding-top: 4upx;
	}
</style>
