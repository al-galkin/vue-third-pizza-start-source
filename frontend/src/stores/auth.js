import { ref, computed } from "vue";
import { defineStore } from "pinia";
import jwtService from "@/services/jwt/jwt.service.js";
import resources from "@/services/resources";
import { useProfileStore } from "@/stores/profile";
import { SUCCESS_RESPONSE_ANSWER } from "@/common/constants";

export const useAuthStore = defineStore("auth", () => {
  const defaultUser = {
    id: "",
    name: "",
    email: "",
    avatar: "",
    phone: "",
  };
  const user = ref(defaultUser);

  const isAuthorised = computed(() => !!user.value?.id);

  const userId = computed(() => {
    return user?.value.id ?? "";
  });

  const userPhone = computed(() => {
    return user.value?.phone ?? "";
  });

  const userEmail = computed(() => {
    return user.value?.email ?? "";
  });

  const userAvatar = computed(() => {
    return user.value?.avatar ?? "";
  });

  const userName = computed(() => {
    return user.value?.name ?? "";
  });

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
      await logout();
      return;
    } else {
      setUser(userInfo.data);
    }

    const userAddresses = await resources.address.getAddresses();
    if (userAddresses.__state !== SUCCESS_RESPONSE_ANSWER) {
      await logout();
      return;
    } else {
      profileStore.setAddresses(userAddresses.data);
    }

    const userOrders = await resources.order.getOrders();
    if (userOrders.__state !== SUCCESS_RESPONSE_ANSWER) {
      await logout();
    } else {
      profileStore.setOrders(userOrders.data);
    }
  };

  const logout = async () => {
    await resources.auth.logout();
    jwtService.removeToken();
    resources.auth.setAuthHeader("");
    setUser(defaultUser);
  };

  function setUser(userData) {
    user.value = userData;
  }

  return {
    user,
    userId,
    userPhone,
    userEmail,
    userAvatar,
    userName,
    isAuthorised,
    login,
    getMe,
    logout,
    setUser,
  };
});
