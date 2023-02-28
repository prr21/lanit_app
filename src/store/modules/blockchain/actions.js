import { setToLocalStorage, getFromLocalStorage } from "@/helpers/utils"
import { mutationTypes } from "./mutations"

export const actionTypes = {
  addTransaction: "[blockchain] Add one transaction",
  setTransactions: "[blockchain] Set array of transactions",
  setTransactionsFromStorage: "[blockchain] Set transactions from storage",
  setConnectionStatus: "[blockchain] Set connection status",
}
export default {
  [actionTypes.addTransaction]({ commit, state }, transaction) {
    commit(mutationTypes.ADD_TRANSACTION, transaction)
    setToLocalStorage(state.transactionsKey, state.transactions)
  },

  [actionTypes.setTransactions]({ commit, state }, transaction) {
    commit(mutationTypes.SET_TRANSACTIONS, transaction)
    setToLocalStorage(state.transactionsKey, state.transactions)
  },

  [actionTypes.setTransactionsFromStorage]({ commit, state }) {
    const savedTransactions = getFromLocalStorage(state.transactionsKey)
    if (savedTransactions) {
      commit(mutationTypes.syncTransactions, savedTransactions)
    }
  },

  [actionTypes.setConnectionStatus]({ commit }, value) {
    commit(mutationTypes.SET_CONNECTION_STATUS, value)
  },
}
