const xhr = new XMLHttpRequest();

xhr.open("GET", "https://supersimplebackend.dev/products/first");
xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
xhr.send();
// xhr.response();
