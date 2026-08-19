import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for FR-02: Login and Account Lockout Page
 */
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alertMessage: Locator;
  readonly userGreeting: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Direct & rock-solid locators for EShop login card
    // Ô Username là ô input đầu tiên
    this.emailInput = page.locator('input').nth(0);

    // Ô Mật khẩu là ô input thứ hai (hoặc input type="password")
    this.passwordInput = page.locator('input[type="password"]').or(page.locator('input').nth(1)).first();

    // Nút submit / Sign In
    this.loginButton = page.locator('button').filter({ hasText: /sign in|đăng nhập|login/i }).or(page.locator('button[type="submit"]')).first();

    // Khung hiển thị thông báo alert / toast
    this.alertMessage = page.locator('.bg-red-100, .bg-red-50, .text-red-700, .text-red-500, [class*="red"], .alert, .error-message, [role="alert"]').filter({ hasText: /thất bại|khóa|lỗi|thành công/i }).first();

    this.userGreeting = page.locator('header, nav').getByText(/Chào, Test User/i).or(page.locator('header, nav').getByText(/Chào/i)).first();
    this.logoutButton = page.locator('header, nav').getByText(/^Thoát$/i).or(page.locator('button, a').filter({ hasText: /thoát|đăng xuất/i })).first();
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Fill credentials and submit the login form
   */
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  /**
   * Fill email input field
   */
  async fillEmail(email: string) {
    if (email) {
      await this.emailInput.fill(email);
    } else {
      await this.emailInput.clear();
    }
  }

  /**
   * Fill password input field
   */
  async fillPassword(password: string) {
    if (password) {
      await this.passwordInput.fill(password);
    } else {
      await this.passwordInput.clear();
    }
  }

  /**
   * Click the submit / login button
   */
  async submit() {
    await this.loginButton.click();
  }

  /**
   * Get HTML5 native validation message from an input element
   */
  async getValidationMessage(field: 'email' | 'password'): Promise<string> {
    const locator = field === 'email' ? this.emailInput : this.passwordInput;
    return await locator.evaluate((node: HTMLInputElement) => node.validationMessage);
  }

  /**
   * Check if HTML5 validation is valid
   */
  async checkValidity(field: 'email' | 'password'): Promise<boolean> {
    const locator = field === 'email' ? this.emailInput : this.passwordInput;
    return await locator.evaluate((node: HTMLInputElement) => node.checkValidity());
  }

  /**
   * Get alert or error text displayed on UI
   */
  async getAlertText(): Promise<string> {
    return await this.page.evaluate(() => {
      const redBox = document.querySelector('.bg-red-100, .bg-red-50, .text-red-700, .text-red-500, [class*="red"], .alert, .error-message, [role="alert"]');
      if (redBox) {
        return redBox.textContent?.trim() || '';
      }
      const els = Array.from(document.querySelectorAll('*'));
      const leaf = els.filter((el) => el.children.length === 0 && (el.textContent?.includes('thất bại') || el.textContent?.includes('khóa')));
      return leaf.length > 0 ? leaf[leaf.length - 1].textContent?.trim() || '' : '';
    });
  }
}
