import doughTypes from "@/common/enum/doughTypes";
import ingredients from "@/common/enum/ingredients";
import sauces from "@/common/enum/sauces";
import sizes from "@/common/enum/sizes";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    value: doughTypes[dough.id],
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    value: sizes[size.id],
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    value: ingredients[ingredient.id],
  };
};

export const normalizeSauces = (sauce) => {
  return {
    ...sauce,
    value: sauces[sauce.id],
  };
};
