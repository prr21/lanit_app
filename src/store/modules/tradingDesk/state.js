import { getFromLocalStorage } from "@/helpers/utils"
import {
  cardsLocalStorageKey,
  removedCardLocalStorageKey,
} from "@/helpers/vars"

export default {
  cards: getFromLocalStorage(cardsLocalStorageKey),
  lastRemovedCard: getFromLocalStorage(removedCardLocalStorageKey),
  cardsKey: cardsLocalStorageKey,
  removedCardKey: removedCardLocalStorageKey,
}
