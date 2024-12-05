import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import addressesList from "@/mocks/addresses.json";

export const useProfileStore = defineStore("profile", () => {
  const phone = ref("");
  const street = ref("");
  const userId = ref(0);
  const building = ref("");
  const flat = ref("");
  const avatar = ref("");
  const email = ref("");
  const password = ref("");
  const addresses = reactive(addressesList);
  const orders = reactive([]);

  function setAddresses(addressData) {
    addresses.value = addressData;
  }
  function setOrders(ordersData) {
    orders.value = ordersData;
  }

  return {
    phone,
    street,
    building,
    flat,
    addresses,
    avatar,
    email,
    password,
    userId,
    setAddresses,
    setOrders,
  };
});
