import { ref, computed } from "vue";
import { defineStore } from "pinia";
import jwtService from "@/services/jwt/jwt.service.js";
import resources from "@/services/resources";
import { useProfileStore } from "@/stores/profile";
import { SUCCESS_RESPONSE_ANSWER } from "@/common/constants";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const isAuthorised = computed(() => !!user.value);

  const login = async (data) => {
    const res = await resources.auth.login(data);
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      jwtService.setToken(res.data.token);
      return SUCCESS_RESPONSE_ANSWER;
    } else {
      return res.data.message;
    }
  };

  const getMe = async () => {
    resources.auth.setAuthHeader(jwtService.getToken());
    const profileStore = useProfileStore();

    const userInfo = await resources.auth.whoAmI();
    if (userInfo.__state !== SUCCESS_RESPONSE_ANSWER) {
      await this.logout();
      return;
    } else {
      setUser(userInfo.data);
    }

    const userAddresses = await resources.address.getAddresses();
    if (userAddresses.__state !== SUCCESS_RESPONSE_ANSWER) {
      await this.logout();
      return;
    } else {
      profileStore.setAddresses(userAddresses.data);
    }

    const userOrders = await resources.order.getOrders();
    if (userOrders.__state !== SUCCESS_RESPONSE_ANSWER) {
      await this.logout();
    } else {
      profileStore.setOrders(userOrders.data);
    }
  };

  const logout = async () => {
    await resources.auth.logout();
    jwtService.removeToken();
    resources.auth.setAuthHeader("");
    setUser(null);
  };

  function setUser(userData) {
    user.value = userData;
  }

  return {
    user,
    isAuthorised,
    login,
    getMe,
    logout,
    setUser,
  };
});
