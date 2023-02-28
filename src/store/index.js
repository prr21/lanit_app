import Vue from "vue"
import Vuex from "vuex"

import blockchain from "@/store/modules/blockchain"
import tradingDesk from "@/store/modules/tradingDesk"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    blockchain,
    tradingDesk,
  },
})
