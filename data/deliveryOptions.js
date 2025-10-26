import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOption[0];
}
export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const newDeliveryDay = isWeekend(deliveryOption.deliveryDays);
  const deliveryDate = today.add(newDeliveryDay, "d");

  return deliveryDate.format("dddd, MMMM D");
}

function isWeekend(deliveryDays) {
  const today = dayjs();
  for (let i = 1; i <= deliveryDays; i++) {
    const weekday = today.add(i, "d").format("dddd");
    if (weekday === "Saturday" || weekday === "Sunday") {
      deliveryDays++;
    }
  }
  return deliveryDays;
}
