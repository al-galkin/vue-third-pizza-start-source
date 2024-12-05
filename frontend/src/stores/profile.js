import { defineStore } from "pinia";
import { ref, computed } from "vue";
import addressesList from "@/mocks/addresses.json";
import { useAuthStore } from "@/stores/auth";
import resources from "@/services/resources";
import { SUCCESS_RESPONSE_ANSWER } from "@/common/constants";
import { useDataStore } from "@/stores/data";
import { calculatePizzaPrice } from "@/common/helpers/pizza-price";

export const useProfileStore = defineStore("profile", () => {
  const phone = ref("");
  const street = ref("");
  const userId = ref(0);
  const building = ref("");
  const flat = ref("");
  const addresses = ref(addressesList);
  const orders = ref([]);

  const ordersData = computed(() => {
    const dataStore = useDataStore();

    return orders.value.map((order) => {
      const orderPizzas = order?.orderPizzas?.map(
        (pizza) => ({
          ...pizza,
          dough: dataStore.getDoughById(pizza.doughId),
          size: dataStore.getSizeById(pizza.sizeId),
          sauce: dataStore.getSauceById(pizza.sauceId),
          ingredients: (pizza.ingredients || []).map((ingredient) => ({
            ...dataStore.getIngredientById(ingredient.ingredientId),
            quantity: ingredient.quantity,
          })),
          priceSum: calculatePizzaPrice(pizza),
        }),
        null,
      );

      const orderMisc = dataStore.misc.map((misc) => {
        const miscItem = order?.orderMisc?.find((i) => i.miscId === misc.id);
        return {
          ...misc,
          quantity: miscItem?.quantity ?? 0,
          sum: miscItem?.quantity * misc.price,
        };
      }, null);

      const pizzaPrice =
        orderPizzas?.length > 0
          ? orderPizzas
              ?.map((item) => item.quantity * item.priceSum)
              .reduce((acc, val) => acc + val, 0)
          : 0;

      const miscPrice =
        orderMisc?.length > 0
          ? orderMisc
              ?.map((item) => item.quantity * item.price)
              .reduce((acc, val) => acc + val, 0)
          : 0;

      return {
        ...order,
        orderPizzas,
        orderMisc,
        sum: pizzaPrice + miscPrice,
      };
    });
  });

  const addressOptions = computed(() => {
    const newAddress = {
      value: "-1",
      label: "Новый адрес",
    };
    const normalizeAddresses = addresses.value.map((address) => ({
      label: `${address.street}, д.${address.building}, кв.${address.flat}`,
      value: address.id,
    }));
    return [newAddress, ...normalizeAddresses];
  });

  function setAddresses(addressData) {
    addresses.value = addressData;
  }

  function setOrders(ordersData) {
    orders.value = ordersData;
  }

  async function createAddress(address) {
    const authStore = useAuthStore();
    const res = await resources.address.addAddress({
      ...address,
      userId: authStore.user.id,
    });

    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      addresses.value.push(res.data);
    }
    //todo стоит ли обрабатывать ответ тут и выдавать уже success/fail наружу?
  }

  async function updateAddress(address) {
    const res = await resources.address.updateAddress(address);
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      setAddresses(
        addresses.value.map((i) => (i.id === address.id ? address : i)),
      );
    }
  }

  async function deleteAddress(id) {
    const res = await resources.address.removeAddress(id);
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      setAddresses(addresses.value.filter((i) => i.id !== id));
    }
  }

  async function loadOrders() {
    const res = await resources.order.getOrders();
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      setOrders(res.data);
    }
  }

  async function deleteOrder(id) {
    const res = await resources.order.removeOrder(id);
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      setOrders(orders.value.filter((i) => i.id !== id));
    }
  }

  return {
    phone,
    street,
    building,
    flat,
    addresses,
    userId,
    setAddresses,
    setOrders,
    loadOrders,
    deleteOrder,
    createAddress,
    updateAddress,
    deleteAddress,
    ordersData,
    addressOptions,
  };
});
