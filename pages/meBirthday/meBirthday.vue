<template>
	<view class="page page-fill">
		<form @submit="formSubmitBirthday">
			<view class="page-block" style="margin-top: 20upx;">
				<picker mode="date" @change	= "birthdayChange">
					<input
					type="text" 
					name="birthday" 
					:value="userInfo.birthday"
					class="birth-input" 
					>
				</picker>
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
			// 提交表单
			formSubmitBirthday(e){
				uni.request({
					url: this.baseUrl + `/user/modifyUserinfo?qq=1335436466`,
					method: 'POST',
					data: {
						'birthday': this.userInfo.birthday,
						'userId': this.userInfo.id,
					},
					header: {
						"headerUserId": this.userInfo.id,
						"headerUserToken": this.userInfo.userUniqueToken,
					},
					success: (res) => {
						if (res.data.status == 200) {
							uni.setStorageSync('userInfo', res.data.data);
							// 返回上一页
							uni.navigateBack({
								delta:1
							})
						}
					}
				})
			},
			birthdayChange(e){
				this.userInfo.birthday = e.detail.value;
			}
		},
		onLoad(){
			// 获取localStorage里面的缓存数据
			let userInfo = this.getGlobalUser('userInfo');
			this.userInfo = userInfo;
		}
	}
</script>

<style>
.page-fill {
	width: 100%;
	height: 100%;
	position: absolute;
}

.birth-input {
	background-color: white;
	height: 80upx;
	line-height: 40upx;
	padding-left: 20upx;
}


.submit-btn {
	margin-top: 40upx;
	width: 90%;
}
</style>
