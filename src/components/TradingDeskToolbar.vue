<template>
  <div class="card position-absolute bottom-0" style="z-index: 100">
    <div class="card-body">
      <button
        type="button"
        class="btn btn-primary"
        :disabled="!canReturnFile"
        @click="returnLastFile"
      >
        Return file to trading desk
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getterTypes } from "@/store/modules/tradingDesk/getters"

export default {
  name: "TradingDeskToolbar",
  emits: ["onReturnRemovedCard"],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      canReturnFile: getterTypes.hasRemovedItem,
    }),
  },
  methods: {
    returnLastFile() {
      this.$emit("onReturnRemovedCard")
    },
  },
}
</script>
