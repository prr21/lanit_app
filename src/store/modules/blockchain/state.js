import { getFromLocalStorage } from "@/helpers/utils"
import { transactionsLocalStorageKey } from "@/helpers/vars"

export default {
  isConnecting: false,
  transactions: getFromLocalStorage(transactionsLocalStorageKey) || [],
  transactionsKey: transactionsLocalStorageKey,
}
