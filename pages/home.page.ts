import { Locator, Page } from "@playwright/test";

export class HomePage {
page: Page;
sortLocator: Locator;
productNameLocator: Locator;
productPriсeLocator: Locator;

constructor(page: Page){
    this.page = page;
    this.sortLocator = this.page.locator('[data-test="sort"]');
    this.productNameLocator = this.page.locator('[data-test="product-name"]');
    this.productPriсeLocator = this.page.locator('[data-test="product-price"]');
}

async sort(label: string): Promise<void> {
    await this.sortLocator.selectOption(label);
    await this.page.waitForSelector('[data-test="sorting_completed"]', { state: 'visible' });
  }

async waitForProducts(): Promise<void> {
  const isVisible = await this.page.isVisible('[data-test="product-name"]');
  if (!isVisible) {
      throw new Error('Product is not visible');
  }
  }

async getProductNames(): Promise<string[]> {
    return await this.productNameLocator.allTextContents();
  }

async getProductPrices(): Promise<string[]> {
    return await this.productPriсeLocator.allTextContents();
  }

}