import { test, expect } from '@playwright/test';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import checkoutTestData from '../test_data/fr08_checkout_data.json';

test.describe('FR-08: Thanh toán & Quản lý Giỏ hàng (Exact EShop UI Flow)', () => {
  let checkoutPage: CheckoutPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    loginPage = new LoginPage(page);
  });

  // Helper: Đăng nhập người dùng chuẩn
  async function performLogin(page: any, email = 'test@eshop.com', password = 'Test1234!') {
    await loginPage.goto();
    await loginPage.login(email, password);
    await page.waitForTimeout(800);
  }

  // Group 1: UI Guest Guard Test (TC_FR-08_09)
  const guestGuardCase = checkoutTestData.find((tc) => tc.id === 'TC_FR-08_09');
  if (guestGuardCase) {
    test(`[${guestGuardCase.id}] ${guestGuardCase.name} (${guestGuardCase.category})`, async ({ page }) => {
      // 1. Khách vãng lai (chưa đăng nhập) vào /product/1 thêm 1 sản phẩm
      await checkoutPage.addProductWithQuantity(1, 1);

      // 2. Bấm vào nút "Giỏ hàng" trên Header
      await checkoutPage.openCartFromHeader();

      // 3. Bấm nút xanh "Tiến hành thanh toán" trên trang giỏ hàng
      await checkoutPage.clickProceedToCheckout();

      // Assertion Type 1: Frontend BẮT BUỘC phải chặn và chuyển hướng về /login
      await expect(page).toHaveURL(/login/, { timeout: 5000 });
      await expect(loginPage.emailInput).toBeVisible({ timeout: 5000 });
    });
  }

  // Group 2: UI Happy Path & Cart Sync Bug (TC_FR-08_01)
  const happyPathCase = checkoutTestData.find((tc) => tc.id === 'TC_FR-08_01');
  if (happyPathCase) {
    test(`[${happyPathCase.id}] ${happyPathCase.name} (${happyPathCase.category})`, async ({ page }) => {
      // 1. Đăng nhập
      await performLogin(page);

      // 2. Vào /product/1 thêm 2 sản phẩm vào giỏ
      await checkoutPage.addProductWithQuantity(2, 1);

      // 3. Bấm vào nút "Giỏ hàng" trên Header
      await checkoutPage.openCartFromHeader();

      // 4. Bấm nút "Tiến hành thanh toán"
      await checkoutPage.clickProceedToCheckout();

      // 5. Bấm nút "Xác Nhận Thanh Toán"
      await checkoutPage.clickConfirmCheckout();

      // Assertion Type 2: Màn hình "Thanh toán thành công!" hiển thị
      await expect(checkoutPage.successHeading).toBeVisible({ timeout: 5000 });

      // 6. Bấm lại vào nút "Giỏ hàng" trên Header để kiểm tra giỏ có tự động xóa không
      await checkoutPage.openCartFromHeader();

      // Assertion nghiêm ngặt: Giỏ hàng BẮT BUỘC phải tự động làm rỗng sau khi thanh toán
      // (SUT giỏ hàng KHÔNG tự xóa sản phẩm cũ nên sẽ FAIL -> Bắt trúng Bug 6)
      const isCartCleaned = await checkoutPage.isCartEmpty();
      expect(isCartCleaned, 'Giỏ hàng phải tự động rỗng sau khi thanh toán thành công').toBe(true);
    });
  }

  // Group 3: Boundary Value Analysis via UI (/product/1 -> Cart -> Checkout) (BVA_01 .. BVA_05)
  const bvaQuantityCases = checkoutTestData.filter((tc) => tc.id.startsWith('TC_FR-08_BVA_'));
  for (const tc of bvaQuantityCases) {
    test(`[${tc.id}] ${tc.name} (${tc.category})`, async ({ page }) => {
      // 1. Đăng nhập
      await performLogin(page);

      // 2. Điền số lượng biên (N = 0, 1, 2, 71, 72) vào ô Số lượng tại /product/1
      await checkoutPage.addProductWithQuantity(tc.quantity ?? 1, 1);

      // 3. Bấm vào nút "Giỏ hàng" trên Header
      await checkoutPage.openCartFromHeader();

      // 4. Bấm "Tiến hành thanh toán"
      await checkoutPage.clickProceedToCheckout();

      // 5. Bấm "Xác Nhận Thanh Toán"
      await checkoutPage.clickConfirmCheckout();

      if (tc.id === 'TC_FR-08_BVA_01') {
        // N = 0: Hệ thống BẮT BUỘC phải từ chối, không được hiển thị "Thanh toán thành công!"
        // (SUT vẫn cho thanh toán đơn hàng có số lượng 0 nên sẽ FAIL -> Bắt trúng Bug 12)
        await expect(checkoutPage.successHeading).not.toBeVisible({ timeout: 2000 });
      } else {
        // N = 1, 2, 71, 72: Thanh toán thành công an toàn, không bị tràn số
        await expect(checkoutPage.successHeading).toBeVisible({ timeout: 5000 });
      }
    });
  }

  // Group 4: UI Empty Cart Checkout Bug (TC_FR-08_04)
  const emptyCartCase = checkoutTestData.find((tc) => tc.id === 'TC_FR-08_04');
  if (emptyCartCase) {
    test(`[${emptyCartCase.id}] ${emptyCartCase.name} (${emptyCartCase.category})`, async ({ page }) => {
      // 1. Đăng nhập
      await performLogin(page);

      // 2. Vào thẳng trang /checkout khi giỏ hàng đang rỗng
      await checkoutPage.gotoCheckout();
      await page.waitForTimeout(500);

      // 3. Bấm "Xác Nhận Thanh Toán"
      await checkoutPage.clickConfirmCheckout();

      // Assertion nghiêm ngặt: Hệ thống BẮT BUỘC phải chặn submit đơn hàng rỗng
      // (SUT vẫn tạo đơn hàng bóng ma khi giỏ rỗng nên sẽ FAIL -> Bắt trúng Bug 9)
      await expect(checkoutPage.successHeading).not.toBeVisible({ timeout: 2000 });
    });
  }

  // Group 5: Data Tampering on Checkout UI (TC_FR-08_02, TC_FR-08_03)
  const tamperingCases = checkoutTestData.filter(
    (tc) => tc.id === 'TC_FR-08_02' || tc.id === 'TC_FR-08_03'
  );
  for (const tc of tamperingCases) {
    test(`[${tc.id}] ${tc.name} (${tc.category})`, async ({ page }) => {
      await performLogin(page);
      await checkoutPage.addProductWithQuantity(1, 1);
      await checkoutPage.openCartFromHeader();
      await checkoutPage.clickProceedToCheckout();

      // Can thiệp sửa trực tiếp giá trị ô "Tổng tiền thanh toán (VND):" trên UI thành 0đ hoặc -10đ
      const tamperedValue = (tc as any).tamperedAmount ?? 0;
      await checkoutPage.setTotalAmount(tamperedValue);

      // Bấm "Xác Nhận Thanh Toán"
      await checkoutPage.clickConfirmCheckout();

      // Assertion nghiêm ngặt: Hệ thống BẮT BUỘC phải từ chối đơn hàng 0đ / âm
      // (SUT vẫn tạo đơn 0đ / âm nên sẽ FAIL -> Bắt trúng Bug 7 & Bug 8)
      await expect(checkoutPage.successHeading).not.toBeVisible({ timeout: 2000 });
    });
  }

  // Group 6: Áp dụng Mã giảm giá hợp lệ SAVE10 (Giảm 10%) (TC_FR-08_05)
  const couponCase = checkoutTestData.find((tc) => tc.id === 'TC_FR-08_05');
  if (couponCase) {
    test(`[${couponCase.id}] ${couponCase.name} (${couponCase.category})`, async ({ page }) => {
      // 1. Đăng nhập
      await performLogin(page);

      // 2. Thêm sản phẩm trị giá 30,000,000đ vào giỏ
      await checkoutPage.addProductWithQuantity(1, 1);

      // 3. Vào giỏ hàng và tiến hành thanh toán
      await checkoutPage.openCartFromHeader();
      await checkoutPage.clickProceedToCheckout();

      // 4. Nhập mã giảm giá SAVE10 và bấm Áp dụng
      await checkoutPage.applyCoupon('SAVE10');

      // 5. Xác nhận thanh toán đơn hàng
      await checkoutPage.clickConfirmCheckout();

      // Assertion: Thanh toán thành công với mã giảm giá hợp lệ
      await expect(checkoutPage.successHeading).toBeVisible({ timeout: 5000 });
    });
  }

  // Group 7: Race Condition: Sản phẩm trong giỏ bị Admin xóa trước thanh toán (TC_FR-08_06)
  const raceConditionCase = checkoutTestData.find((tc) => tc.id === 'TC_FR-08_06');
  if (raceConditionCase) {
    test(`[${raceConditionCase.id}] ${raceConditionCase.name} (${raceConditionCase.category})`, async ({ page, context }) => {
      // 1. User đăng nhập trên trang User (http://localhost:5173)
      await performLogin(page);

      // 2. Thêm sản phẩm vào giỏ hàng
      await checkoutPage.addProductWithQuantity(1, 1);
      await checkoutPage.openCartFromHeader();

      // 3. Mở tab mới truy cập trang Quản trị Admin (http://localhost:5174)
      const adminPageTab = await context.newPage();
      const adminPage = new AdminPage(adminPageTab);
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.deleteFirstProduct();
      await adminPageTab.close();

      // 4. Quay lại trang User, bấm vào "Giỏ hàng" trên Header
      await checkoutPage.openCartFromHeader();

      // 5. Tiến hành thanh toán sản phẩm đã bị xóa
      await checkoutPage.clickProceedToCheckout();
      await checkoutPage.clickConfirmCheckout();

      // Assertion nghiêm ngặt: Hệ thống BẮT BUỘC phải từ chối (báo sản phẩm không còn tồn tại)
      // (SUT vẫn cho phép thanh toán thành công sản phẩm đã bị xóa nên sẽ FAIL -> Bắt trúng Bug Race Condition)
      await expect(checkoutPage.successHeading).not.toBeVisible({ timeout: 2000 });
    });
  }
});
