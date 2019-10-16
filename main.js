import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.baseUrl = 'https://www.imovietrailer.com/superhero'		// 将baseUrl挂载到Vue的prototype中
Vue.prototype.getGlobalUser = (key)=>{
	let userInfo = uni.getStorageSync("userInfo");
	if(userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	}else {
		return null;
	}
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
