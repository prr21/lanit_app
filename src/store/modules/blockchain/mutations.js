export const mutationTypes = {
  ADD_TRANSACTION: "[blockchain] ADD_TRANSACTION",
  SET_TRANSACTIONS: "[blockchain] SET_TRANSACTIONS",
  SET_CONNECTION_STATUS: "[blockchain] SET_CONNECTION_STATUS",
}

export default {
  [mutationTypes.ADD_TRANSACTION](state, transaction) {
    state.transactions.push(transaction)
  },

  [mutationTypes.SET_TRANSACTIONS](state, transactions) {
    state.transactions = transactions
  },

  [mutationTypes.SET_CONNECTION_STATUS](state, value) {
    state.isConnecting = value
  },
}
