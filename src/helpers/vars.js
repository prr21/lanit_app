export const cardsLocalStorageKey = "cards"
export const removedCardLocalStorageKey = "removedCard"
export const transactionsLocalStorageKey = "transactions"

export const blockchainWebSocketCfg = {
  url: "wss://ws.blockchain.info/inv",
  subscribeCommand: { op: "unconfirmed_sub" },
  unsubscribeCommand: { op: "unconfirmed_unsub" },
}

export const cardConfig = {
  width: 300,
  height: 100,
  zIndex: 1,
  isActive: false,
  theme: "light",
}
