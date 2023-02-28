<template>
  <div>
    <div class="d-flex justify-content-between">
      <button
        class="btn btn-success px-5"
        :disabled="isConnecting"
        @click="onStart"
      >
        Запуск
      </button>
      <button
        class="btn btn-danger px-5"
        :disabled="!isConnecting"
        @click="onPause"
      >
        Остановка
      </button>
      <button
        class="btn btn-warning px-5"
        :disabled="!transactions.length"
        @click="onClear"
      >
        Сброс
      </button>
    </div>
    <div class="my-4">
      <h3 class="text-center">Sum {{ totalBtcOfTransactions }} BTC</h3>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-center">From</th>
            <th scope="col" class="text-center">To</th>
            <th scope="col" class="text-center">Sum</th>
          </tr>
        </thead>

        <tbody v-if="transactions.length">
          <tr v-for="transaction in transactions" :key="transaction.hash">
            <td>
              <div
                v-for="inp in transaction.inputs"
                :key="inp.prev_out.addr + inp.prev_out.value"
              >
                {{ inp.prev_out.addr }}
              </div>
            </td>
            <td>
              <div v-for="out in transaction.out" :key="out.addr + out.value">
                {{ out.addr }}
              </div>
            </td>
            <td>{{ transaction.size }} BTC</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"

import { actionTypes } from "@/store/modules/blockchain/actions"
import { getterTypes } from "@/store/modules/blockchain/getters"

import { blockchainWebSocketCfg } from "@/helpers/vars"

export default {
  name: "BlockchainView",
  components: {},
  data() {
    return {
      connection: null,
      webSocketCfg: blockchainWebSocketCfg,
    }
  },
  computed: {
    ...mapState({
      isConnecting: (state) => state.blockchain.isConnecting,
      transactions: (state) => state.blockchain.transactions,
    }),
    ...mapGetters({
      totalBtcOfTransactions: getterTypes.totalBtcOfTransactions,
    }),
  },
  methods: {
    onStart() {
      const command = JSON.stringify(this.webSocketCfg.subscribeCommand)
      this.connection.send(command)

      this.$store.dispatch(actionTypes.setConnectionStatus, true)
    },

    onPause() {
      const command = JSON.stringify(this.webSocketCfg.unsubscribeCommand)
      this.connection.send(command)

      this.$store.dispatch(actionTypes.setConnectionStatus, false)
    },

    onClear() {
      this.$store.dispatch(actionTypes.setTransactions, [])
    },
  },

  created() {
    this.connection = new WebSocket(this.webSocketCfg.url)

    this.connection.onmessage = (event) => {
      const response = JSON.parse(event.data)
      const transaction = response.x

      this.$store.dispatch(actionTypes.addTransaction, transaction)
    }

    this.connection.onopen = () => {
      console.log(`Successfully connected to the ${this.webSocketCfg.url}`)
    }

    this.connection.onerror = (event) => {
      console.error(event)
    }

    this.connection.onclose = () => {
      console.log(`Closed websocket server ${this.webSocketCfg.url}`)
    }
  },

  beforeDestroy() {
    this.$store.dispatch(actionTypes.setConnectionStatus, false)
    this.connection.close()
  },
}
</script>
