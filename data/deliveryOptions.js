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
  const newDeliveryDay = getDeliveryWeekday(deliveryOption);

  return newDeliveryDay;
}

export function getDeliveryWeekday(
  // deliveryOption
  deliveryDays
) {
  // let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (deliveryDays > 0) {
    deliveryDate = deliveryDate.add(1, "day");
    const weekday = deliveryDate.format("dddd");

    // Only count weekdays (Mon–Fri)
    if (weekday !== "Saturday" && weekday !== "Sunday") {
      deliveryDays--;
    }
  }

  return deliveryDate.format("dddd, MMMM D");
}
export function validDeliveryOption(deliveryOptionId) {
  let found = false;
  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.id === deliveryOptionId) {
      found = true;
    }
  });
  return found;
}
