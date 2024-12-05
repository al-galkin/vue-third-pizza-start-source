<template>
  <form class="address-form address-form--opened sheet">
    <div class="address-form__header">
      <b>{{ title }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <app-input
          v-model="name"
          label="Название адреса*"
          placeholder="Введите название адреса"
          name="name"
          :required="true"
        ></app-input>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <app-input
          v-model="street"
          label="Улица*"
          placeholder="Введите название улицы"
          name="street"
          :required="true"
        ></app-input>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <app-input
          v-model="building"
          label="Дом*"
          placeholder="Введите номер дома"
          name="house"
          :required="true"
        ></app-input>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <app-input
          v-model="flat"
          label="Квартира"
          placeholder="Введите № квартиры"
          name="apartment"
        ></app-input>
      </div>
      <div class="address-form__input">
        <app-input
          v-model="comment"
          label="Комментарий"
          placeholder="Введите комментарий"
          name="comment"
        ></app-input>
      </div>
    </div>

    <div class="address-form__buttons">
      <app-button
        label="Удалить"
        name="delete"
        :is-transparent="true"
        @click="emit('delete')"
      ></app-button>
      <app-button
        label="Сохранить"
        name="save"
        @click="saveAddress"
      ></app-button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import AppButton from "@/common/components/AppButton.vue";
import AppInput from "@/common/components/AppInput.vue";

const props = defineProps({
  address: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["delete", "save"]);

const name = ref(props.address?.name ?? "");
const street = ref(props.address?.street ?? "");
const building = ref(props.address?.building ?? "");
const flat = ref(props.address?.flat ?? "");
const comment = ref(props.address?.comment ?? "");

function saveAddress() {
  emit("save", {
    name: name.value,
    street: street.value,
    building: building.value,
    flat: flat.value,
    comment: comment.value,
  });
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/blocks/address-form.scss";
</style>
