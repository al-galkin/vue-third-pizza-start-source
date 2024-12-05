<template>
  <div class="sign-form">
    <router-link :to="{ name: 'HomeView' }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="#" method="post">
      <div class="sign-form__input">
        <app-input
          v-model="email"
          label="E-mai"
          placeholder="example@mail.ru"
          name="email"
          type="email"
          :required="true"
          :error-text="validations.email.error"
        ></app-input>
      </div>

      <div class="sign-form__input">
        <app-input
          v-model="password"
          label="Пароль"
          placeholder="***********"
          name="password"
          type="password"
          :required="true"
          :error-text="validations.password.error"
        ></app-input>
      </div>
      <app-button label="Авторизоваться" name="auth" @click="auth"></app-button>
      <div v-if="serverErrorMessage" class="server-error-message">
        {{ serverErrorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import {
  validateFields,
  clearValidationErrors,
} from "@/common/validator/index.js";
import { useAuthStore } from "@/stores/auth.js";
import router from "@/router";
import { SUCCESS_RESPONSE_ANSWER } from "@/common/constants";

const authStore = useAuthStore();
const setEmptyValidations = () => ({
  email: {
    error: "",
    rules: ["required", "email"],
  },
  password: {
    error: "",
    rules: ["required"],
  },
});

const email = ref("");
const password = ref("");

const validations = ref(setEmptyValidations());
const serverErrorMessage = ref(null);

watch(email, () => {
  if (serverErrorMessage.value) serverErrorMessage.value = null;
  if (validations.value.email.error) clearValidationErrors(validations.value);
});

watch(password, () => {
  if (serverErrorMessage.value) serverErrorMessage.value = null;
  if (validations.value.password.error)
    clearValidationErrors(validations.value);
});

async function auth() {
  const fields = {
    email: email.value,
    password: password.value,
  };

  if (!validateFields(fields, validations.value)) {
    return;
  }

  const responseMessage = await authStore.login(fields);
  if (responseMessage === SUCCESS_RESPONSE_ANSWER) {
    await authStore.getMe();
    await router.push("/");
    return;
  }
  serverErrorMessage.value = responseMessage;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/sign-form.scss";
@import "@/assets/scss/blocks/close.scss";

.server-error-message {
  margin-top: 20px;
  color: $red-800;
  text-align: center;
}
</style>
