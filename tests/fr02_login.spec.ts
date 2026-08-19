import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import loginTestData from '../test_data/fr02_login_data.json';

test.describe('FR-02: Đăng nhập & Khóa tài khoản (Refined Step-by-Step Suite)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // TC_FR-02_01: Đăng nhập thành công (Happy Path)
  const tc01 = loginTestData.find((tc) => tc.id === 'TC_FR-02_01');
  if (tc01) {
    test(`[${tc01.id}] ${tc01.name} (${tc01.category})`, async ({ page }) => {
      await loginPage.login(tc01.email, tc01.password);
      await page.waitForTimeout(1000);

      // Assertion: Chuyển hướng thành công về trang chủ
      await expect(page).toHaveURL(/localhost:5173\/?$/, { timeout: 5000 });
      await expect(loginPage.userGreeting).toBeVisible({ timeout: 5000 });
    });
  }

  // TC_FR-02_02: Đăng nhập thành công sau khi hết 30s phạt
  const tc02 = loginTestData.find((tc) => tc.id === 'TC_FR-02_02');
  if (tc02) {
    test(`[${tc02.id}] ${tc02.name} (${tc02.category})`, async ({ page }) => {
      test.setTimeout(45000);

      // 1. Thực hiện sai 3 lần liên tiếp để kích hoạt khóa tài khoản
      for (let i = 1; i <= 3; i++) {
        await loginPage.login(tc02.email, `WrongPass_${i}`);
        await page.waitForTimeout(600);
      }

      // 2. Chờ hết thời gian phạt 30 giây
      await page.waitForTimeout(30000);

      // 3. Đăng nhập lại với mật khẩu đúng
      await loginPage.login(tc02.email, tc02.password);
      await page.waitForTimeout(1000);

      // Assertion: Đăng nhập thành công sau khi hết thời gian khóa
      await expect(page).toHaveURL(/localhost:5173\/?$/, { timeout: 5000 });
    });
  }

  // TC_FR-02_03: Bỏ trống Email
  const tc03 = loginTestData.find((tc) => tc.id === 'TC_FR-02_03');
  if (tc03) {
    test(`[${tc03.id}] ${tc03.name} (${tc03.category})`, async ({ page }) => {
      await loginPage.fillPassword(tc03.password);
      await loginPage.submit();

      await page.waitForTimeout(1200);

      // Assertion: Ô Email bắt buộc phải có validate HTML5 chặn submit
      const isValid = await loginPage.checkValidity('email');
      const validationMessage = await loginPage.getValidationMessage('email');

      expect(isValid, 'Ô Email phải bị chặn không hợp lệ khi bỏ trống').toBe(false);
      expect(validationMessage.length, 'Thông báo lỗi HTML5 phải hiển thị').toBeGreaterThan(0);
    });
  }

  // TC_FR-02_04: Email sai định dạng
  const tc04 = loginTestData.find((tc) => tc.id === 'TC_FR-02_04');
  if (tc04) {
    test(`[${tc04.id}] ${tc04.name} (${tc04.category})`, async ({ page }) => {
      await loginPage.fillEmail(tc04.email);
      await loginPage.fillPassword(tc04.password);
      await loginPage.submit();

      await page.waitForTimeout(1200);

      // Assertion: Ô Email bắt buộc phải có type="email" chặn định dạng sai
      const isValid = await loginPage.checkValidity('email');
      expect(isValid, 'Ô Email phải bị chặn khi nhập sai định dạng không có @').toBe(false);
    });
  }

  // TC_FR-02_05: Bỏ trống Password
  const tc05 = loginTestData.find((tc) => tc.id === 'TC_FR-02_05');
  if (tc05) {
    test(`[${tc05.id}] ${tc05.name} (${tc05.category})`, async ({ page }) => {
      await loginPage.fillEmail(tc05.email);
      await loginPage.submit();

      await page.waitForTimeout(1200);

      // Assertion: Ô Mật khẩu bắt buộc phải có validate HTML5 chặn submit
      const isValid = await loginPage.checkValidity('password');
      const validationMessage = await loginPage.getValidationMessage('password');

      expect(isValid, 'Ô Mật khẩu phải bị chặn khi bỏ trống').toBe(false);
      expect(validationMessage.length, 'Thông báo lỗi HTML5 phải hiển thị').toBeGreaterThan(0);
    });
  }

  // TC_FR-02_06: Email chưa đăng ký
  const tc06 = loginTestData.find((tc) => tc.id === 'TC_FR-02_06');
  if (tc06) {
    test(`[${tc06.id}] ${tc06.name} (${tc06.category})`, async ({ page }) => {
      await loginPage.login(tc06.email, tc06.password);
      await page.waitForTimeout(1000);

      // Assertion: Thông báo lỗi phải hiển thị đúng khi email chưa đăng ký
      await expect(loginPage.alertMessage).toBeVisible({ timeout: 5000 });
      const alertText = await loginPage.getAlertText();
      expect(alertText, 'Thông báo lỗi phải hiển thị đúng khi email chưa đăng ký').toBe(
        tc06.expected.message
      );
    });
  }

  // TC_FR-02_07: Sai Password lần 3 kích hoạt khóa
  const tc07 = loginTestData.find((tc) => tc.id === 'TC_FR-02_07');
  if (tc07) {
    test(`[${tc07.id}] ${tc07.name} (${tc07.category})`, async ({ page }) => {
      // Thực hiện từng bước rõ ràng:
      // Lần 1: Sai mật khẩu
      await loginPage.login(tc07.email, 'WrongPass1');
      await page.waitForTimeout(800);

      // Lần 2: Sai mật khẩu
      await loginPage.login(tc07.email, 'WrongPass2');
      await page.waitForTimeout(800);

      // Lần 3: Sai mật khẩu -> Kích hoạt khóa
      await loginPage.login(tc07.email, 'WrongPass3');
      await page.waitForTimeout(1000);

      // Assertion: Hệ thống phải thông báo khóa tài khoản sau 3 lần sai liên tiếp
      await expect(loginPage.alertMessage).toBeVisible({ timeout: 5000 });
      const alertText = await loginPage.getAlertText();
      expect(alertText, 'Hệ thống phải thông báo khóa tài khoản sau 3 lần sai liên tiếp').toMatch(/tạm khóa|khóa|30s/i);
    });
  }

  // TC_FR-02_08: Tài khoản đang khóa từ chối đăng nhập dù nhập đúng
  const tc08 = loginTestData.find((tc) => tc.id === 'TC_FR-02_08');
  if (tc08) {
    test(`[${tc08.id}] ${tc08.name} (${tc08.category})`, async ({ page }) => {
      // 1. Thực hiện sai 3 lần liên tiếp để kích hoạt khóa
      for (let i = 1; i <= 3; i++) {
        await loginPage.login(tc08.email, `WrongPass_${i}`);
        await page.waitForTimeout(600);
      }

      // 2. Ngay lập tức đăng nhập với thông tin CHÍNH XÁC trong khi đang bị khóa
      await loginPage.login(tc08.email, tc08.password);
      await page.waitForTimeout(1000);

      // Assertion: Hệ thống phải từ chối đăng nhập (không được phép chuyển về trang chủ)
      await expect(page, 'Tài khoản đang bị khóa không được phép đăng nhập vào trang chủ').not.toHaveURL(/localhost:5173\/?$/);
    });
  }

  // TC_FR-02_BVA_01: Biên dưới số lần sai (n = 2)
  const bva01 = loginTestData.find((tc) => tc.id === 'TC_FR-02_BVA_01');
  if (bva01) {
    test(`[${bva01.id}] ${bva01.name} (${bva01.category})`, async ({ page }) => {
      // 1. Thực hiện đúng 2 lần sai
      await loginPage.login(bva01.email, 'WrongPass1');
      await page.waitForTimeout(600);

      await loginPage.login(bva01.email, 'WrongPass2');
      await page.waitForTimeout(800);

      // 2. Tiến hành đăng nhập với mật khẩu đúng
      await loginPage.login(bva01.email, 'Test1234!');
      await page.waitForTimeout(1000);

      // Assertion: n = 2 lần sai chưa bị khóa -> Đăng nhập thành công vào trang chủ
      await expect(page, 'Tại n = 2 lần sai chưa bị khóa, đăng nhập mật khẩu đúng phải thành công').toHaveURL(/localhost:5173\/?$/, { timeout: 5000 });
      await expect(loginPage.userGreeting).toBeVisible({ timeout: 5000 });
    });
  }

  // TC_FR-02_BVA_02: Tại biên số lần sai kích hoạt khóa (n = 3)
  const bva02 = loginTestData.find((tc) => tc.id === 'TC_FR-02_BVA_02');
  if (bva02) {
    test(`[${bva02.id}] ${bva02.name} (${bva02.category})`, async ({ page }) => {
      // 1. Thực hiện đúng 3 lần sai
      for (let i = 1; i <= 3; i++) {
        await loginPage.login(bva02.email, `WrongPass_${i}`);
        await page.waitForTimeout(600);
      }

      // 2. Tiến hành đăng nhập với mật khẩu đúng ngay sau đó
      await loginPage.login(bva02.email, 'Test1234!');
      await page.waitForTimeout(1000);

      // Assertion: Tại n = 3 lần sai tài khoản đã bị khóa -> Không được phép đăng nhập thành công
      await expect(page, 'Tại biên n = 3 lần sai tài khoản phải bị khóa, từ chối đăng nhập').not.toHaveURL(/localhost:5173\/?$/);
    });
  }

  // TC_FR-02_BVA_03: Vượt biên số lần sai (n = 4)
  const bva03 = loginTestData.find((tc) => tc.id === 'TC_FR-02_BVA_03');
  if (bva03) {
    test(`[${bva03.id}] ${bva03.name} (${bva03.category})`, async ({ page }) => {
      // 1. Thực hiện 4 lần sai
      for (let i = 1; i <= 4; i++) {
        await loginPage.login(bva03.email, `WrongPass_${i}`);
        await page.waitForTimeout(600);
      }

      // 2. Tiến hành đăng nhập với mật khẩu đúng ngay sau đó
      await loginPage.login(bva03.email, 'Test1234!');
      await page.waitForTimeout(1000);

      // Assertion: Vượt biên n = 4 lần sai tài khoản vẫn phải bị khóa -> Không được phép đăng nhập thành công
      await expect(page, 'Vượt biên n = 4 lần sai tài khoản vẫn phải bị khóa, từ chối đăng nhập').not.toHaveURL(/localhost:5173\/?$/);
    });
  }

  // TC_FR-02_BVA_05: Tại biên thời gian hết phạt (t = 30s)
  const bva05 = loginTestData.find((tc) => tc.id === 'TC_FR-02_BVA_05');
  if (bva05) {
    test(`[${bva05.id}] ${bva05.name} (${bva05.category})`, async ({ page }) => {
      test.setTimeout(45000);

      // 1. Thực hiện sai 3 lần
      for (let i = 1; i <= 3; i++) {
        await loginPage.login(bva05.email, `WrongPass_${i}`);
        await page.waitForTimeout(600);
      }

      // 2. Chờ đủ mốc biên 30 giây
      await page.waitForTimeout(30000);

      // 3. Đăng nhập lại với mật khẩu đúng
      await loginPage.login(bva05.email, bva05.password);
      await page.waitForTimeout(1000);

      // Assertion: Mở khóa thành công tại mốc 30s
      await expect(page).toHaveURL(/localhost:5173\/?$/, { timeout: 5000 });
    });
  }
});
