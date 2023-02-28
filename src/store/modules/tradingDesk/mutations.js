export const mutationTypes = {
  SET_CARDS: "[trading desk] SET_CARDS",
  ADD_CARD: "[trading desk] ADD_NEW_CARD",
  CHANGE_CARD_SIZES: "[trading desk] CHANGE_CARD_SIZES",
  CHANGE_ACTIVE_VALUE: "[trading desk] CHANGE_ACTIVE_VALUE",
  CHANGE_Z_INDEX: "[trading desk] CHANGE_Z_INDEX",
  SET_REMOVED_CARD: "[trading desk] SET_REMOVED_CARD",
  CLEAR_REMOVED_CARD: "[trading desk] CLEAR_REMOVED_CARD",
}

export default {
  [mutationTypes.ADD_CARD](state, card) {
    state.cards.push(card)
  },

  [mutationTypes.SET_CARDS](state, cards) {
    state.cards = cards
  },

  [mutationTypes.CHANGE_CARD_SIZES](state, payload) {
    const { index, width, height, top, left } = payload

    state.cards[index].width = width
    state.cards[index].height = height
    state.cards[index].top = top
    state.cards[index].left = left
  },

  [mutationTypes.CHANGE_ACTIVE_VALUE](state, { index, value }) {
    state.cards[index].isActive = value
  },

  [mutationTypes.CHANGE_Z_INDEX](state, { index, zIndex }) {
    state.cards[index].zIndex = zIndex
  },

  [mutationTypes.SET_REMOVED_CARD](state, card) {
    state.lastRemovedCard = card
  },

  [mutationTypes.CLEAR_REMOVED_CARD](state) {
    state.lastRemovedCard = null
  },
}
