<template>
  <div class="counter counter--orange ingredients__counter">
    <counter-button
      css-class="counter__button--minus"
      label="Меньше"
      :disabled="count <= MIN_INGREDIENTS_COUNT"
      @click="decrement"
    ></counter-button>
    <counter-value v-model="count" />
    <counter-button
      css-class="counter__button--plus"
      label="Больше"
      :disabled="count >= MAX_INGREDIENTS_COUNT"
      @click="increment"
    ></counter-button>
  </div>
</template>

<script setup>
import CounterValue from "@/modules/counter/CounterValue.vue";
import CounterButton from "@/modules/counter/CounterButton.vue";
import { computed } from "vue";
import {
  MAX_INGREDIENTS_COUNT,
  MIN_INGREDIENTS_COUNT,
} from "@/common/constants";
const emit = defineEmits(["update:modelValue"]);

const count = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const decrement = () => {
  if (count.value <= MIN_INGREDIENTS_COUNT) return;
  count.value = count.value - 1;
};

const increment = () => {
  if (count.value >= MAX_INGREDIENTS_COUNT) return;
  count.value = count.value + 1;
};

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/counter";
.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
