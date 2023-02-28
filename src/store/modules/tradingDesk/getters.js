export const getterTypes = {
  hasRemovedItem: "[trading desk] Has removed item",
}

export default {
  [getterTypes.hasRemovedItem]: (state) => {
    return Boolean(state.lastRemovedCard)
  },
}
