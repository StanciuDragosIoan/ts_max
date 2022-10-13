// Code goes here!
import _ from "lodash";
import "reflect-metadata";
import { Product } from "./product.model";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

declare var GLOBAL: any;

console.log(_.shuffle([1, 2, 3]));

const p1 = new Product("A book", 12.99);

const products = [
  { titile: "a carpet", price: 29.99 },
  { title: " a book ", price: 13.99 },
];

const test2 = plainToInstance(Product, products);
console.log(test2);
console.log(p1.getInformation());

const newPrd = new Product("", -5);
validate(newPrd).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS");
    console.log(errors);
  } else {
    console.log(newPrd.getInformation());
  }
});
