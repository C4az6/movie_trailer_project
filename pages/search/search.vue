<template>
	<view class="page">
		<view class="search-block">
			<view class="search-icon-wapper">
				<image src="/static/icos/search.png" class="search-ico"></image>
			</view>
			<input placeholder="搜索预告" 
			type="text" 
			maxlength="10" 
			class="search-text"
			confirm-type="search"
			@confirm="searchMe"
			/>
		</view>

		<view class="movie-list page-block">
			<view class="movie-wapper" v-for="item in trailerList" :key="item.id">
				<image 
				:src="item.cover"
				:data-trailerId="item.id"
				@click="showTrailer(item.id)"
				 class="poster"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trailerList: [],
				keywords: '',		// 搜索的关键字
				page: 1,		// 当前第几页
				totalPages: 1		// 总页数
			}
		},
		methods: {
			showTrailer(trailerId){
				// 获取自定义参数
				// let trailerId = e.currentTarget.dataset.trailerid
				// 页面跳转接口API
				uni.navigateTo({
					url: `../movie/movie?trailerId=${trailerId}`
				})
			},
			searchMe(e){
				// 获取搜索的内容
				let value = e.detail.value;
				this.keywords = value;
				this.trailerList = [];
				
				this.pagedTrailerList(value, 1, 15)
			},
			pagedTrailerList(keywords, page, pageSize){
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				
				// 查询猜你喜欢列表
				uni.request({
					url: this.baseUrl + '/search/list',
					method: 'post',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						qq: '1335436466',
						keywords,
						page,
						pageSize
					},
					success: res => {
						if (res.data.status === 200) {
							let tempList = res.data.data.rows
							this.trailerList = this.trailerList.concat(tempList);
							this.totalPages = res.data.data.total;		// 获取总页数
							this.page = page;		// 覆盖当前页面的page
						}
					},
					complete: () => {
						// 拿到数据后隐藏loading效果
						uni.hideLoading();
						// 拿到数据后隐藏刷新效果
				
					}
				});
			}
		},
		onLoad() {
			this.pagedTrailerList(this.keywords, 1, 15)
		},
		// 页面触底时的钩子函数
		onReachBottom(){
			let page = this.page + 1;		// 查询下一页面，当前页数累加1
			let keywords = this.keywords;		// 获取当前页面中data里的搜索值
			let totalPages = this.totalPages		// 获取总页数
			
			// 如果当前需要分页的分页数和总页数相等，就不分页
			if(page > totalPages) {
				return;
			}
			// 每页显示15条数据
			this.pagedTrailerList(keywords,page,15)
		}
	}
</script>

<style>
	@import url("search.css");
</style>
