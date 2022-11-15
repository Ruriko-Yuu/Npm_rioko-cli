import Home from "@/page/homepage/main";
const CONFIG = import.meta.globEager('./config/*.ts')
const config = [
  { path: '/', element: Home },
  ...Object.keys(CONFIG).map(e => CONFIG[e].default),
]
export default config