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

			<!-- 第三方登录H5不支持，下面代码只在除H5平台以外的平台上编译 -->
			<!-- #ifndef H5 -->
			<view class="third-wapper">
				<view class="third-line">
					<view class="single-line">
						<view class="line"></view>
					</view>
					<view class="third-words">第三方账号登录</view>
					<view class="single-line">
						<view class="line"></view>
					</view>
				</view>

				<view class="thrid-icos-wapper">
					<!-- 5+app 用qq登录 小程序用微信小程序登录h5不支持 -->
					<!-- #ifdef APP-PLUS -->
					<image src="../../static/icos/weixin.png" class="third-ico"></image>
					<image src="../../static/icos/QQ.png" class="third-ico" style="margin-left: 80upx;"></image>
					<image src="../../static/icos/weibo.png" class="third-ico" style="margin-left: 80upx;"></image>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="getUserInfo" @getuserinfo="wxLogin" class="third-btn-ico"></button>
					<!-- #endif -->
				</view>
			</view>
			<!-- #endif -->
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			wxLogin(e) {
				let wxUserInfo = e.detail.userInfo;
				console.log(wxUserInfo);
				// 实现微信登录
				uni.login({
					provider: "weixin",
					success: (res) => {
						// console.log(res)
						// 获得微信登录的code授权码
						let code = res.code;
						console.log(code)
						uni.request({
							url: this.baseUrl + `/stu/mpWXLogin/${code}`,
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								"avatarUrl": wxUserInfo.avatarUrl,
								"nickName": wxUserInfo.nickName,
								"whichMP": 1,
								"qq": 'lee79914194'


							},
							success: (res) => {
								console.log(res)
							}
						});
					}
				})
			},
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
