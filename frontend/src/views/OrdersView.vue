<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <section
      v-for="order in profileStore.ordersData"
      :key="order.id"
      class="sheet order"
    >
      <div class="order__wrapper">
        <div class="order__number">
          <b>Заказ #{{ order?.id }}</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: {{ order.sum }} ₽</span>
        </div>

        <div class="order__button">
          <app-button
            label="Удалить"
            name="delete"
            :has-border="true"
            @click="profileStore.deleteOrder(order.id)"
          ></app-button>
        </div>
        <div class="order__button">
          <app-button
            label="Повторить"
            name="repeat"
            @click="repeatOrder(order)"
          ></app-button>
        </div>
      </div>

      <ul v-if="order?.orderPizzas?.length > 0" class="order__list">
        <li
          v-for="pizza in order.orderPizzas"
          :key="pizza.id"
          class="order__item"
        >
          <template v-if="pizza.priceSum > 0 && pizza.quantity > 0">
            <div class="product">
              <img
                :src="getPublicImage('/public/img/product.svg')"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    Диаметер {{ pizza.size.name }}, {{ pizza.dough.name }} тесто
                  </li>
                  <li>Соус: {{ pizza.sauce.name }}</li>
                  <li>
                    Начинка:
                    {{ pizza.ingredients.map((i) => i.name).join(", ") }}
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">
              {{ pizza.priceSum }} ₽ × {{ pizza.quantity }}
            </p>
          </template>
        </li>
      </ul>

      <ul v-if="order?.orderMisc?.length > 0" class="order__additional">
        <li v-for="misc in order.orderMisc" :key="misc.id">
          <template v-if="misc.quantity > 0">
            <img
              :src="getPublicImage(misc.image)"
              width="20"
              height="30"
              :alt="misc.name"
            />
            <p>
              <span>{{ misc.name }} × {{ misc.quantity }}</span>
              <b
                >{{ misc.price }} ₽ × {{ misc.quantity }} шт. =
                {{ misc.sum }} ₽</b
              >
            </p>
          </template>
        </li>
      </ul>

      <p class="order__address">
        Адрес доставки: {{ order.orderAddress?.name }}
      </p>
    </section>
  </div>
</template>

<script setup>
import AppButton from "@/common/components/AppButton.vue";
import { getPublicImage } from "@/common/helpers/helpers";
import { useCartStore, useProfileStore } from "@/stores";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const profileStore = useProfileStore();
const router = useRouter();
const repeatOrder = (order) => {
  cartStore.load(order);
  router.push({ name: "BasketView" });
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/layout.scss";
@import "@/assets/scss/layout/sheet.scss";
@import "@/assets/scss/blocks/order.scss";
@import "@/assets/scss/blocks/product.scss";
</style>
