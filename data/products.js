import { formatCurrency } from "../scripts/utils/money.js";

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  constructor(productDetail) {
    const { id, image, name, rating, priceCents } = productDetail;
    this.id = id;
    this.image = image;
    this.name = name;
    this.priceCents = priceCents;
    this.rating = rating;
  }
  getStarUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }
  extraInfo() {
    return ``;
  }
}
export class Appliance extends Product {
  instructionsLink;
  warrantyLink;
  constructor(productDetail) {
    super(productDetail);
    this.instructionsLink = productDetail.instructionsLink;
    this.warrantyLink = productDetail.warrantyLink;
  }
  extraInfo() {
    return `
    <a href="${this.instructionsLink}" target="_blank">Instructions</a>
    <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}
export class Clothing extends Product {
  sizeChartLink;
  constructor(productDetail) {
    super(productDetail);
    this.sizeChartLink = productDetail.sizeChartLink;
  }
  extraInfo() {
    return `
    <a href="${this.sizeChartLink}" target="_blank" >
       Size Chart
    </a>
    `;
  }
}
export let products = [];

// function loadPrF
export function loadProductFetch() {
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      products = data.map((productDetail) => {
        if (productDetail.type === "appliance") {
          return new Appliance(productDetail);
        } else if (productDetail.type === "clothing") {
          return new Clothing(productDetail);
        }
        return new Product(productDetail);
      });
    });

  return promise;
}
/*
export function loadsProducts(renderHtml) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    renderHtml();
  });
  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}
*/

export function getProduct(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}
