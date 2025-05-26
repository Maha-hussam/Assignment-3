import { Page } from '@playwright/test';

export class LoginPage {
   // Locators
   private usernameInput
   private passwordInput 
   private loginButton 

  constructor(private page: Page) {
    this.page=page;
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
  }

   async goto() {
    await this.page.goto('/');
  }
  
  // Actions
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  
  }
}
