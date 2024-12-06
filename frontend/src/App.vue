<template>
  <app-layout>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
import { useDataStore } from "@/stores/data";
import { useAuthStore } from "@/stores/auth";
import JwtService from "@/services/jwt/jwt.service";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import router from "@/router";

useDataStore().init();
const dataStore = useDataStore();
const route = useRoute();
const isLoaded = ref(false);

const checkLoggedIn = async () => {
  const authStore = useAuthStore();
  const token = JwtService.getToken();
  if (!token) {
    isLoaded.value = true;
    return;
  }

  try {
    //todo такие вещи должны быть в компоненте? или правильнее выносить их?
    await authStore.getMe();
    const { redirect } = route.query;
    await router.push(redirect ? redirect : { name: "HomeView" });
  } catch (e) {
    JwtService.removeToken();
    console.error(e);
  } finally {
    isLoaded.value = true;
  }
};

onMounted(() => {
  checkLoggedIn();
  dataStore.init();
});
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
