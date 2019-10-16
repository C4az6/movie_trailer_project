<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>

			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input type="text" name="username" value="" placeholder-class="graywords" class="input" placeholder="请输入用户名">
			</view>

			<view class="info-wapper" style="margin-top: 40upx">
				<label class="words-lbl">密码</label>
				<input type="text" name="password" value="" placeholder-class="graywords" password="true" class="input" placeholder="请输入密码">
			</view>

			<button type="primary" form-type="submit" style="margin-top: 60upx; width:80%">注册 / 登录</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			formSubmit(e) {
				let username = e.detail.value.username;
				let password = e.detail.value.password;
				// console.log(username,password)
				// 发起注册或者登录的请求
				uni.request({
					url: this.baseUrl + '/user/registOrLogin?qq=1335436466',
					// url: 'https://www.imovietrailer.com/superhero/user/registOrLogin?qq=lee34708890',
					method: "POST",
					data: {
						"username": username,
						"password": password
					},
					success: (res) => {
						const {
							status
						} = res.data;
						if (status === 200) {
							let userInfo = res.data.data;
							// 将用户对象信息保存到全局的缓存中
							uni.setStorageSync("userInfo", userInfo);
							// 切换页面跳转，使用tab切换的api
							uni.switchTab({
								url: "../me/me"
							});
							
						} else if (status === 500) {
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								image: "../../static/icos/error.png"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("registLogin.css");
</style>
