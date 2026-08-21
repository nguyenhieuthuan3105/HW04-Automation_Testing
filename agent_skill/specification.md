# 📋 Feature Specification & Test Configuration

> **Mục đích:** File này là nơi Người dùng (Tester/Developer) cung cấp toàn bộ thông tin đặc tả nghiệp vụ, môi trường và cấu hình kiểm thử của tính năng cho AI Agent Skill.

---

## 1. Thông tin tính năng (Feature Information)
* **Pool tính năng (Feature Pool):** `[Pool A / Pool B / Pool C]` *(Chọn Pool tương ứng)*
* **Mã tính năng (Feature ID):** `[Ví dụ: FR-02 / FR-08 / FR-13]`
* **Tên tính năng (Feature Name):** `[Ví dụ: Login and account lockout / Checkout / Dashboard]`
* **Mô tả nghiệp vụ tóm tắt:**
  * *[Mô tả luồng hoạt động chính, quy tắc nghiệp vụ, các ràng buộc và xử lý biên]*

---

## 2. Thông tin môi trường & Hệ thống SUT (System Under Test)
* **URL Giao diện người dùng (Storefront / User URL):** `http://localhost:5173`
* **URL Giao diện Quản trị viên (Admin Dashboard URL):** `http://localhost:5174`
* **API Backend Base URL (nếu có):** `http://localhost:3000`
* **Tài khoản kiểm thử (Test Accounts / Roles):**
  * **Tài khoản người dùng (Customer):** `email: [user@example.com]` / `password: [password123]`
  * **Tài khoản quản trị (Admin):** `email: [admin@example.com]` / `password: [admin123]`
  * **Trạng thái tài khoản đặc biệt (nếu có):** `[Ví dụ: Tài khoản bị khóa, tài khoản chưa kích hoạt,...]`

---

## 3. Lựa chọn định dạng Test Data (Data-Driven Configuration)
* **Định dạng dữ liệu kiểm thử ưu tiên:** `[JSON / CSV]` *(Khuyến nghị: JSON cho cấu trúc dữ liệu lồng nhau, CSV cho dữ liệu bảng phẳng)*
* **Đường dẫn lưu trữ file data:** `test_data/[tên_tính_năng]_data.[json|csv]`

---

## 4. Ràng buộc kiểm thử & Dấu định danh (Anti-Cheat & Watermark)
* **Mã số sinh viên (StudentID):** `[Ví dụ: 12345678]`
* **Họ và tên sinh viên:** `[Ví dụ: Nguyễn Văn A]`
* **Trình duyệt mục tiêu (Multi-Browser Targets):**
  * [x] **Chromium** (Desktop Chrome)
  * [x] **Firefox** (Desktop Firefox)
  * [x] **WebKit** (Desktop Safari)
* **Thư mục xuất báo cáo HTML:** `reports/[tên_tính_năng]_report` hoặc `reports/html_report`

---

## 5. Các lưu ý đặc biệt & Hành vi SUT đã biết (Known Behaviors & Edge Conditions)
* *[Ví dụ: Client-side routing yêu cầu click link điều hướng thay vì reload trang để tránh mất state giỏ hàng]*
* *[Ví dụ: Thời gian khóa tài khoản là 30 giây sau 3 lần đăng nhập sai]*
* *[Ví dụ: State machine của đơn hàng: pending -> confirmed -> shipping -> delivered / canceled]*
