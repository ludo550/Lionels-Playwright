import { test, expect } from '@playwright/test';

test('Compare search price vs product price for url ' + line.url + ' and product type of '  + line.productType, async ({ page }) => {
  console.log("This is a global teardown. In our case, we have nothing to ramp up for our tests, so this is a placeholder")
}
