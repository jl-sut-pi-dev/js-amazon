import { showMoney } from "../../scripts/utils/money.js";

describe("test suite : Format currency", () => {
  it("convert cents into dollars", () => {
    expect(showMoney(2095)).toEqual("20.95");
  });
  it("work with 0", () => {
    expect(showMoney(0)).toEqual("0.00");
  });
  it("rounds up to the nearest cent", () => {
    expect(showMoney(2000.5)).toEqual("20.01");
  });
  it("rounds down to the nearest cent", () => {
    expect(showMoney(2000.4)).toEqual("20.00");
  });
});
