<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'HomeView' }" class="logo">
        <img
          src="../assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'BasketView' }">
        {{ pizzaStore.priceSum || cartStore.sum }} ₽
      </router-link>
    </div>
    <div v-if="!authStore.isAuthorised" class="header__user">
      <router-link :to="{ name: 'AuthView' }" class="header__login">
        <span>Войти</span>
      </router-link>
      <router-link :to="{ name: 'HomeView' }" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
    </div>
    <div v-else class="header__user">
      <router-link :to="{ name: 'ProfileView' }">
        <picture>
          <img
            :src="getPublicImage(authStore.user.avatar)"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
      </router-link>
      <a class="header__logout" @click="authStore.logout">
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore, usePizzaStore, useAuthStore } from "../stores";
import { getPublicImage } from "../common/helpers/helpers.js";
const cartStore = useCartStore();
const pizzaStore = usePizzaStore();
const authStore = useAuthStore();
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds";
@import "@/assets/scss/layout/header";
@import "@/assets/scss/blocks/logo";
</style>
