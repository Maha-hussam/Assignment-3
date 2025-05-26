import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  // Locators
  private sortDropdown: Locator;
  private cartLink: Locator;

  constructor(private page: Page) {
    this.sortDropdown = this.page.locator('.product_sort_container');
    this.cartLink = this.page.locator('.shopping_cart_link');
  }

  private addButton(itemName: string): Locator {
    const id = this.formatItemName(itemName);
    return this.page.locator(`[data-test="add-to-cart-${id}"]`);
  }

  private removeButton(itemName: string): Locator {
    const id = this.formatItemName(itemName);
    return this.page.locator(`[data-test="remove-${id}"]`);
  }

  private formatItemName(itemName: string): string {
    return itemName.toLowerCase().replace(/\s+/g, '-');
  }

  // Actions
  async addItemToCart(itemName: string) {
    await this.addButton(itemName).click();
  }

  async removeItemFromCart(itemName: string) {
    await this.removeButton(itemName).click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
