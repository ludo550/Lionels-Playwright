import { test, expect } from '@playwright/test';
import { AmazonPage } from './pageobjects/amazon-page';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = parse(fs.readFileSync(path.join(__dirname, 'data', 'testData.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const line of data) {
    test('Compare search price and name vs product price and name for url ' + line.url + ' and product type of '  + line.productType, async ({ page }) => {
      let amazonPage = new AmazonPage(page);
      await amazonPage.goto(line.url);
      await expect(amazonPage.search.first()).toBeVisible();
      await amazonPage.searchProduct(line.productType);
      let searchPrice = await amazonPage.searchPrice.first().textContent();
      searchPrice = searchPrice.split(" ")[0].trim();
      let searchName = await amazonPage.searchName.first().textContent();
      let newPage = await amazonPage.openProduct();
      await newPage.waitForDOM();
      await expect(newPage.productPrice().first()).toBeVisible();
      let productPrice = await newPage.productPrice().nth(-1).textContent();
      let productName = await newPage.productName.first().textContent();
      productPrice = productPrice.split("with")[0].trim();
      if (productPrice.includes(".00") && !searchPrice.includes(".")) {
         searchPrice = searchPrice + ".00"
      }
      console.log("Search Price: " + searchPrice);
      console.log("Product Price: " + productPrice);
      console.log("Search Name: " + searchName);
      console.log("Product Name: " + productName);
      //compare prices
      await expect(productPrice).toEqual(searchPrice);
      //compare name
      await expect(productName.toLowerCase()).toContain(searchName.toLowerCase());
    });
}
