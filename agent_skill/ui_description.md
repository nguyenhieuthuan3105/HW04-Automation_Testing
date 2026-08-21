# 🌐 UI Discovery & DOM Element Inventory (Generic Template)

> **Mục đích:** File này ghi nhận toàn bộ kết quả phân tích giao diện (UI Analysis) và cấu trúc DOM của các trang liên quan đến tính năng.
> AI Agent sử dụng công cụ điều khiển trình duyệt (Puppeteer / Playwright CLI / Headless scanner) để mở các trang SUT, bóc tách cấu trúc phần tử, nhận diện các locator tối ưu, phục vụ việc tạo Page Object Model (POM) và Test Scripts với độ chính xác cao nhất.

---

## 🛠️ Hướng dẫn AI Agent thực hiện UI Discovery (Inspection Workflow)
Khi thực thi phân tích trang, Agent thực hiện các bước sau:
1. **Truy cập URL mục tiêu** bằng Puppeteer / Playwright scanner (`node agent_skill/scripts/scan_ui.js`).
2. **Trích xuất cây phần tử tương tác** (`inputs`, `buttons`, `select`, `textarea`, `alerts`, `modals`, `tables`, `links`).
3. **Ưu tiên chọn Locator theo thứ tự chuẩn Playwright**:
   - `1. getByRole('button', { name: '...' })`
   - `2. getByRole('textbox')` hoặc `getByLabel('...')`
   - `3. getByPlaceholder('...')`
   - `4. getByText('...')`
   - `5. getByTestId('...')`
   - `⚠️ Hạn chế tối đa:` XPath tuyệt đối (`/html/body/...`) hoặc CSS selectors phụ thuộc thứ tự lồng nhau (`div > div:nth-child(3) > input`).
4. **Ghi lại các hành vi bất đồng bộ & Client-Side Routing**:
   - Các hiệu ứng chuyển trang bằng React Router / Vue Router (ưu tiên click thẻ `<a>` thay vì reload trang để giữ nguyên state bộ nhớ).
   - Các cơ chế debounce, loading spinner, hiệu ứng mở modal hoặc toast notification timeout.

---

## 📑 Bảng tổng hợp cấu trúc UI & Bộ định vị (UI Elements Inventory)

### 1. Trang: `[Tên Trang 1 - Ví dụ: Trang Đăng Nhập / Storefront / Form]`
* **Đường dẫn (Path / URL):** `http://localhost:5173/...`
* **Tiêu đề trang (Page Title):** `[Tiêu đề trang]`

#### 🧩 Danh sách phần tử tương tác (Interactive Elements):
| Tên phần tử (Element) | Thẻ HTML & Kiểu | Locator đề xuất (Playwright Recommended) | Ghi chú & Hành vi |
| :--- | :--- | :--- | :--- |
| **Input Trường 1** | `<input type="..." name="...">` | `page.getByPlaceholder('...')` hoặc `page.locator('input[name="..."]')` | Bắt buộc nhập, kiểm tra format |
| **Input Trường 2** | `<input type="..." name="...">` | `page.getByPlaceholder('...')` | Ràng buộc nghiệp vụ |
| **Nút Hành động chính** | `<button type="submit">` | `page.getByRole('button', { name: /.../i })` | Kích hoạt submit form / action |
| **Hộp thông báo Alert/Toast** | `<div class="alert" role="alert">` | `page.getByRole('alert')` hoặc `page.locator('.alert')` | Xuất hiện khi có thông báo / lỗi |
| **Link Điều hướng** | `<a href="...">` | `page.getByRole('link', { name: /.../i })` | Chuyển hướng Client-side |

---

### 2. Trang: `[Tên Trang 2 - Ví dụ: Trang Giỏ hàng / Thanh toán / Danh sách]`
* **Đường dẫn (Path / URL):** `http://localhost:5173/...`

#### 🧩 Danh sách phần tử tương tác:
| Tên phần tử | Thẻ & Kiểu | Locator đề xuất | Ghi chú & Hành vi |
| :--- | :--- | :--- | :--- |
| **Bảng / Danh sách** | `<table>` hoặc `<ul>` | `page.locator('table.items-table')` | Danh sách dữ liệu |
| **Input Tìm kiếm / Lọc** | `<input type="search">` | `page.getByPlaceholder('Tìm kiếm...')` | Lọc dữ liệu động |
| **Dropdown Phân loại** | `<select>` | `page.locator('select.category')` | Chọn giá trị danh mục |
| **Nút Xác nhận** | `<button>` | `page.getByRole('button', { name: /Xác nhận/i })` | Cập nhật dữ liệu |

---

### 3. Trang: `[Tên Trang 3 - Ví dụ: Trang Quản trị / Admin Backoffice]`
* **Đường dẫn (Path / URL):** `http://localhost:5174/...`

#### 🧩 Danh sách phần tử tương tác:
| Tên phần tử | Thẻ & Kiểu | Locator đề xuất | Ghi chú & Hành vi |
| :--- | :--- | :--- | :--- |
| **Thẻ Thống kê (Stat Card)** | `<div class="stat-card">` | `page.locator('.stat-card')` | Hiển thị số liệu |
| **Dropdown Trạng thái** | `<select>` | `page.locator('select.status')` | Chuyển đổi trạng thái nghiệp vụ |
| **Nút Lưu / Cập nhật** | `<button>` | `page.getByRole('button', { name: /Lưu|Cập nhật/i })` | Gửi thay đổi lên server |
