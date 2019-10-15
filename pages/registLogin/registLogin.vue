<template>
	<view class="body">
		<view class="face-wapper">
			<image src="../../static/icos/default-face.png" class="face"></image>
		</view>
		
		<view class="info-wapper">
			<label class="words-lbl">账号</label>
			<input 
			type="text" 
			name="username" 
			value="" 
			placeholder-class="graywords"
			class="input" 
			placeholder="请输入用户名" >
		</view>
		
		<view class="info-wapper" style="margin-top: 40upx">
			<label class="words-lbl">密码</label>
			<input 
			type="text" 
			name="password" 
			value="" 
			placeholder-class="graywords"
			password="true"
			class="input" 
			placeholder="请输入密码" >
		</view>
		
		<button type="primary" style="margin-top: 60upx; width:80%">注册 / 登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("registLogin.css");
</style>
