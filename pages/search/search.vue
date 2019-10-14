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
				<image :src="item.cover" class="poster"></image>
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
					keywords: '',
					page: '',
					pageSize: ''
				},
				success: res => {
					if (res.data.status === 200) {
						this.trailerList = res.data.data.rows
					}
				},
				complete: () => {
					// 拿到数据后隐藏loading效果
					uni.hideLoading();
					// 拿到数据后隐藏刷新效果

				}
			});
		},
	}
</script>

<style>
	@import url("search.css");
</style>
