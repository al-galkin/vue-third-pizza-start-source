import { defineStore } from "pinia";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";
import { computed, shallowRef } from "vue";
import resources from "@/services/resources";
import { SUCCESS_RESPONSE_ANSWER } from "@/common/constants";

/**  Доступные типы теста, размеры, ингредиенты и соусы. */
export const useDataStore = defineStore("data", () => {
  const ingredients = shallowRef([]);
  const doughTypeList = shallowRef([]);
  const sauceList = shallowRef([]);
  const doughSizeList = shallowRef([]);
  const misc = shallowRef([]);

  const isDataLoaded = computed(() => {
    return (
      doughTypeList.value.length > 0 &&
      ingredients.value.length > 0 &&
      sauceList.value.length > 0 &&
      doughSizeList.value.length > 0 &&
      misc.value.length > 0
    );
  });

  async function init() {
    await Promise.all([
      fetchIngredients(),
      fetchDoughTypes(),
      fetchSauces(),
      fetchDoughSizes(),
      fetchMisc(),
    ]);
  }

  async function fetchIngredients() {
    const res = await resources.ingredient.getIngredients();
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      ingredients.value = res.data.map(normalizeIngredients);
    }
  }

  async function fetchDoughTypes() {
    const res = await resources.dough.getDoughs();
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      doughTypeList.value = res.data.map(normalizeDough);
    }
  }

  async function fetchSauces() {
    const res = await resources.sauce.getSauces();
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      sauceList.value = res.data.map(normalizeSauces);
    }
  }

  async function fetchDoughSizes() {
    const res = await resources.size.getSizes();
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      doughSizeList.value = res.data.map(normalizeSize);
    }
  }

  async function fetchMisc() {
    const res = await resources.misc.getMisc();
    if (res.__state === SUCCESS_RESPONSE_ANSWER) {
      misc.value = res.data;
    }
  }

  function getPriceByDoughId(doughId) {
    return getDoughById(doughId)?.price || 0;
  }

  function getPriceBySauceId(sauceId) {
    return getSauceById(sauceId)?.price || 0;
  }

  function getMultiplierBySizeId(sizeId) {
    return getSizeById(sizeId)?.multiplier || 1;
  }

  function getPriceByIngredientId(ingredientId) {
    return getIngredientById(ingredientId)?.price || 0;
  }

  function getPriceByMiscId(miscId) {
    return getMiscById(miscId)?.price || 0;
  }

  function getDoughById(doughId) {
    return doughTypeList.value.find((item) => item.id === doughId) || null;
  }

  function getSauceById(sauceId) {
    return sauceList.value.find((item) => item.id === sauceId) || null;
  }

  function getSizeById(sizeId) {
    return doughSizeList.value.find((item) => item.id === sizeId) || null;
  }

  function getIngredientById(ingredientId) {
    return ingredients.value.find((item) => item.id === ingredientId) || null;
  }

  function getMiscById(miscId) {
    return misc.value.find((item) => item.id === miscId) || null;
  }

  return {
    init,
    ingredients,
    doughTypeList,
    sauceList,
    doughSizeList,
    misc,
    getDoughById,
    getSauceById,
    getSizeById,
    getIngredientById,
    getMiscById,
    getPriceByDoughId,
    getPriceBySauceId,
    getMultiplierBySizeId,
    getPriceByIngredientId,
    getPriceByMiscId,
    isDataLoaded,
  };
});
