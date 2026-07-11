const BASE_PRICES = {
  "Thin Crust": 100,
  "Thick Crust": 110,
  "Whole Wheat": 120,
  "Cheese Burst": 150,
  "Gluten Free": 160,
};

const SAUCE_PRICE = 20;       
const CHEESE_PRICE = 30;      
const VEGETABLE_PRICE = 10;   

export const calculatePizzaPrice = ({ base, sauce, cheese, vegetables }) => {
  const basePrice = BASE_PRICES[base];

  if (basePrice === undefined) {
    throw new Error(`Invalid base selection: ${base}`);
  }

  const vegCount = Array.isArray(vegetables) ? vegetables.length : 0;

  const total =
    basePrice +
    (sauce ? SAUCE_PRICE : 0) +
    (cheese ? CHEESE_PRICE : 0) +
    vegCount * VEGETABLE_PRICE;

  return total;
};