<template>
	<view class="page page-fill">
		<form @submit="fromSubmitNickname">
			<view class="page-block" style="margin-top: 20upx;">
				<input 
				type="text" 
				name="nickname" 
				:value="userInfo.nickname" 
				class="input" 
				placeholder="请输入昵称" 
				placeholder-class="graywrods"
				maxlength="10">
			</view>
			<button type="primary" form-type="submit" class="submit-btn">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			fromSubmitNickname(e){
				let modifyNickname = e.detail.value.nickname;
				// 发送修改昵称的请求
				uni.request({
					url: this.baseUrl + `/user/modifyUserinfo?qq=1335436466`,
					method: 'POST',
					data: {
						'nickname': modifyNickname,
						'userId': this.userInfo.id,
					},
					header: {
						"headerUserId": this.userInfo.id,
						"headerUserToken": this.userInfo.userUniqueToken,
					},
					success: (res) => {
						uni.setStorageSync('userInfo', res.data.data);
						// 返回上一页
						uni.navigateBack({
							delta:1
						})
					}
				})
			}
		},
		onLoad() {
			// 获取localStorage里面的缓存数据
			let userInfo = this.getGlobalUser('userInfo');
			this.userInfo = userInfo;
		}
	}
</script>

<style>
/* 页面铺满屏幕 */
.page-fill {
	width: 100%;
	height: 100%;
	position: absolute;
}

.graywrods {
	color: #EAEAEA;
}

.input {
	height: 80upx;
	line-height: 80upx;
	width: 500upx;
	margin-left: 40upx;
}

.submit-btn {
	margin-top: 40upx;
	width: 90%;
}
</style>
