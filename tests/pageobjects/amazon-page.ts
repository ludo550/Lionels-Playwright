import { expect, Locator, Page } from "@playwright/test";

export class AmazonPage {
  readonly page: Page;
  readonly search: Locator;
  readonly searchSubmit: Locator;
  readonly searchPrice: Locator;
  readonly product: Locator;
  readonly searchPriceValue: string;

  constructor(page: Page) {
    this.page = page;
    this.search = page.locator("//input[contains(@placeholder, 'Search Amazon')] | //input[contains(@title, 'Search')] | //input[contains(@placeholder, 'Buscar Amazon')] | //input[contains(@title, 'Buscar')]");
    this.searchSubmit = page.locator("//*[@id='nav-search-submit-button'] | //*[@title='Go'] | //*[@title='Ir']");
    this.searchPrice = page.locator("//span[@class='aok-offscreen' and text()!=''] | //span[@class='a-offscreen' and text()!='']");
    this.productElem = page.locator(".s-product-image-container");
    // We repeat the searchPrice Xpath again as a different variable only for clarity. Both search and product pages hold the price in the same selector
  }

  async goto(url) {
    await this.page.setDefaultTimeout(40000);
    await this.page.setDefaultNavigationTimeout(400000);
    await this.page.goto(url);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async searchProduct(product) {
    await this.search.type(product);
    await this.searchSubmit.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.productElem.nth(0)).toBeVisible();
    this.searchPriceValue = await this.searchPrice.first().textContent();
  }

  protected productPrice(): () => Locator {
    const price = this.searchPriceValue.split(".00")[0]
    return this.page.locator("//span[@class='aok-offscreen' and contains(text(), '" + price + "')] | //span[@class='a-offscreen' and contains(text(), '" + price + "')] | //td[text()='Price:']/following-sibling::td[1]//span[1]/span[2] | //td[text()='Precio:']/following-sibling::td[1]//span[1]/span[2]")
   }

  async openProduct() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.searchPrice.first().click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.productPrice().first()).toBeVisible();
  }

}
