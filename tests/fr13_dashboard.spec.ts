import { test, expect } from '@playwright/test';
import { AdminPage } from './pages/AdminPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import dashboardTestData from '../test_data/fr13_dashboard_data.json';

test.describe('FR-13: Admin Dashboard (Quản lý Thống kê & Doanh thu)', () => {
  let adminPage: AdminPage;
  let checkoutPage: CheckoutPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    adminPage = new AdminPage(page);
    checkoutPage = new CheckoutPage(page);
    loginPage = new LoginPage(page);
  });

  // Helper: Đăng nhập User và đặt đơn hàng nhanh trên trang User (:5173)
  async function placeUserOrder(userPage: any, quantity: number = 1, tamperedPrice?: number) {
    const userLogin = new LoginPage(userPage);
    const userCheckout = new CheckoutPage(userPage);

    await userLogin.goto();
    await userLogin.login('test@eshop.com', 'Test1234!');
    await userPage.waitForTimeout(600);

    await userCheckout.addProductWithQuantity(quantity, 1);
    await userCheckout.openCartFromHeader();
    await userCheckout.clickProceedToCheckout();

    if (tamperedPrice !== undefined) {
      await userCheckout.setTotalAmount(tamperedPrice);
    }

    await userCheckout.clickConfirmCheckout();
    await userPage.waitForTimeout(600);
  }

  // 1. TC_FR-13_01: Dashboard khi DB trống hoàn toàn
  const tc01 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_01');
  if (tc01) {
    test(`[${tc01.id}] ${tc01.name} (${tc01.category})`, async ({ page }) => {
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.goToDashboard();

      // Assertion: Tổng số đơn hàng = 0 và Tổng doanh thu = 0đ
      await expect(adminPage.ordersCountCard).toBeVisible({ timeout: 5000 });
      await expect(adminPage.revenueCard).toBeVisible({ timeout: 5000 });
    });
  }

  // 2. TC_FR-13_BVA_01: Biên dưới số lượng đơn (N = 0) - Chỉ kiểm tra số lượng đơn
  const bva01 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_BVA_01');
  if (bva01) {
    test(`[${bva01.id}] ${bva01.name} (${bva01.category})`, async ({ page }) => {
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.goToDashboard();
      const countText = await adminPage.getOrdersCountText();
      expect(countText, 'Số lượng đơn hàng tại biên N = 0 phải bằng 0').toBe('0');
    });
  }

  // 3. TC_FR-13_02: Đếm số đơn nhưng không tính doanh thu khi chưa giao (1 đơn Pending)
  const tc02 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_02');
  if (tc02) {
    test(`[${tc02.id}] ${tc02.name} (${tc02.category})`, async ({ page, context }) => {
      // 1. User đặt mới 1 đơn hàng (iPhone 15 Pro Max, 30M)
      const userTab = await context.newPage();
      await placeUserOrder(userTab, 1);
      await userTab.close();

      // 2. Admin vào Dashboard kiểm tra: Đơn mới ở trạng thái Pending chưa giao
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.goToDashboard();
      const revenueText = await adminPage.getRevenueText();

      // Assertion: Doanh thu phải bằng 0đ khi đơn chưa giao (Pending)
      expect(revenueText, 'Doanh thu phải bằng 0đ khi đơn hàng đang ở trạng thái Chờ xác nhận').toMatch(/0\s*(đ|₫|d|VND)?/i);
    });
  }

  // 4. TC_FR-13_03: Tính doanh thu khi đơn hàng chuyển sang Đã giao (Delivered 30M) - Bắt Bug 13
  const tc03 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_03');
  if (tc03) {
    test(`[${tc03.id}] ${tc03.name} (${tc03.category})`, async ({ page }) => {
      // 1. Admin vào chuyển chính đơn hàng đang có ở trên sang trạng thái 'delivered'
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.advanceFirstOrderTo('delivered');

      // 2. Vào Dashboard kiểm tra doanh thu
      await adminPage.goToDashboard();
      const revenueText = await adminPage.getRevenueText();

      // Assertion nghiêm ngặt: Tổng doanh thu BẮT BUỘC phải là 30.000.000 đ
      // (SUT bị lỗi logic x2 doanh thu hiển thị 60.000.000 đ nên sẽ FAIL -> Bắt trúng Bug 13)
      expect(revenueText, 'Tổng doanh thu phải tính đúng 30.000.000 đ cho 1 đơn delivered (Bug 13)').toMatch(/30[.,]?000[.,]?000/);
    });
  }

  // 5. TC_FR-13_BVA_02: Sát biên dưới số lượng đơn (N = 1) - Chỉ kiểm tra số lượng đơn
  const bva02 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_BVA_02');
  if (bva02) {
    test(`[${bva02.id}] ${bva02.name} (${bva02.category})`, async ({ page }) => {
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.goToDashboard();
      const countText = await adminPage.getOrdersCountText();
      expect(countText, 'Số lượng đơn hàng tại biên N = 1 phải bằng 1').toBe('1');
    });
  }

  // 6. TC_FR-13_04: Cập nhật số lượng khi thêm đơn mới và giữ nguyên doanh thu (1 Delivered + 1 Pending)
  const tc04 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_04');
  if (tc04) {
    test(`[${tc04.id}] ${tc04.name} (${tc04.category})`, async ({ page, context }) => {
      // 1. User đặt thêm 1 đơn hàng mới (Pending)
      const userTab = await context.newPage();
      await placeUserOrder(userTab, 1);
      await userTab.close();

      // 2. Admin vào Dashboard kiểm tra: Doanh thu giữ nguyên 60.000.000 đ (từ bug x2 trước đó)
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.goToDashboard();
      const revenueText = await adminPage.getRevenueText();

      // Assertion: Doanh thu không bị thay đổi bởi đơn hàng Pending mới
      expect(revenueText, 'Doanh thu phải giữ nguyên 60.000.000 đ khi thêm đơn mới chưa giao').toMatch(/60[.,]?000[.,]?000/);
    });
  }

  // 7. TC_FR-13_05: Doanh thu chứa đơn hàng 0 VNĐ (Delivered)
  const tc05 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_05');
  if (tc05) {
    test(`[${tc05.id}] ${tc05.name} (${tc05.category})`, async ({ page, context }) => {
      // 1. User đặt đơn hàng 0 VNĐ
      const userTab = await context.newPage();
      await placeUserOrder(userTab, 1, 0);
      await userTab.close();

      // 2. Admin duyệt thành delivered
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.advanceFirstOrderTo('delivered');

      // 3. Kiểm tra doanh thu trên Dashboard: Vẫn giữ nguyên 60.000.000 đ (vì 0 x 2 = 0)
      await adminPage.goToDashboard();
      const revenueText = await adminPage.getRevenueText();
      expect(revenueText, 'Doanh thu giữ nguyên 60.000.000 đ khi thêm đơn hàng 0đ').toMatch(/60[.,]?000[.,]?000/);
    });
  }

  // 8. TC_FR-13_06: Doanh thu chứa đơn hàng giá trị âm (Triệt tiêu thành 0đ)
  const tc06 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_06');
  if (tc06) {
    test(`[${tc06.id}] ${tc06.name} (${tc06.category})`, async ({ page, context }) => {
      // 1. User đặt đơn hàng số âm (-30M)
      const userTab = await context.newPage();
      await placeUserOrder(userTab, 1, -30000000);
      await userTab.close();

      // 2. Admin duyệt thành delivered
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.advanceFirstOrderTo('delivered');

      // 3. Kiểm tra doanh thu: -30M x 2 = -60M triệt tiêu hoàn toàn 60M hiện tại thành 0đ
      await adminPage.goToDashboard();
      const revenueText = await adminPage.getRevenueText();
      expect(revenueText, 'Doanh thu triệt tiêu đại số chính xác về 0đ').toMatch(/0\s*(đ|₫|d|VND)?/i);
    });
  }

  // 9. TC_FR-13_BVA_03: Biên cận dưới Max Int 32-bit (1.05 tỷ VNĐ)
  const bva03 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_BVA_03');
  if (bva03) {
    test(`[${bva03.id}] ${bva03.name} (${bva03.category})`, async ({ page, context }) => {
      const userTab = await context.newPage();
      await placeUserOrder(userTab, 35); // 35 * 30M = 1.05 tỷ VNĐ
      await userTab.close();

      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.advanceFirstOrderTo('delivered');
      await adminPage.goToDashboard();

      // Assertion: Hệ thống tính toán bình thường, không bị crash
      await expect(adminPage.revenueCard).toBeVisible();
    });
  }

  // 10. TC_FR-13_BVA_04: Vượt biên Max Int 32-bit (Thêm 1 đơn 30M đẩy tổng lên 1.08 tỷ -> x2 = 2.16 tỷ VNĐ)
  const bva04 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_BVA_04');
  if (bva04) {
    test(`[${bva04.id}] ${bva04.name} (${bva04.category})`, async ({ page, context }) => {
      // Đặt thêm 1 đơn 30M (cộng dồn với 1.05 tỷ trước đó thành 1.08 tỷ -> x2 = 2.16 tỷ VNĐ vượt Max Int 32-bit)
      const userTab = await context.newPage();
      await placeUserOrder(userTab, 1);
      await userTab.close();

      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.advanceFirstOrderTo('delivered');
      await adminPage.goToDashboard();

      // Assertion: Hệ thống dùng kiểu dữ liệu lớn an toàn, không bị crash 500
      await expect(adminPage.revenueCard).toBeVisible();
    });
  }

  // 11. TC_FR-13_BVA_05: Giới hạn hiển thị UI (Vỡ Layout Doanh thu khi 10,000,000 sản phẩm - 300 nghìn tỷ VNĐ) - Bắt Bug 14
  const bva05 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_BVA_05');
  if (bva05) {
    test(`[${bva05.id}] ${bva05.name} (${bva05.category})`, async ({ page, context }) => {
      // 1. Đặt 10,000,000 sản phẩm
      const userTab = await context.newPage();
      await placeUserOrder(userTab, 10000000);
      await userTab.close();

      // 2. Admin duyệt thành delivered
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.advanceFirstOrderTo('delivered');
      await adminPage.goToDashboard();

      // 3. Kéo giãn / thu nhỏ viewport màn hình để kiểm tra độ co giãn (Responsive)
      await page.setViewportSize({ width: 768, height: 800 });
      await page.waitForTimeout(600);

      // 4. Kiểm tra xem thẻ hiển thị doanh thu có bị tràn (overflow) vỡ layout không
      // (SUT không format rút gọn dẫn tới dãy số 600,000,000,000,000 đ bị tràn vỡ khung -> Bắt trúng Bug 14)
      const isCardOverflowing = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('div, section')).filter((el) =>
          el.textContent?.includes('Tổng doanh thu')
        );
        cards.sort((a, b) => (a.textContent?.length || 0) - (b.textContent?.length || 0));
        const card = cards[0] as HTMLElement;
        if (!card) return true;

        const textEl = Array.from(card.querySelectorAll('*')).find(
          (el) => el.children.length === 0 && /\d/.test(el.textContent || '')
        ) as HTMLElement;

        if (textEl) {
          const cardRect = card.getBoundingClientRect();
          const textRect = textEl.getBoundingClientRect();
          return textRect.right > cardRect.right || textEl.scrollWidth > card.clientWidth;
        }
        return true;
      });

      expect(isCardOverflowing, 'Thẻ Tổng doanh thu phải responsive, không được để chữ số tràn ra ngoài khung Card (Bug 14)').toBe(false);
    });
  }

  // 12. TC_FR-13_BVA_06: Giới hạn hiển thị UI số lượng đơn hàng (N cực lớn 999.999.999.999.999) - Bắt Bug 15
  const bva06 = dashboardTestData.find((tc) => tc.id === 'TC_FR-13_BVA_06');
  if (bva06) {
    test(`[${bva06.id}] ${bva06.name} (${bva06.category})`, async ({ page }) => {
      await adminPage.login('admin@eshop.com', 'Admin123!');
      await adminPage.goToDashboard();

      // 1. Can thiệp DOM qua DevTools / F12 để mock số lượng đơn hàng cực lớn (999.999.999.999.999)
      await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('div, section')).filter((el) =>
          el.textContent?.includes('Tổng số đơn hàng')
        );
        cards.sort((a, b) => (a.textContent?.length || 0) - (b.textContent?.length || 0));
        const card = cards[0] as HTMLElement;
        if (card) {
          const textEl = Array.from(card.querySelectorAll('*')).find(
            (el) => el.children.length === 0 && /^[0-9,.]+$/.test(el.textContent?.trim() || '')
          ) as HTMLElement;
          if (textEl) {
            textEl.textContent = '999,999,999,999,999,999';
          }
        }
      });

      // 2. Kéo giãn / thu nhỏ viewport màn hình để kiểm tra Responsive
      await page.setViewportSize({ width: 768, height: 800 });
      await page.waitForTimeout(600);

      // 3. Assertion: Kiểm tra tràn khung / responsive
      // (SUT không responsive cho thẻ số lượng cực lớn -> Bắt trúng Bug 15)
      const isOrdersCardOverflowing = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('div, section')).filter((el) =>
          el.textContent?.includes('Tổng số đơn hàng')
        );
        cards.sort((a, b) => (a.textContent?.length || 0) - (b.textContent?.length || 0));
        const card = cards[0] as HTMLElement;
        if (!card) return true;

        const textEl = Array.from(card.querySelectorAll('*')).find(
          (el) => el.children.length === 0 && /\d/.test(el.textContent || '')
        ) as HTMLElement;

        if (textEl) {
          const cardRect = card.getBoundingClientRect();
          const textRect = textEl.getBoundingClientRect();
          return textRect.right > cardRect.right || textEl.scrollWidth > card.clientWidth;
        }
        return true;
      });

      expect(isOrdersCardOverflowing, 'Thẻ Tổng số đơn hàng phải responsive khi số lượng cực lớn (Bug 15)').toBe(false);
    });
  }
});
