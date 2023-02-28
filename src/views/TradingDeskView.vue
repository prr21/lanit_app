<template>
  <div class="w-100 h-100">
    <div class="position-absolute" ref="tradingDeskEl" id="trading-desk">
      <TradingDeskCard
        v-for="(card, index) in cards"
        :key="card.id"
        :index="index"
        :id="card.id"
        :card="card"
        :parentW="listWidth"
        :parentH="listHeight"
        :zIndex="card.zIndex"
        :isActive="card.isActive"
      />
      <TradingDeskToolbar @onReturnRemovedCard="onReturnRemovedCard" />
    </div>
  </div>
</template>

<style>
#trading-desk {
  top: 40px;
  bottom: 30px;
  left: 30px;
  right: 30px;
  -webkit-box-shadow: 0 0 2px #aaa;
  box-shadow: 0 0 2px #aaa;
  background-color: #fff;
}

#trading-desk .card {
  cursor: pointer;
}
#trading-desk .card-title {
  cursor: inherit;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>

<script>
import { mapState } from "vuex"

import TradingDeskCard from "@/components/TradingDeskCard.vue"
import TradingDeskToolbar from "@/components/TradingDeskToolbar.vue"

import { getRandomNum } from "@/helpers/utils"
import { cardConfig } from "@/helpers/vars"
import { actionTypes } from "@/store/modules/tradingDesk/actions"

export default {
  name: "TradingDeskView",
  components: { TradingDeskCard, TradingDeskToolbar },
  data() {
    return {
      listHeight: 0,
      listWidth: 0,
      defaultCardConfig: cardConfig,
    }
  },
  computed: {
    ...mapState({
      cards: (state) => state.tradingDesk.cards,
      lastRemovedCard: (state) => state.tradingDesk.lastRemovedCard,
    }),
    centerX() {
      return this.listWidth / 2 - this.defaultCardConfig.width / 2
    },
    centerY() {
      return this.listHeight / 2 - this.defaultCardConfig.height / 2
    },
  },
  mounted() {
    this.handleWindowResize()

    if (this.cards?.length) return

    const initialCards = this.generateInitialCards()
    this.$store.dispatch(actionTypes.setCards, initialCards)
  },

  methods: {
    generateInitialCards(size = 5) {
      return Array.from({ length: size }).map((_, i) =>
        this.createCardConfig({
          id: i,
          title: "Title " + (i + 1),
          top: getRandomNum(0, this.listHeight - this.defaultCardConfig.height),
          left: getRandomNum(0, this.listWidth - this.defaultCardConfig.width),
        })
      )
    },

    createCardConfig(cfg) {
      return {
        ...this.defaultCardConfig,
        ...cfg,
      }
    },

    onReturnRemovedCard() {
      const newCard = this.createCardConfig({
        ...this.lastRemovedCard,
        top: this.centerY,
        left: this.centerX,
        width: this.defaultCardConfig.width,
        height: this.defaultCardConfig.height,
        isActive: true,
      })

      this.$store.dispatch(actionTypes.addCard, newCard)
      this.$store.dispatch(actionTypes.clearRemovedCard)
    },

    handleWindowResize() {
      const tradingDeskEl = this.$refs.tradingDeskEl

      this.listWidth = tradingDeskEl.clientWidth
      this.listHeight = tradingDeskEl.clientHeight

      const onWindowResize = () => {
        this.listWidth = tradingDeskEl.clientWidth
        this.listHeight = tradingDeskEl.clientHeight
      }

      window.addEventListener("resize", onWindowResize)
      this.$once("hook:destroyed", onWindowResize)
    },
  },
}
</script>
