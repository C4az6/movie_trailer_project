<template>
	<view class="page page-fill">
		<form @submit="formSubmitSex">
			<view class="page-block" style="margin-top: 20upx;">
				<radio-group class="radio-sex" @change="sexChange">
					<label class="radio-single">
						<view>
							<radio value="1" :checked="userInfo.sex == 1" />男
						</view>
					</label>
					<view class="line"></view>
					<label class="radio-single">
						<view>
							<radio value="0" :checked="userInfo.sex == 0" />女
						</view>
					</label>
				</radio-group>
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
			sexChange(e){
				let currentGender = e.detail.value;
				// 1 表示男  2 表示女
				this.userInfo.sex = currentGender
			},
			formSubmitSex(e){
				uni.request({
					url: this.baseUrl + `/user/modifyUserinfo?qq=1335436466`,	
					method: 'POST',
					data: {
						'sex': this.userInfo.sex,
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
			}
		},
		onLoad() {
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

	.gender-input {
		background-color: white;
		height: 80upx;
		line-height: 40upx;
		padding-left: 20upx;
	}


	.submit-btn {
		margin-top: 40upx;
		width: 90%;
	}
	
	.radio-sex {
		display: flex;
		flex-direction: column;
	}
	
	.radio-single {
		padding: 20upx;
	}
	
	.line {
		height: 1px;
		background-color: #DBDBDA;
	}
</style>
