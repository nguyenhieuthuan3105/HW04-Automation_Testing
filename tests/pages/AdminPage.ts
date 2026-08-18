import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Admin Dashboard (http://localhost:5174)
 */
export class AdminPage {
  readonly page: Page;

  // Login Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // Sidebar Locators
  readonly productsSidebarLink: Locator;
  readonly couponsSidebarLink: Locator;
  readonly ordersSidebarLink: Locator;
  readonly dashboardSidebarLink: Locator;

  // Products Page Locators
  readonly deleteProductButtons: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login
    this.usernameInput = page.locator('input[type="text"], input[type="email"], input').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.loginButton = page.locator('button').filter({ hasText: /login|đăng nhập/i }).first();

    // Sidebar
    this.dashboardSidebarLink = page.locator('aside, .sidebar, nav, div').getByText(/^Dashboard$/i).first();
    this.productsSidebarLink = page.locator('aside, .sidebar, nav, div').getByText(/^Sản phẩm$/i).first();
    this.couponsSidebarLink = page.locator('aside, .sidebar, nav, div').getByText(/^Mã Giảm Giá$/i).first();
    this.ordersSidebarLink = page.locator('aside, .sidebar, nav, div').getByText(/^Đơn hàng$/i).first();

    // Products table
    this.deleteProductButtons = page.locator('table tbody tr button, table button').filter({ hasText: /xóa/i });
  }

  /**
   * Navigate to admin login page
   */
  async goto() {
    await this.page.goto('http://localhost:5174/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Log into admin dashboard
   */
  async login(email = 'admin@eshop.com', password = 'Admin123!') {
    await this.goto();
    if (await this.usernameInput.isVisible()) {
      await this.usernameInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      await this.page.waitForTimeout(800);
    }
  }

  /**
   * Navigate to Products section and delete first product
   */
  async deleteFirstProduct() {
    if (await this.productsSidebarLink.isVisible()) {
      await this.productsSidebarLink.click();
      await this.page.waitForTimeout(600);
    }

    // Tự động đồng ý nếu xuất hiện confirm dialog
    this.page.once('dialog', async (dialog) => {
      await dialog.accept().catch(() => {});
    });

    const firstDeleteBtn = this.deleteProductButtons.first();
    if (await firstDeleteBtn.isVisible()) {
      await firstDeleteBtn.click();
      await this.page.waitForTimeout(800);
    }
  }
}
