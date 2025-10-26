import { showMoney } from "../../scripts/utils/money.js";

// when we test the code , we group the test code <=> test suite( the naming covension of gruop of test code)
console.log("test suite : showMoeny");
console.log("convert cent into dollar");
console.log(showMoney(2095));
if (showMoney(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("round up to nearest num ");

if (showMoney(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("work wtih 0");

if (showMoney(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("round down into nearest num ");

if (showMoney(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("failed");
}
