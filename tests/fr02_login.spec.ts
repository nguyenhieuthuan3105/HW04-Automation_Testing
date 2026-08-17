import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import loginTestData from '../test_data/fr02_login_data.json';

test.describe('FR-02: Đăng nhập & Khóa tài khoản (Strict Automation Suite)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // Group 1: UI & Form Validation Test Cases (TC_FR-02_03, TC_FR-02_04, TC_FR-02_05)
  const validationCases = loginTestData.filter((tc) => tc.expected.status === 'validation_error');
  for (const tc of validationCases) {
    test(`[${tc.id}] ${tc.name} (${tc.category})`, async ({ page }) => {
      await loginPage.fillEmail(tc.email);
      await loginPage.fillPassword(tc.password);
      await loginPage.submit();

      const targetField = tc.expected.validationField as 'email' | 'password';
      const isValid = await loginPage.checkValidity(targetField);

      // Assertion Type 1: Frontend BẮT BUỘC phải kích hoạt HTML5 Validation (không hợp lệ = false)
      // (Đối với TC_FR-02_04: SUT thiếu validate type="email" nên sẽ FAIL -> Phát hiện Bug 4)
      expect(isValid, `Trường ${targetField} phải bị HTML5 Validation chặn submit`).toBe(false);

      // Assertion Type 2: Trang vẫn phải giữ nguyên ở /login
      await expect(page).toHaveURL(/\/login/);

      // Assertion Type 3: Thông báo lỗi validation của trình duyệt phải xuất hiện
      const validationMsg = await loginPage.getValidationMessage(targetField);
      expect(validationMsg.length).toBeGreaterThan(0);
    });
  }

  // Group 2: Single-Attempt Login Cases (TC_FR-02_01, TC_FR-02_06)
  const singleAttemptCases = loginTestData.filter(
    (tc) => tc.id === 'TC_FR-02_01' || tc.id === 'TC_FR-02_06'
  );
  for (const tc of singleAttemptCases) {
    test(`[${tc.id}] ${tc.name} (${tc.category})`, async ({ page }) => {
      await loginPage.fillEmail(tc.email);
      await loginPage.fillPassword(tc.password);
      await loginPage.submit();

      if (tc.expected.status === 'success') {
        // Assertion Type 4: Chuyển hướng thành công về trang chủ khi đăng nhập đúng
        await expect(page).toHaveURL(/^(?!.*login).*$/, { timeout: 5000 });
      } else {
        // Assertion Type 5: Hiển thị thông báo lỗi bảo mật chung khi sai tài khoản
        await expect(loginPage.alertMessage).toBeVisible({ timeout: 5000 });
        await expect(loginPage.alertMessage).toContainText(/thất bại|lỗi|sai|chưa chính xác|không đúng/i, {
          timeout: 5000,
        });
      }
    });
  }

  // Group 3: Account Lockout & BVA Attempts (TC_FR-02_07, TC_FR-02_08, TC_FR-02_09, TC_FR-02_BVA_01, TC_FR-02_BVA_02, TC_FR-02_BVA_03)
  const lockoutBoundaryCases = loginTestData.filter(
    (tc) =>
      tc.id.startsWith('TC_FR-02_BVA_01') ||
      tc.id.startsWith('TC_FR-02_BVA_02') ||
      tc.id.startsWith('TC_FR-02_BVA_03') ||
      tc.id === 'TC_FR-02_07' ||
      tc.id === 'TC_FR-02_08' ||
      tc.id === 'TC_FR-02_09'
  );

  for (const tc of lockoutBoundaryCases) {
    test(`[${tc.id}] ${tc.name} (${tc.category})`, async ({ page }) => {
      await loginPage.fillEmail(tc.email);
      await loginPage.fillPassword(tc.password);
      await loginPage.submit();

      await expect(loginPage.alertMessage).toBeVisible({ timeout: 5000 });

      if (tc.expected.status === 'lockout') {
        // Assertion nghiêm ngặt: Hệ thống BẮT BUỘC phải thông báo rõ tài khoản đang bị tạm khóa
        // (SUT chỉ hiện thông báo chung "Đăng nhập thất bại..." nên sẽ FAIL -> Phát hiện Bug 2)
        await expect(loginPage.alertMessage).toContainText(/tạm khóa|bị khóa|lock/i, {
          timeout: 3000,
        });
      } else {
        // Trường hợp n = 2: Thông báo sai mật khẩu nhưng không được khóa
        await expect(loginPage.alertMessage).toContainText(/thất bại|không chính xác|sai/i, {
          timeout: 3000,
        });
      }

      await expect(page).toHaveURL(/\/login/);
    });
  }

  // Group 4: Time Boundary Tests (TC_FR-02_02, TC_FR-02_BVA_04, TC_FR-02_BVA_05, TC_FR-02_BVA_06)
  const timeBoundaryCases = loginTestData.filter(
    (tc) =>
      tc.id === 'TC_FR-02_02' ||
      tc.id === 'TC_FR-02_BVA_04' ||
      tc.id === 'TC_FR-02_BVA_05' ||
      tc.id === 'TC_FR-02_BVA_06'
  );

  for (const tc of timeBoundaryCases) {
    test(`[${tc.id}] ${tc.name} (${tc.category})`, async ({ page }) => {
      await loginPage.fillEmail(tc.email);
      await loginPage.fillPassword(tc.password);
      await loginPage.submit();

      if (tc.expected.status === 'success') {
        // Assertion nghiêm ngặt: Khi hết thời gian phạt (>=30s), đăng nhập lại phải thành công
        // (SUT khóa tới 50s và lỗi sync state không tự mở khóa nên sẽ FAIL -> Phát hiện Bug 3 & Bug 5)
        await expect(page).toHaveURL(/^(?!.*login).*$/, { timeout: 5000 });
      } else {
        // Ở mốc t = 29s: Vẫn phải từ chối đăng nhập
        await expect(loginPage.alertMessage).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(/\/login/);
      }
    });
  }
});
