# BÁO CÁO PHÊ BÌNH NĂNG LỰC AI VÀ NHẬT KÝ KIỂM TOÁN (AI CRITIQUE & AUDIT REPORT)

> **Môn học:** Kiểm thử phần mềm (Software Testing)  
> **Sinh viên thực hiện:** Nguyễn Hiếu Thuận  
> **Mã số sinh viên (MSSV):** 23127125  
> **Mã bài tập:** HW04-AI  
> **Công cụ AI sử dụng:** Google Gemini 3.7 Flash (High) tích hợp trong Antigravity IDE  

---

## 声明 BẮT BUỘC (AI USAGE DECLARATION)

> *"Tôi xác nhận có sử dụng công cụ AI (Gemini 3.7 Flash) để hỗ trợ các công việc sau: khởi tạo khung sườn mã nguồn Page Object Model (POM), trích xuất dữ liệu từ báo cáo HW02 sang định dạng JSON (Data-Driven), gợi ý các bộ chọn DOM (Selectors), và hỗ trợ rà soát các cú pháp kiểm thử Playwright. Mọi kịch bản kiểm thử, luồng thao tác người dùng thực tế, bộ assertion chặt chẽ và các sửa đổi kỹ thuật đều đã được tôi trực tiếp kiểm tra, gỡ lỗi và nghiệm thu trên hệ thống SUT."*

---

## I. BÀI LUẬN PHÊ BÌNH NĂNG LỰC AI (AI CRITIQUE ESSAY)
*(Dung lượng: 275 từ – Đạt chuẩn yêu cầu 200 đến 300 từ)*

Trong suốt quá trình thực hiện bài tập kiểm thử tự động HW04, mô hình AI đã chứng minh được thế mạnh vượt trội trong việc khởi tạo nhanh cấu trúc dự án, viết khung sườn Page Object Model (POM) và chuyển đổi các tập dữ liệu từ ngôn ngữ tự nhiên sang cấu trúc JSON phục vụ Data-Driven Testing. Tuy nhiên, khi đi vào thực thi kiểm thử End-to-End chuyên sâu trên giao diện trình duyệt, AI đã bộc lộ những điểm yếu cốt tử xuất phát từ việc **thiếu trải nghiệm trực quan thực tế** và **tư duy thao tác máy móc**.

Điển hình nhất là sai lầm trong tính năng Giỏ hàng (FR-08): sau khi thêm sản phẩm, thay vì mô phỏng thao tác người dùng nhấp vào nút "Giỏ hàng" trên thanh Header, AI lại tự tiện dùng lệnh `page.goto('/cart')`. Hành động này đã kích hoạt tải lại toàn bộ trang (full reload), làm xóa sạch dữ liệu giỏ hàng vốn chỉ được lưu trên bộ nhớ RAM cục bộ của ứng dụng React, khiến hàng loạt test case bị thất bại oan uổng. Ngoài ra, AI còn mắc lỗi sinh các bộ chọn giả định không tồn tại, sử dụng cú pháp giả lập `:contains()` không hợp lệ trong DOM Evaluation, và không lường trước được việc lệnh chờ phạt 30 giây sẽ bị ngắt bởi giới hạn thời gian mặc định (timeout) của Playwright.

Từ trải nghiệm này, tôi rút ra bài học cốt lõi: **AI chỉ là một trợ lý sinh mã cấp tốc (Accelerator), tuyệt đối không thể thay thế tư duy phản biện và khả năng kiểm định của kỹ sư QA con người**. Trong kiểm thử tự động, con người bắt buộc phải trực tiếp rà soát từng bước thao tác, thấu hiểu tường tận kiến trúc quản lý trạng thái của ứng dụng SUT và thiết lập các bộ Assertions nghiêm ngặt thì mới có thể phát hiện chính xác các lỗi tiềm ẩn của phần mềm.

---

## II. NHẬT KÝ KIỂM TOÁN TƯƠNG TÁC AI (AI AUDIT LOG)

### 📌 Giai đoạn 1: Phân tích Đề bài & Cấu trúc Dự án

#### Prompt 1:
- **Công cụ AI:** Gemini 3.7 Flash (High) (Antigravity IDE)
- **Thời gian:** 08:36 12/08/2026
- **Câu lệnh đã hỏi (Prompt):**
  ```text
  [2026.HW04.Automation Testing_En.pdf] từ file này bạn có thể viết cho tôi 1 file guiding.md chi tiết tất cả những gì tôi cần thực hiện, các bước thực hiện, chi tiết từng bước ra sao, cần làm gì kèm với checklist những gì cần hoàn thành và nộp được không?
  ```
- **Kết quả phản hồi của AI (Output):**
  AI phân tích toàn diện tài liệu đề bài PDF, tóm tắt 5 nguyên tắc chỉ đạo, ma trận kế thừa 3 tính năng từ HW02 (FR-02, FR-08, FR-13), quy trình 9 bước thực hiện chi tiết, checklist kiểm tra chất lượng và hướng dẫn đóng gói file zip.

---

### 📌 Giai đoạn 2: Thiết kế & Triển khai FR-02 (Đăng nhập & Khóa tài khoản)

#### Prompt 2:
- **Công cụ AI:** Gemini 3.7 Flash (High)
- **Thời gian:** 16:30 17/08/2026
- **Câu lệnh đã hỏi (Prompt):**
  ```text
  hãy bắt đầu trước với FR-02. Danh sách các test case cũng như điều kiện đi kèm của chúng đều nằm trong file hw02_Main_Report.md. Bạn có thể trích xuất từ đó.
  ```
- **Kết quả phản hồi của AI (Output):**
  AI trích xuất 15 test cases vào `test_data/fr02_login_data.json`, xây dựng `LoginPage.ts` và tạo `tests/fr02_login.spec.ts`.

#### Prompt 3 (Human Review & Refinement):
- **Công cụ AI:** Gemini 3.7 Flash (High)
- **Thời gian:** 10:28 19/08/2026
- **Câu lệnh đã hỏi (Prompt):**
  ```text
  ok, tôi đã xác định được 1 số lỗi trong script:
  - FR02-02: Chưa tiến hành bấm đăng nhập sai 3 lần liên tiếp, sau đó mới chờ 30s, rồi lại bấm đăng nhập thêm lần nữa.
  - FR02-03, 05: Video bị cắt quá nhanh, chưa kịp hiển thị đoạn "Please fill out this field." của UI.
  - FR02-07: Chưa thực sự nhập và submit sai 2 lần mật khẩu rồi mới check lần thứ 3.
  - BVA-01..06: Tất cả yêu cầu input sai phải thực hiện nhập sai đủ số lần thực tế.
  Hãy rút bớt 3 test case (từ 15 về đúng 12 TCs) và tái chỉnh sửa lại code script.
  ```
- **Kết quả phản hồi của AI (Output):**
  AI rút gọn bộ dữ liệu về đúng 12 TCs, lập trình vòng lặp nhập sai mật khẩu đa lần thực tế, kéo dài thời gian chờ 1200ms để ghi nhận rõ tooltip HTML5, và bổ sung `test.setTimeout(45000)` để vượt qua giới hạn timeout khi chờ phạt 30 giây.

---

### 📌 Giai đoạn 3: Thiết kế & Triển khai FR-08 (Thanh toán & Giỏ hàng)

#### Prompt 4:
- **Công cụ AI:** Gemini 3.7 Flash (High)
- **Thời gian:** 20:30 17/08/2026
- **Câu lệnh đã hỏi (Prompt):**
  ```text
  không nhất thiết phải gửi request bằng backend server, thay vào đó có thể thực hiện lại từng bước trên frontend cho đúng với flow của người dùng, có thể đơn giản check bằng cách thêm đúng số lượng đó sản phẩm vào giỏ rồi tiến hành chạy thanh toán thử. Hãy sửa lại script theo hướng đó, chứ đừng đáp thẳng lệnh vào backend.
  ```
- **Kết quả phản hồi của AI (Output):**
  AI chuyển đổi toàn bộ kịch bản sang luồng thao tác giao diện trình duyệt thuần túy (Pure UI Flow), bổ sung hàm `addProductWithQuantity()`, `setTotalAmount()`, và kiểm tra chuyển trang thành công.

#### Prompt 5 (Xử lý Bug Reset Giỏ hàng & Multi-role Admin Race Condition):
- **Công cụ AI:** Gemini 3.7 Flash (High)
- **Thời gian:** 09:30 18/08/2026
- **Câu lệnh đã hỏi (Prompt):**
  ```text
  Lỗi hành vi: sau khi thêm sản phẩm vào giỏ thì bạn truy cập link trực tiếp /cart chứ không phải bấm vào nút "Giỏ hàng" trên UI. Ở đây tồn tại lỗi nếu truy cập trực tiếp bằng url thì giỏ hàng bị reset ngay lập tức. Hãy ghi nhận vào bug_note.txt và sửa lại test.
  Ngoài ra, xóa các testcase F12 sửa auth token (FR-08-07, 08) vì không tự động hóa được. Đối với FR-08-06: Đăng nhập admin :5174, xóa sản phẩm đầu tiên rồi quay lại trang user thanh toán xem có bị lỗi không. Bổ sung thêm testcase mã giảm giá SAVE10.
  ```
- **Kết quả phản hồi của AI (Output):**
  AI cập nhật `CheckoutPage.ts` chuyển sang click nút "Giỏ hàng" trên Header, tạo `AdminPage.ts` để thực hiện thao tác xóa sản phẩm đa vai trò, tích hợp mã giảm giá `SAVE10` và hoàn thiện 12 test cases của FR-08.

---

### 📌 Giai đoạn 4: Thiết kế & Triển khai FR-13 (Admin Dashboard)

#### Prompt 6:
- **Công cụ AI:** Gemini 3.7 Flash (High)
- **Thời gian:** 11:18 19/08/2026
- **Câu lệnh đã hỏi (Prompt):**
  ```text
  Tiếp tục với FR-13. Hãy đọc các phân tích về trang này cũng như testcase và bug từ hw02_Main_Report.md. Phối hợp giữa frontend-admin và frontend-web theo đúng State Machine: Chờ xác nhận -> Đã xác nhận -> Đang giao -> Đã giao.
  ```
- **Kết quả phản hồi của AI (Output):**
  AI tạo `test_data/fr13_dashboard_data.json`, mở rộng `AdminPage.ts` với đầy đủ các nút chuyển đổi trạng thái đơn hàng, và tạo `tests/fr13_dashboard.spec.ts`.

#### Prompt 7 (Tối ưu hóa Tích lũy Dữ liệu Database Tuần tự):
- **Công cụ AI:** Gemini 3.7 Flash (High)
- **Thời gian:** 11:30 19/08/2026
- **Câu lệnh đã hỏi (Prompt):**
  ```text
  Đảo vị trí TC 03 với TC 02: ở TC 02 mới user tạo đơn và đang ở Pending -> Dashboard hiện 0đ và 1 đơn. Ở TC 03 mới Admin duyệt đơn đó sang Delivered -> Kiểm tra doanh thu x2 (Bug 13). TC 04 thêm 1 đơn Pending -> Kiểm tra số đơn tăng lên 2 và doanh thu giữ nguyên 60M. TC 06 thêm đơn -30M -> Triệt tiêu doanh thu về 0đ.
  ```
- **Kết quả phản hồi của AI (Output):**
  AI sắp xếp lại luồng dữ liệu tuần tự chuẩn xác, khớp hoàn hảo với đặc tính lưu trữ dữ liệu tích lũy của máy chủ SUT cục bộ.

#### Prompt 8 (Khắc phục Lỗi DOM Selector & Kiểm thử Responsive BVA 05, 06):
- **Công cụ AI:** Gemini 3.7 Flash (High)
- **Thời gian:** 12:10 19/08/2026
- **Câu lệnh đã hỏi (Prompt):**
  ```text
  Đối với BVA 05 và 06 đang bị lỗi evaluate cú pháp. Hãy sửa lại selector chuẩn và kéo giãn UI (setViewportSize) ở nhiều kích thước để kiểm tra xem số tiền/số đơn cực lớn có bị tràn khung Card hay không.
  ```
- **Kết quả phản hồi của AI (Output):**
  AI thay thế pseudo-selector `:contains()` bằng các hàm duyệt DOM chuẩn, thêm lệnh `page.setViewportSize({ width: 768, height: 800 })`, tính toán tọa độ `getBoundingClientRect()` để bắt chính xác **Bug 14** và **Bug 15** (vỡ layout khi số quá dài).

#### Prompt 9 (Rà soát FR-02: Bóc tách Alert Leaf Node, BVA Logic & Xóa nhãn Bug X):
- **Công cụ AI:** Gemini 3.7 Flash (High)
- **Thời gian:** 20:47 19/08/2026
- **Câu lệnh đã hỏi (Prompt):**
  ```text
  TC_FR-02_06 & 07 đang bị lấy nhầm chuỗi toàn trang thay vì chỉ thẻ alert. TC_FR-02_BVA_01..03 muốn kiểm tra có bị khóa không thì phải thử đăng nhập tiếp với mật khẩu đúng. Đồng thời loại bỏ hoàn toàn các đề cập (Bug X) trong assertion script.
  ```
- **Kết quả phản hồi của AI (Output):**
  AI sửa lại `LoginPage.ts` để `getAlertText()` chỉ bóc tách phần tử lá của khung alert, cập nhật kịch bản `BVA_01..03` thực hiện đăng nhập lại với mật khẩu đúng để kiểm tra trạng thái khóa, và loại bỏ 100% các chuỗi `(Bug X)` khỏi các câu lệnh assertion trên toàn bộ suite.

