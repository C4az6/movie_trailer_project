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
					<image src="../../static/icos/weixin.png" data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
					<image src="../../static/icos/QQ.png" data-logintype="qq" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
					<image src="../../static/icos/weibo.png" data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
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
			appOAuthLogin(e) {
				let logintype = e.currentTarget.dataset.logintype;
				console.log("logintype", logintype);
				uni.login({
					provider: logintype,
					success: (res) => {
						console.log("uni.login: ", JSON.stringify(res));
						uni.getUserInfo({
							provider: logintype,
							success: (loginInfo) => {
								console.log("loginInfo:", JSON.stringify(loginInfo));
								let userInfo = loginInfo.userInfo;
								let face = "";
								let nickname = "";
								let openIdOrUid = "";
								
								if (logintype == "weixin") {
									face = userInfo.avatarUrl;
									nickname = userInfo.nickName;
									openIdOrUid = userInfo.openId;
								} else if (logintype == "qq") {
									face = userInfo.figureurl_qq_2;
									nickname = userInfo.nickname;
									openIdOrUid = userInfo.openId;
								} else if (logintype == "sinaweibo"){
									openIdOrUid = userInfo.id;
									nickname = userInfo.nickname;
									face = userInfo.avatar_large;
								}
								//调用开发者后台，执行一键注册或登录
								uni.request({
									url: this.baseUrl + `/appUnionLogin/${logintype}`,
									method: 'POST',
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									data: {
										"face": face,
										"nickname": nickname,
										"openIdOrUid": openIdOrUid,
										"qq": "1335436466"
									},
									success: (res) => {
										console.log("登录返回的数据：", JSON.stringify(res))
										if(res.data.status == 200){
											let userInfo = res.data.data;
											// 保存用户信息到全局的缓存中
											uni.setStorageSync("userInfo", userInfo);
											// 切换页面跳转，使用tab切换的api
											uni.switchTab({
												url: '../me/me'
											})
										}
									}
								});
								
							}
						})
					}
				})
			},
			wxLogin(e) {
				let wxUserInfo = e.detail.userInfo;
				// 实现微信登录
				uni.login({
					provider: "weixin",
					success: (res) => {
						// 获得微信登录的code授权码
						let code = res.code;
						console.log(code);
						uni.request({
							url: this.baseUrl + `/mpWXLogin/${code}`,
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								"qq": '1335436466',
								"avatarUrl": wxUserInfo.avatarUrl,
								"nickName": wxUserInfo.nickName,
								"whichMP": 0
							},
							success: (res) => {
								let userInfo = res.data.data;
								// 保存用户信息到全局的缓存中
								uni.setStorageSync("userInfo", userInfo);
								// 切换页面跳转
								uni.switchTab({
									url: '../me/me'
								})
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
