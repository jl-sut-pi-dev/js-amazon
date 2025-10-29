import { Appliance, Clothing, Product } from "../../data/products.js";

describe("test suite : Appliance Class", () => {
  let applianceProduct;
  beforeEach(() => {
    applianceProduct = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197,
      },
      priceCents: 1899,
      keywords: ["toaster", "kitchen", "appliances"],
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
    });
  });
  it("has the correct property", () => {
    expect(applianceProduct.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(applianceProduct.instructionsLink).toEqual(
      "images/appliance-instructions.png"
    );
    expect(applianceProduct.warrantyLink).toEqual(
      "images/appliance-warranty.png"
    );
    expect(applianceProduct.image).toEqual(
      "images/products/black-2-slot-toaster.jpg"
    );
  });
  it("get the star url", () => {
    expect(applianceProduct.getStarUrl()).toEqual(
      `images/ratings/rating-50.png`
    );
  });
  it("gets the price", () => {
    expect(applianceProduct.getPrice()).toEqual("$18.99");
  });
  it("display instructions and warranty in eatraInfo", () => {
    expect(applianceProduct.extraInfo()).toContain(
      `<a href="images/appliance-instructions.png" target="_blank">`
    );
    expect(applianceProduct.extraInfo()).toContain("Instructions");

    expect(applianceProduct.extraInfo()).toContain(
      `<a href="images/appliance-warranty.png" target="_blank">`
    );
    expect(applianceProduct.extraInfo()).toContain("Warranty");
  });
});
describe("test suite : Clothing Class", () => {
  let clothingProduct;
  beforeEach(() => {
    clothingProduct = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });
  it("has the correct property", () => {
    expect(clothingProduct.sizeChartLink).toEqual(
      "images/clothing-size-chart.png"
    );
    expect(clothingProduct.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(clothingProduct.image).toEqual(
      "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
    );
  });
  it("get the star url", () => {
    expect(clothingProduct.getStarUrl()).toEqual(
      "images/ratings/rating-45.png"
    );
  });
  it("get the price", () => {
    expect(clothingProduct.getPrice()).toEqual("$7.99");
  });
  it("dispaly sizeChartLink", () => {
    expect(clothingProduct.extraInfo()).toContain(
      `<a href="images/clothing-size-chart.png" target="_blank" >`
    );
    expect(clothingProduct.extraInfo()).toContain("Size Chart");
  });
});
describe("test suite : Product Class", () => {
  let product;
  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    });
  });
  it("has the correct property", () => {
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.image).toEqual(
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );
    expect(product.name).toEqual(
      "Black and Gray Athletic Cotton Socks - 6 Pairs"
    );
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87,
    });
    expect(product.priceCents).toEqual(1090);
  });

  it("get starUrl", () => {
    expect(product.getStarUrl()).toEqual("images/ratings/rating-45.png");
  });
  it("get the price", () => {
    expect(product.getPrice()).toEqual("$10.90");
  });
  it("it does not dispaly extra into", () => {
    expect(product.extraInfo()).toEqual("");
  });
});
