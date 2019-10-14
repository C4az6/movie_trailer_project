<template>
	<view class="page">
		<view class="search-block">
			<view class="search-icon-wapper">
				<image src="/static/icos/search.png" class="search-ico"></image>
			</view>
			<input placeholder="搜索预告" type="text" maxlength="10" class="search-text" focus>
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
				trailerList: []
			}
		},
		methods: {

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
		}
	}
</script>

<style>
	@import url("search.css");
</style>
