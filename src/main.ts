import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/scss/common.scss'
import './assets/scss/theme.scss'
import SvgIcon from './components/SvgIcon/index.vue'// svg component

const app = createApp(App)

app.use(router).component('svg-icon', SvgIcon)
const req = require.context('./icons/svg', false, /\.svg$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
requireAll(req)
app.mount('#app')
