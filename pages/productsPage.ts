import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  private sortDropdown: Locator;
  private cartLink: Locator;

  constructor(private page: Page) {
    this.sortDropdown = this.page.locator('.product_sort_container');
    this.cartLink = this.page.locator('.shopping_cart_link');
  }

  //Locator
  private itemButton(itemName: string): Locator {
    return this.page.locator(`.inventory_item:has-text("${itemName}") button`);
  }

  // Actions
  async addItemToCart(itemName: string) {
    await this.itemButton(itemName).click();
  }

  async removeItemFromCart(itemName: string) {
    await this.itemButton(itemName).click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

