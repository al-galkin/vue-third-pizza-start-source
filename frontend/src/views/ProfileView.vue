<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <img
        :src="getPublicImage(authStore.userAvatar)"
        :alt="authStore.userName"
        width="72"
        height="72"
      />
      <div class="user__name">
        <span>{{ authStore.userName }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ authStore.userPhone }}</span>
      </p>
    </div>

    <div
      v-for="(address, index) in profileStore.addresses"
      :key="address.id"
      class="layout__address"
    >
      <address-card
        :address="address"
        :index="index + 1"
        @delete="profileStore.deleteAddress(address.id)"
        @save="updateAddress(address, $event)"
      />
    </div>

    <div v-if="!isNewAddressFormOpened" class="layout__button">
      <app-button
        label="Добавить новый адрес"
        name="add"
        :has-border="true"
        @click="isNewAddressFormOpened = true"
      ></app-button>
    </div>

    <div v-else class="layout__address">
      <address-edit-form
        title="Новый адрес"
        @save="createAddress"
        @delete="isNewAddressFormOpened = false"
      />
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";
import { useAuthStore } from "@/stores/auth";
import AddressCard from "@/common/components/address/AddressCard.vue";
import { ref } from "vue";
import AddressEditForm from "@/common/components/address/AddressEditForm.vue";
import AppButton from "@/common/components/AppButton.vue";
import { getPublicImage } from "@/common/helpers/helpers";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const isNewAddressFormOpened = ref(false);

const createAddress = async (address) => {
  await profileStore.createAddress(address);
  isNewAddressFormOpened.value = false;
};

const updateAddress = (address, data) => {
  profileStore.updateAddress({
    ...address,
    ...data,
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/layout.scss";
@import "@/assets/scss/layout/sheet.scss";
@import "@/assets/scss/blocks/user.scss";
@import "@/assets/scss/blocks/address-form.scss";
@import "@/assets/scss/blocks/button.scss";
@import "@/assets/scss/blocks/icon.scss";

.layout__address {
  margin-top: 16px;
}
</style>
