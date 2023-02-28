import Vue from "vue"
import VueRouter from "vue-router"
// import TradingDeskView from "../views/TradingDeskView"
// import BlockchainView from "../views/BlockchainView"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/TradingDeskView.vue"),
  },
  {
    path: "/blockchain",
    name: "blockchain",
    component: () => import("../views/BlockchainView"),
  },
]

const router = new VueRouter({
  routes,
})

export default router
