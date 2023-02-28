<template>
  <VueDragResize
    :w="width"
    :h="height"
    :x="left"
    :y="top"
    :z="zIndex"
    :isActive="isActive"
    :minw="150"
    :minh="100"
    :snapToGrid="true"
    :gridX="10"
    :gridY="10"
    :parentW="parentW"
    :parentH="parentH"
    :parentLimitation="true"
    :contentClass="cardClasses"
    @resizing="onResize"
    @dragging="onResize"
    @resizestop="onResizeStop"
    @dragstop="onResizeStop"
    @activated="onActivate"
    @deactivated="onDeactivate"
  >
    <div class="card-header" :class="{ 'bg-primary-subtle': isActive }">
      <span class="position-absolute" v-if="isActive" @click.stop="removeCard"
        >&times;</span
      >
      <h5 class="card-title text-center">{{ card.title }}</h5>
    </div>
    <div class="card-body">
      <p class="card-text"></p>
    </div>
  </VueDragResize>
</template>

<script>
import VueDragResize from "vue-drag-resize"

import { actionTypes } from "@/store/modules/tradingDesk/actions"

export default {
  name: "CardBlock",
  components: { VueDragResize },
  props: {
    id: {
      type: Number,
      required: true,
    },
    card: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    parentW: {
      type: Number,
      required: true,
    },
    parentH: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      width: this.card.width,
      height: this.card.height,
      top: this.card.top,
      left: this.card.left,
    }
  },
  computed: {
    cardClasses() {
      const defaultClasses = "card mb-3"
      const backgroundClass = "text-bg-" + this.card.theme
      const selectClass = this.isActive ? "border-primary" : ""

      return [defaultClasses, backgroundClass, selectClass].join(" ")
    },
  },
  methods: {
    onResize({ width, height, top, left }) {
      this.width = width
      this.height = height
      this.top = top
      this.left = left
    },
    onResizeStop({ width, height, top, left }) {
      this.$store.dispatch(actionTypes.changeCardSizes, {
        index: this.index,
        width,
        height,
        top,
        left,
      })
    },
    onActivate() {
      this.$store.dispatch(actionTypes.setActive, { index: this.index })
      this.$store.dispatch(actionTypes.setCardToTop, { index: this.index })
    },
    onDeactivate() {
      this.$store.dispatch(actionTypes.unsetActive, { index: this.index })
    },
    removeCard() {
      this.$store.dispatch(actionTypes.removeCard, { id: this.id })
    },
  },
}
</script>
