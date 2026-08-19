import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Admin Portal (http://localhost:5174)
 * Supporting Dashboard Statistics & Orders State Lifecycle
 */
export class AdminPage {
  readonly page: Page;

  // Login Form
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // Sidebar Links
  readonly dashboardSidebarLink: Locator;
  readonly productsSidebarLink: Locator;
  readonly couponsSidebarLink: Locator;
  readonly ordersSidebarLink: Locator;
  readonly logoutButton: Locator;

  // Dashboard Cards
  readonly revenueCard: Locator;
  readonly revenueAmountText: Locator;
  readonly ordersCountCard: Locator;
  readonly ordersCountText: Locator;

  // Orders Management Table
  readonly orderRows: Locator;
  readonly firstRowStatusBadge: Locator;
  readonly confirmButton: Locator;
  readonly shipButton: Locator;
  readonly completeButton: Locator;
  readonly cancelButton: Locator;

  // Products Table
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
    this.logoutButton = page.locator('aside, .sidebar, nav, div').getByText(/^Đăng xuất$/i).first();

    // Dashboard Cards (dựa trên ảnh Dashboard thực tế)
    // Thẻ 1: Tổng doanh thu (Delivered)
    this.revenueCard = page.locator('div').filter({ hasText: /Tổng doanh thu/i }).first();
    this.revenueAmountText = page.locator('.text-green-600, h2:has-text("đ"), div:has-text("Tổng doanh thu") p, div:has-text("Tổng doanh thu") div').filter({ hasText: /đ/ }).first();

    // Thẻ 2: Tổng số đơn hàng
    this.ordersCountCard = page.locator('div').filter({ hasText: /Tổng số đơn hàng/i }).first();
    this.ordersCountText = page.locator('div:has-text("Tổng số đơn hàng") p, div:has-text("Tổng số đơn hàng") h2, div:has-text("Tổng số đơn hàng") div').filter({ hasText: /^[0-9,.]+$/ }).first();

    // Orders Table (dựa trên ảnh Quản lý Đơn hàng)
    this.orderRows = page.locator('table tbody tr');
    this.firstRowStatusBadge = page.locator('table tbody tr td').nth(4);

    // Các nút hành động chuyển đổi trạng thái
    this.confirmButton = page.locator('table tbody tr button').filter({ hasText: /^Xác nhận$/i }).first();
    this.shipButton = page.locator('table tbody tr button').filter({ hasText: /^Giao hàng$/i }).first();
    this.completeButton = page.locator('table tbody tr button').filter({ hasText: /^Hoàn thành$/i }).first();
    this.cancelButton = page.locator('table tbody tr button').filter({ hasText: /^Hủy$/i }).first();

    // Products table
    this.deleteProductButtons = page.locator('table tbody tr button, table button').filter({ hasText: /xóa/i });
  }

  /**
   * Navigate to admin root
   */
  async goto() {
    await this.page.goto('http://localhost:5174/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Perform Admin Login
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
   * Navigate to Dashboard page via sidebar
   */
  async goToDashboard() {
    if (await this.dashboardSidebarLink.isVisible()) {
      await this.dashboardSidebarLink.click();
      await this.page.waitForTimeout(500);
    } else {
      await this.page.goto('http://localhost:5174/');
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  /**
   * Navigate to Orders management via sidebar
   */
  async goToOrders() {
    if (await this.ordersSidebarLink.isVisible()) {
      await this.ordersSidebarLink.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Navigate to Products section and delete the first product
   */
  async deleteFirstProduct() {
    if (await this.productsSidebarLink.isVisible()) {
      await this.productsSidebarLink.click();
      await this.page.waitForTimeout(600);
    }

    this.page.once('dialog', async (dialog) => {
      await dialog.accept().catch(() => {});
    });

    const firstDeleteBtn = this.deleteProductButtons.first();
    if (await firstDeleteBtn.isVisible()) {
      await firstDeleteBtn.click();
      await this.page.waitForTimeout(800);
    }
  }

  /**
   * Advance the top/first order in table to the desired lifecycle state
   * State transitions:
   * - "Chờ xác nhận" -> Click "Xác nhận" -> "Đã xác nhận"
   * - "Đã xác nhận" -> Click "Giao hàng" -> "Đang giao"
   * - "Đang giao" -> Click "Hoàn thành" -> "Đã giao"
   * - Hoặc click "Hủy" -> "Đã hủy"
   */
  async advanceFirstOrderTo(targetStatus: 'confirmed' | 'shipping' | 'delivered' | 'canceled') {
    await this.goToOrders();
    await this.page.waitForTimeout(500);

    if (targetStatus === 'canceled') {
      if (await this.cancelButton.isVisible()) {
        await this.cancelButton.click();
        await this.page.waitForTimeout(600);
      }
      return;
    }

    // Step 1: "Chờ xác nhận" -> "Xác nhận"
    if (await this.confirmButton.isVisible()) {
      await this.confirmButton.click();
      await this.page.waitForTimeout(600);
    }
    if (targetStatus === 'confirmed') return;

    // Step 2: "Đã xác nhận" -> "Giao hàng"
    if (await this.shipButton.isVisible()) {
      await this.shipButton.click();
      await this.page.waitForTimeout(600);
    }
    if (targetStatus === 'shipping') return;

    // Step 3: "Đang giao" -> "Hoàn thành"
    if (await this.completeButton.isVisible()) {
      await this.completeButton.click();
      await this.page.waitForTimeout(600);
    }
  }

  /**
   * Get revenue text displayed on Dashboard
   */
  async getRevenueText(): Promise<string> {
    await this.goToDashboard();
    return await this.page.evaluate(() => {
      // 1. Tìm tất cả các thẻ card chứa chữ "Tổng doanh thu"
      const cards = Array.from(document.querySelectorAll('div, section, article')).filter(
        (el) => el.textContent?.includes('Tổng doanh thu')
      );
      // Lấy thẻ con cụ thể nhất (chiều dài chuỗi ngắn nhất)
      cards.sort((a, b) => (a.textContent?.length || 0) - (b.textContent?.length || 0));
      const targetCard = cards[0] as HTMLElement;

      if (targetCard) {
        // Trích xuất theo từng dòng trong card
        const lines = (targetCard.innerText || targetCard.textContent || '')
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);
        const valLine = lines.find((l) => /\d/.test(l) && !l.includes('Tổng doanh thu'));
        if (valLine) return valLine;

        // Fallback: Tìm thẻ con chứa chữ số
        const items = Array.from(targetCard.querySelectorAll('*')).filter(
          (el) => el.children.length === 0 && /\d/.test(el.textContent || '')
        );
        if (items.length > 0) return items[0].textContent?.trim() || '';
      }
      return '';
    });
  }

  /**
   * Get orders count text displayed on Dashboard
   */
  async getOrdersCountText(): Promise<string> {
    await this.goToDashboard();
    return await this.page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div, section, article')).filter(
        (el) => el.textContent?.includes('Tổng số đơn hàng')
      );
      cards.sort((a, b) => (a.textContent?.length || 0) - (b.textContent?.length || 0));
      const targetCard = cards[0] as HTMLElement;

      if (targetCard) {
        const lines = (targetCard.innerText || targetCard.textContent || '')
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);
        const valLine = lines.find((l) => /^[0-9,.]+$/.test(l));
        if (valLine) return valLine;

        const items = Array.from(targetCard.querySelectorAll('*')).filter(
          (el) => el.children.length === 0 && /^[0-9,.]+$/.test(el.textContent?.trim() || '')
        );
        if (items.length > 0) return items[0].textContent?.trim() || '';
      }
      return '';
    });
  }

  /**
   * Check if an element text is overflowing its bounding box (for Bug 14 & Bug 15)
   */
  async checkElementOverflow(selector: string): Promise<boolean> {
    return await this.page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
    }, selector);
  }
}
