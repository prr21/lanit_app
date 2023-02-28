import { setToLocalStorage } from "@/helpers/utils"
import { mutationTypes } from "./mutations"

export const actionTypes = {
  changeCardSizes: "[trading desk] Apply changes for card",
  addCard: "[trading desk] Add new card",
  setCards: "[trading desk] Set array of cards",
  setActive: "[trading desk] Make card active",
  unsetActive: "[trading desk] Make card unactive",
  setCardToTop: "[trading desk] Set card on the top by changing z-index",
  removeCard: "[trading desk] Remove card from array",
  clearRemovedCard: "[trading desk] Clear removed card from state",
}

export default {
  [actionTypes.changeCardSizes]({ commit, state }, payload) {
    commit(mutationTypes.CHANGE_CARD_SIZES, payload)
    setToLocalStorage(state.cardsKey, state.cards)
  },

  [actionTypes.addCard]({ commit, state }, card) {
    commit(mutationTypes.ADD_CARD, card)
    setToLocalStorage(state.cardsKey, state.cards)
  },

  [actionTypes.setCards]({ commit, state }, cards) {
    commit(mutationTypes.SET_CARDS, cards)
    setToLocalStorage(state.cardsKey)
  },

  [actionTypes.setActive]({ commit, state }, { index }) {
    for (let i = 0, l = state.cards.length; i < l; i++) {
      if (i === index) {
        commit(mutationTypes.CHANGE_ACTIVE_VALUE, { index, value: true })
        continue
      }
      commit(mutationTypes.CHANGE_ACTIVE_VALUE, { index: i, value: false })
    }
    setToLocalStorage(state.cardsKey, state.cards)
  },

  [actionTypes.unsetActive]({ commit, state }, { index }) {
    commit(mutationTypes.CHANGE_ACTIVE_VALUE, { index, value: false })
    setToLocalStorage(state.cardsKey, state.cards)
  },

  [actionTypes.setCardToTop]({ commit, state }, { index }) {
    const len = state.cards.length

    if (state.cards[index].zIndex === len) {
      return
    }
    commit(mutationTypes.CHANGE_Z_INDEX, { index, zIndex: len })

    for (let i = 0, l = len; i < l; i++) {
      const zIndexCur = state.cards[i].zIndex

      if (i === index) continue
      if (zIndexCur === 0) continue

      commit(mutationTypes.CHANGE_Z_INDEX, {
        index: i,
        zIndex: zIndexCur - 1,
      })
    }
    setToLocalStorage(state.cardsKey, state.cards)
  },

  [actionTypes.removeCard]({ commit, state }, { id }) {
    const cardToRemove = state.cards.find((card) => card.id === id)
    const restCards = state.cards.filter((card) => card.id !== id)

    commit(mutationTypes.SET_REMOVED_CARD, cardToRemove)
    commit(mutationTypes.SET_CARDS, restCards)

    setToLocalStorage(state.cardsKey, state.cards)
    setToLocalStorage(state.removedCardKey, cardToRemove)
  },

  [actionTypes.clearRemovedCard]({ commit, state }) {
    commit(mutationTypes.CLEAR_REMOVED_CARD)
    setToLocalStorage(state.removedCardKey, null)
  },
}
