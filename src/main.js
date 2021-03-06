import Vue from 'vue'
import App from './App'
import store from './store'
import 'weui-wxss/dist/style/weui.wxss'
import '@/../static/font/iconfont.wxss'
import bodAvatar from '@/components/bodAvatar'
import spinner from '@/components/view/spinner'
import recordStatus from '@/components/view/recordStatus'
import botTitleBar from '@/components/titleBar/botTitleBar'
import titleBar from '@/components/titleBar/titleBar'
import devicePadding from '@/components/view/devicePadding'
import daLogo from '@/components/view/daLogo'
import homeButton from '@/components/widget/homeButton'
import logoTitleBar from '@/components/titleBar/logoTitleBar'
import copyableText from '@/components/widget/copyableText'
import daText from '@/components/view/daText'
import daImage from '@/components/view/daImage'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

Vue.component('bod-avatar', bodAvatar)
Vue.component('spinner', spinner)
Vue.component('record-status', recordStatus)
Vue.component('bot-title-bar', botTitleBar)
Vue.component('title-bar', titleBar)
Vue.component('device-padding', devicePadding)
Vue.component('da-logo', daLogo)
Vue.component('home-button', homeButton)
Vue.component('logo-title-bar', logoTitleBar)
Vue.component('copyable-text', copyableText)
Vue.component('da-text', daText)
Vue.component('da-image', daImage)

const app = new Vue(App)
app.$mount()
