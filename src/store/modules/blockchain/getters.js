export const getterTypes = {
  totalBtcOfTransactions: "[blockchain] Total BTC of transactions",
}

export default {
  [getterTypes.totalBtcOfTransactions]: (state) => {
    return state.transactions.length
      ? state.transactions.reduce((acc, cur) => (acc += cur.size), 0)
      : 0
  },
}
