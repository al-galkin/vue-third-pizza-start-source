import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { authService } from "../services";
import { setToken, removeToken } from "@/services/token-manager";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const isAuthorised = computed(() => !!user.value);

  const getUserAttribute = (attr) => {
    return user.value ? user.value[attr] : "";
  };

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setToken(data.token);
      return "ok";
    } catch (e) {
      return e.message;
    }
  };

  const getMe = async () => {
    user.value = await authService.whoAmI();
  };

  const logout = async (sendRequest = true) => {
    if (sendRequest) {
      await authService.logout();
    }
    user.value = null;
    removeToken();
  };

  return {
    user,
    isAuthorised,
    getUserAttribute,
    login,
    getMe,
    logout,
  };
});
