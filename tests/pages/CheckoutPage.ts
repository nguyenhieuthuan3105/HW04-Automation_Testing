import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for FR-08: Checkout & Cart Operations
 * Exactly matching EShop screens
 */
export class CheckoutPage {
  readonly page: Page;

  // Header
  readonly cartHeaderLink: Locator;
  readonly userGreeting: Locator;
  readonly logoutButton: Locator;

  // Product Detail Page (/product/1)
  readonly productQuantityInput: Locator;
  readonly addToCartButton: Locator;

  // Cart Page (/cart)
  readonly proceedToCheckoutButton: Locator;
  readonly continueShoppingLink: Locator;
  readonly emptyCartNotice: Locator;
  readonly cartItemRows: Locator;
  readonly cartSubtotalText: Locator;

  // Checkout Page (/checkout)
  readonly totalAmountInput: Locator;
  readonly couponCodeInput: Locator;
  readonly applyCouponButton: Locator;
  readonly confirmCheckoutButton: Locator;

  // Success Confirmation Screen
  readonly successHeading: Locator;
  readonly backToHomeLink: Locator;

  // Alerts
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header: Chỉ định chính xác nút text "Giỏ hàng" (tránh click nhầm vào vùng header khác)
    this.cartHeaderLink = page.locator('header, nav').getByText(/^Giỏ hàng$/i).first();
    this.userGreeting = page.locator('header, nav').getByText(/Chào, Test User/i).first();
    this.logoutButton = page.locator('header, nav').getByRole('button', { name: /thoát/i }).or(page.locator('header, nav :has-text("Thoát")')).first();

    // Product Detail Page
    this.productQuantityInput = page.locator('input[type="number"], input').first();
    this.addToCartButton = page.locator('button').filter({ hasText: /^Thêm vào giỏ hàng$/i }).first();

    // Cart Page
    this.proceedToCheckoutButton = page.locator('button, a').filter({ hasText: /^Tiến hành thanh toán$/i }).first();
    this.continueShoppingLink = page.locator('a, button').filter({ hasText: /Mua tiếp|Tiếp tục mua sắm/i }).first();
    this.emptyCartNotice = page.locator(':has-text("Giỏ hàng của bạn đang trống"), :has-text("Giỏ hàng trống")').first();
    this.cartItemRows = page.locator('table tbody tr, .cart-item, div:has-text("iPhone 15 Pro Max")');
    this.cartSubtotalText = page.locator(':has-text("Tổng tạm tính:"), :has-text("30,000,000")').first();

    // Checkout Page
    // Ô input nhập tổng tiền thanh toán (VND) - Cho phép sửa giá trị (Bắt Bug 7 & Bug 8)
    this.totalAmountInput = page.locator('input[type="number"], input[type="text"], input').first();
    this.couponCodeInput = page.locator('input[placeholder*="MÃ GIẢM GIÁ"], input[placeholder*="mã"]').first();
    this.applyCouponButton = page.locator('button').filter({ hasText: /^Áp dụng$/i }).first();
    this.confirmCheckoutButton = page.locator('button').filter({ hasText: /^Xác Nhận Thanh Toán$/i }).first();

    // Success Screen
    this.successHeading = page.locator('h1, h2, h3, div').filter({ hasText: /^Thanh toán thành công!$/i }).first();
    this.backToHomeLink = page.locator('a, button').filter({ hasText: /Quay lại trang chủ/i }).first();

    // General alert
    this.alertMessage = page.locator('.toast, .alert, [role="alert"], .message, div:has-text("thành công"), div:has-text("thất bại")').first();
  }

  /**
   * Navigate to home page
   */
  async gotoHome() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to product detail page (/product/1)
   */
  async gotoProductDetail(productId: number = 1) {
    await this.page.goto(`/product/${productId}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate directly to checkout page (/checkout)
   */
  async gotoCheckout() {
    await this.page.goto('/checkout');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Add product with specific quantity from product detail page
   * (Click 2 times on green button "Thêm vào giỏ hàng" to bypass product detail UI bug)
   */
  async addProductWithQuantity(quantity: number, productId: number = 1) {
    await this.gotoProductDetail(productId);
    await this.page.waitForTimeout(400);

    // Điền số lượng vào ô input
    if (await this.productQuantityInput.isVisible()) {
      await this.productQuantityInput.fill(quantity.toString());
    }

    // Bấm nút "Thêm vào giỏ hàng" 2 lần
    if (await this.addToCartButton.isVisible()) {
      await this.addToCartButton.click();
      await this.page.waitForTimeout(300);
      await this.addToCartButton.click();
      await this.page.waitForTimeout(600);
    }
  }

  /**
   * Click the "Giỏ hàng" link in header (Client-side routing)
   */
  async openCartFromHeader() {
    await this.cartHeaderLink.click();
    await this.page.waitForTimeout(600);
  }

  /**
   * Click green button "Tiến hành thanh toán" on Cart page
   */
  async clickProceedToCheckout() {
    if (await this.proceedToCheckoutButton.isVisible()) {
      await this.proceedToCheckoutButton.click();
      await this.page.waitForTimeout(600);
    }
  }

  /**
   * Edit total amount input on checkout page (for testing Bug 7 & Bug 8)
   */
  async setTotalAmount(amount: number) {
    if (await this.totalAmountInput.isVisible()) {
      await this.totalAmountInput.fill(amount.toString());
    }
  }

  /**
   * Click green button "Xác Nhận Thanh Toán" on Checkout page
   */
  async clickConfirmCheckout() {
    if (await this.confirmCheckoutButton.isVisible()) {
      await this.confirmCheckoutButton.click();
      await this.page.waitForTimeout(800);
    }
  }

  /**
   * Apply coupon code on checkout page (/checkout)
   */
  async applyCoupon(code: string) {
    if (await this.couponCodeInput.isVisible()) {
      await this.couponCodeInput.fill(code);
      if (await this.applyCouponButton.isVisible()) {
        await this.applyCouponButton.click();
        await this.page.waitForTimeout(600);
      }
    }
  }

  /**
   * Check if the cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    const pageText = (await this.page.textContent('body')) || '';
    if (pageText.includes('Giỏ hàng của bạn đang trống') || pageText.includes('Giỏ hàng trống')) {
      return true;
    }
    // Nếu vẫn còn hàng sản phẩm trong bảng giỏ hàng
    const itemCount = await this.cartItemRows.count();
    return itemCount === 0;
  }
}
