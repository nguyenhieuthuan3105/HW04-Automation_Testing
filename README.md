# BÀI TẬP LỚN HW04: AUTOMATION TESTING (AI-FIRST STRATEGY)

> **Môn học:** Kiểm thử phần mềm (Software Testing)  
> **Hệ thống thử nghiệm (SUT):** EShop Web E-commerce Platform  
> **Sinh viên thực hiện:** Nguyễn Hiếu Thuận  
> **Mã số sinh viên (MSSV):** 23127125  
> **Mã bài tập:** HW04-AI  
> **Framework kiểm thử:** Playwright (TypeScript) + Playwright HTML Reporter  
> **Kho lưu trữ GitHub:** [https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing)

---

## 💯 1. BẢNG TỰ ĐÁNH GIÁ ĐIỂM (SELF-ASSESSMENT GRADE TABLE)

| STT | Tiêu chí đánh giá (Criteria) | Điểm tối đa | Điểm tự đánh giá | Minh chứng & Ghi chú |
| :---: | :--- | :---: | :---: | :--- |
| **1** | **Task 1 – Feature A: FR-02 (Login & Lockout)**<br>• Data-driven testing 100% (`fr02_login_data.json`)<br>• Đa dạng Assertions (URL, Visible, HTML5 validity, Timeout)<br>• Multi-browser execution (Chromium, Firefox, WebKit)<br>• Page Object Model (`LoginPage.ts`) & Báo cáo HTML<br>• Human Review & Gap Analysis | **25** | **25 / 25** | • Đạt 12/12 TCs (4 Pass, 8 Fail bắt trúng Bug 1, 2, 3, 4, 5).<br>• Kịch bản tự động thực hiện đa lần nhập sai và timeout 30s mở khóa.<br>• Phân tích sâu sắc lỗi AI sinh code và cách con người can thiệp. |
| **2** | **Task 1 – Feature B: FR-08 (Checkout & Cart)**<br>• Data-driven testing 100% (`fr08_checkout_data.json`)<br>• Luồng tương tác người dùng thực tế trên UI Browser<br>• Phối hợp đa vai trò User (`:5173`) & Admin (`:5174`)<br>• Mã giảm giá `SAVE10` & Kiểm thử điều kiện Race Condition<br>• Bắt trúng các lỗi gian lận giá tiền (0đ, số âm) và tràn số | **25** | **25 / 25** | • Đạt 12/12 TCs (6 Pass, 6 Fail bắt trúng Bug 6, 7, 8, 9, 12 và Race Condition).<br>• Loại bỏ hoàn toàn can thiệp máy móc F12, chuyển 100% sang thao tác UI người dùng. |
| **3** | **Task 1 – Feature C: FR-13 (Admin Dashboard)**<br>• Data-driven testing 100% (`fr13_dashboard_data.json`)<br>• Phối hợp User đặt hàng & Admin duyệt State Machine<br>• Kiểm thử biên Max Int 32-bit (1.05 tỷ & 1.08 tỷ VNĐ)<br>• Kiểm thử Responsive & Tràn khung (Bug 14, 15)<br>• Bắt trúng Bug 13 (Nhân đôi doanh thu x2) | **25** | **25 / 25** | • Đạt 12/12 TCs (9 Pass, 3 Fail bắt trúng Bug 13, 14, 15).<br>• Tự động hóa kiểm tra co giãn màn hình (Responsive Viewport) và tràn khung số lớn. |
| **4** | **Task 2 – Video Demo Thuyết minh**<br>• Thời lượng $\ge 5$ phút trên YouTube (Unlisted)<br>• Thuyết minh tiếng Việt rõ ràng, mạch lạc<br>• Minh chứng tác giả (Terminal `whoami` & `hostname`)<br>• Trình diễn luồng chạy Playwright + Báo cáo HTML<br>• Phân tích trực tiếp lỗi AI sinh ra và cách đã sửa | **15** | **15 / 15** | • Video demo đầy đủ các tiêu chí kỹ thuật và bằng chứng xác thực tác giả. |
| **5** | **Agent Skill (Bonus 10 điểm)**<br>• Đóng gói Automation QA Agent Skill (`agent_skill/SKILL.md`)<br>• Kèm Video demo ứng dụng Agent Skill | **10** | **10 / 10** | • Đóng gói quy trình tự động hóa Playwright tái sử dụng cho các dự án E-commerce khác. |
| **TỔNG CỘNG** | | **100** | **100 / 100** | **Xuất sắc (Hoàn thành 100% yêu cầu + Bonus)** |

---

## 📊 2. BẢNG TỔNG KẾT KẾT QUẢ KIỂM THỬ (TEST EXECUTION SUMMARY)

### 📈 Thống kê tổng quan:
- **Tổng số Test Cases:** **36 Test Cases** (12 TCs / Tính năng $\times$ 3 Tính năng).
- **Số ca PASSED:** **19 Test Cases** (52.8%).
- **Số ca FAILED (Bắt trúng Bug thực tế của SUT):** **17 Test Cases** (47.2%).
- **Số lỗi SUT phát hiện & tái hiện thành công:** **15 / 15 Bugs** (Kế thừa trọn vẹn từ HW02).
- **Môi trường trình duyệt hỗ trợ:** Chromium, Firefox, WebKit.

### 📋 Chi tiết kết quả 36 Test Cases:

#### 🔹 1. FR-02: Đăng nhập & Khóa tài khoản (`tests/fr02_login.spec.ts`)
| STT | Mã Test Case | Tên kịch bản & Mục tiêu | Phân loại | Kết quả SUT | Bug liên quan |
| :---: | :--- | :--- | :---: | :---: | :--- |
| 1 | `TC_FR-02_01` | Đăng nhập thành công lần đầu | Positive (Happy Path) | 🟢 **PASSED** | - |
| 2 | `TC_FR-02_02` | Đăng nhập thành công sau khi hết 30s phạt | Positive (Timeout) | 🟢 **PASSED** | - |
| 3 | `TC_FR-02_03` | Bỏ trống ô Email (Kiểm tra required) | Negative (Validation) | 🔴 **FAILED** | **[Bug 1]** Thiếu required trên Email |
| 4 | `TC_FR-02_04` | Email sai định dạng (Kiểm tra type="email") | Negative (Validation) | 🔴 **FAILED** | **[Bug 4]** Thiếu type="email" |
| 5 | `TC_FR-02_05` | Bỏ trống Mật khẩu (Kiểm tra required) | Negative (Validation) | 🔴 **FAILED** | **[Bug 2]** Thiếu required trên Mật khẩu |
| 6 | `TC_FR-02_06` | Email chưa đăng ký (Thông báo chung bảo mật) | Negative (Security) | 🔴 **FAILED** | **[Bug 5]** Tiết lộ email không tồn tại |
| 7 | `TC_FR-02_07` | Nhập sai 3 lần liên tiếp để kích hoạt khóa | Negative (Lock Trigger) | 🔴 **FAILED** | **[Bug 3]** Không khóa tài khoản |
| 8 | `TC_FR-02_08` | Đang bị khóa nhập đúng vẫn bị từ chối | Negative (Lock State) | 🔴 **FAILED** | **[Bug 3]** Không khóa tài khoản |
| 9 | `TC_FR-02_BVA_01` | Biên dưới số lần sai ($n = 2$) | Boundary ($n=2$) | 🟢 **PASSED** | Chưa bị khóa |
| 10 | `TC_FR-02_BVA_02` | Tại biên kích hoạt khóa ($n = 3$) | Boundary ($n=3$) | 🔴 **FAILED** | **[Bug 3]** Không khóa tài khoản |
| 11 | `TC_FR-02_BVA_03` | Vượt biên số lần sai ($n = 4$) | Boundary ($n=4$) | 🔴 **FAILED** | **[Bug 3]** Không khóa tài khoản |
| 12 | `TC_FR-02_BVA_05` | Tại biên thời gian hết phạt ($t = 30s$) | Boundary ($t=30s$) | 🟢 **PASSED** | Mở khóa thành công |

---

#### 🔹 2. FR-08: Thanh toán & Giỏ hàng (`tests/fr08_checkout.spec.ts`)
| STT | Mã Test Case | Tên kịch bản & Mục tiêu | Phân loại | Kết quả SUT | Bug liên quan |
| :---: | :--- | :--- | :---: | :---: | :--- |
| 1 | `TC_FR-08_01` | Thanh toán đơn hàng thành công & dọn giỏ | Positive (Happy Path) | 🔴 **FAILED** | **[Bug 6]** Không tự động xóa giỏ hàng |
| 2 | `TC_FR-08_02` | Chặn gian lận thanh toán đơn hàng 0 VNĐ | Negative (Tampering) | 🔴 **FAILED** | **[Bug 7]** Chấp nhận đơn hàng 0 VNĐ |
| 3 | `TC_FR-08_03` | Chặn gian lận thanh toán đơn hàng số âm | Negative (Tampering) | 🔴 **FAILED** | **[Bug 8]** Chấp nhận đơn hàng số âm |
| 4 | `TC_FR-08_04` | Chặn tạo đơn hàng ma khi giỏ hàng trống | Negative (Empty Cart) | 🔴 **FAILED** | **[Bug 9]** Tạo đơn khi giỏ hàng trống |
| 5 | `TC_FR-08_05` | Áp dụng mã giảm giá hợp lệ `SAVE10` | Positive (Coupon) | 🟢 **PASSED** | Giảm giá 10% thành công |
| 6 | `TC_FR-08_06` | Xử lý Race Condition (Admin xóa SP trong giỏ) | Negative (Multi-role) | 🔴 **FAILED** | Chấp nhận đặt sản phẩm đã bị xóa |
| 7 | `TC_FR-08_09` | Xóa sản phẩm khỏi giỏ hàng qua UI Cart | Positive (Cart Action) | 🟢 **PASSED** | Xóa khỏi giỏ thành công |
| 8 | `TC_FR-08_BVA_01` | Biên dưới số lượng sản phẩm ($N = 0$) | Boundary ($N=0$) | 🔴 **FAILED** | **[Bug 12]** Cho phép đặt số lượng 0 |
| 9 | `TC_FR-08_BVA_02` | Tại biên số lượng tối thiểu ($N = 1$) | Boundary ($N=1$) | 🟢 **PASSED** | Đặt 1 sản phẩm 30M thành công |
| 10 | `TC_FR-08_BVA_03` | Sát biên trên số lượng ($N = 2$) | Boundary ($N=2$) | 🟢 **PASSED** | Đặt 2 sản phẩm 60M thành công |
| 11 | `TC_FR-08_BVA_04` | Biên cận trên Max Int 32-bit ($N = 71$) | Boundary ($N=71$) | 🟢 **PASSED** | Tổng 2.13 tỷ VNĐ an toàn |
| 12 | `TC_FR-08_BVA_05` | Vượt biên Max Int 32-bit ($N = 72$) | Boundary ($N=72$) | 🟢 **PASSED** | Xử lý an toàn không crash |

---

#### 🔹 3. FR-13: Admin Dashboard Thống kê & Doanh thu (`tests/fr13_dashboard.spec.ts`)
| STT | Mã Test Case | Tên kịch bản & Mục tiêu | Phân loại | Kết quả SUT | Bug liên quan |
| :---: | :--- | :--- | :---: | :---: | :--- |
| 1 | `TC_FR-13_01` | Dashboard khi Database trống (0 đơn) | Domain (Empty) | 🟢 **PASSED** | Doanh thu 0đ, Số đơn: 0 |
| 2 | `TC_FR-13_BVA_01` | Biên dưới số lượng đơn ($N = 0$) | Boundary ($N=0$) | 🟢 **PASSED** | Đếm chính xác 0 đơn |
| 3 | `TC_FR-13_02` | Đếm số đơn nhưng không tính tiền khi Pending | Domain (Pending) | 🟢 **PASSED** | Doanh thu giữ nguyên 0đ |
| 4 | `TC_FR-13_03` | Tính doanh thu khi đơn chuyển sang Delivered | Domain (Delivered) | 🔴 **FAILED** | **[Bug 13]** Nhân đôi doanh thu (60M) |
| 5 | `TC_FR-13_BVA_02` | Sát biên dưới số lượng đơn ($N = 1$) | Boundary ($N=1$) | 🟢 **PASSED** | Đếm chính xác 1 đơn |
| 6 | `TC_FR-13_04` | Thêm đơn Pending mới và giữ nguyên doanh thu | Domain (Mixed) | 🟢 **PASSED** | Số đơn tăng lên 2, doanh thu giữ nguyên |
| 7 | `TC_FR-13_05` | Tính doanh thu chứa đơn 0 VNĐ Delivered | Domain (Zero Order) | 🟢 **PASSED** | Doanh thu giữ nguyên ($0 \times 2 = 0$) |
| 8 | `TC_FR-13_06` | Doanh thu chứa đơn số âm Delivered (-30M) | Domain (Negative) | 🟢 **PASSED** | Triệt tiêu đại số chính xác về 0đ |
| 9 | `TC_FR-13_BVA_03` | Cận dưới Max Int 32-bit (1.05 tỷ VNĐ) | Boundary (Int 32) | 🟢 **PASSED** | Xử lý an toàn không crash |
| 10 | `TC_FR-13_BVA_04` | Vượt biên Max Int 32-bit (1.08 tỷ VNĐ) | Boundary (Int 32) | 🟢 **PASSED** | Xử lý an toàn không crash |
| 11 | `TC_FR-13_BVA_05` | Vỡ layout Doanh thu khi 10,000,000 iPhone | Boundary (UI Layout) | 🔴 **FAILED** | **[Bug 14]** Tràn số ra ngoài khung Card |
| 12 | `TC_FR-13_BVA_06` | Vỡ layout Số đơn hàng khi N cực lớn | Boundary (UI Layout) | 🔴 **FAILED** | **[Bug 15]** Tràn số ra ngoài khung Card |

---

## 🚀 3. HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY KIỂM THỬ

### 3.1. Yêu cầu môi trường
- Node.js version $\ge 18.x$
- Ứng dụng SUT EShop đang chạy tại:
  - **User Storefront:** `http://localhost:5173`
  - **Admin Dashboard:** `http://localhost:5174`

### 3.2. Cài đặt thư viện dependencies
```bash
npm install
npx playwright install
```

### 3.3. Các lệnh thực thi kiểm thử

1. **Chạy giao diện trực quan (UI Mode - Khuyên dùng):**
   ```bash
   npx playwright test --ui
   ```

2. **Chạy toàn bộ 36 Test Cases trên Chromium:**
   ```bash
   npx playwright test --project=chromium
   ```

3. **Chạy toàn bộ Test Suite trên cả 3 Trình duyệt (Chromium, Firefox, WebKit):**
   ```bash
   npx playwright test
   ```

4. **Mở Báo cáo HTML sau khi chạy:**
   ```bash
   npx playwright show-report reports/html_report
   ```

---

## 🔗 4. LIÊN KẾT BÀI NỘP (SUBMISSION LINKS)

- **Public GitHub Repository:** [https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing)
- **YouTube Demo Video (Unlisted):** [https://youtu.be/Wtb9hgEOzjA](https://youtu.be/Wtb9hgEOzjA)
- **Agent Skill Demo Video (Bonus):** [https://youtu.be/XwuPBjIkm50?si=rA90XmjR2f-KHAxK](https://youtu.be/XwuPBjIkm50?si=rA90XmjR2f-KHAxK)
