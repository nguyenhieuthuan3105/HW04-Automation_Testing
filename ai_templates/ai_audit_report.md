# AI Audit Report & AI Critique - Individual Deliverable

---

## I. AI AUDIT LOG (NHẬT KÝ SỬ DỤNG AI)

Mỗi phiên tương tác với AI hỗ trợ thực hiện bài tập lớn được ghi lại đầy đủ dưới đây theo thứ tự thời gian.

## Phân tích yêu cầu và cấu trúc thư mục

### Promt 1:

- **Công cụ AI sử dụng:** Gemini 3.7 Flash (High) (Antigravity IDE)
- **Ngày giờ tương tác:** 08:36 12/08/2026
- **Câu lệnh đã hỏi (Prompt):**

  ```text
    [2026.HW04.Automation%20Testing_En.pdf](file;file:///d%3A/STD/Y3/Y3S3/KiemThuPM/hw/hw4/2026.HW04.Automation%20Testing_En.pdf) từ file này bạn có thể viết cho tôi 1 file guiding.md chi tiết tất cả những gì tôi cần thực hiện, các bước thi hiện, chi tiết từng bước ra sao, cần làm gì kèm với checklist những gì cần hoàn thành và nộp được không
  ```

- **Kết quả phản hồi của AI (Output):**
  ```text
    Tóm tắt nội dung chính trong file guiding.md
    Tổng quan & Các Nguyên tắc cốt lõi (Guiding Principles):
    Mã bài tập: HW04-AI (Kiểm thử tự động web frontend ứng dụng SUT EShop).
    Chiến lược AI-First: Prompt AI từng bước (step-by-step), không dùng 1 prompt chung chung.
    Human Review: Bắt buộc rà soát, sửa lỗi và giải trình phần AI làm sai/thiếu.
    Anti-AI-Cheat: Báo cáo HTML phải hiện Run by: {StudentID} + ISO timestamp; Video demo phải có thuyết minh giọng thật (tiếng Việt) + Face-cam HOẶC Terminal whoami & hostname.
    Lựa chọn 3 tính năng Web:
    Chọn đúng 3 tính năng đã làm ở HW02 (1 tính năng từ Pool A, 1 từ Pool B, 1 từ Pool C).
    9 Bước thực hiện chi tiết:
    Bước 1: Setup kho mã nguồn GitHub Public & dự án Playwright / Selenium.
    Bước 2: Thiết kế tối thiểu 12 test cases / tính năng (tổng $\ge 36$ test cases) và áp dụng Data-driven testing (lưu dữ liệu riêng trong file .json hoặc .csv).
    Bước 3: Prompt AI từng bước để sinh kịch bản và áp dụng ít nhất 3 kiểu Assertions khác nhau.
    Bước 4: Rà soát, sửa lỗi code AI (chống fragile selectors, flaky waits) & duy trì tối thiểu 8 commits làm thay đổi file script kiểm thử (.spec.ts / .spec.js).
    Bước 5: Thực thi trên 3 trình duyệt (Chromium, Firefox, WebKit) $\rightarrow$ Tối thiểu 9 lượt chạy browser & xuất Báo cáo HTML có watermark tên sinh viên.
    Bước 6: Đăng báo cáo lỗi (Bug Report) lên GitHub Issues kèm screenshot.
    Bước 7: Quay Demo Video (YouTube Unlisted, $\ge 5$ phút, tiếng Việt, chứng minh tác giả).
    Bước 8 (Bonus 10đ): Xây dựng và nộp Agent Skill + Video demo.
    Bước 9: Viết đoạn AI Critique (200-300 từ) và bảng AI Audit Report.
    Checklist & Quy cách đóng gói bài nộp:
    Tên file zip: <StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip (ví dụ 25127001_HW04_AI_Automation_090.zip).
    Cấu trúc thư mục giải nén inside zip đầy đủ file Markdown, PDF, HTML reports, Git log text file, ảnh screenshot bug, README chứa bảng tự chấm điểm.
  ```

## Thiết kế Test cases và chuẩn bị Dữ liệu kiểm thử

### Promt 1:

- **Công cụ AI sử dụng:** Gemini 3.7 Flash (High) (Antigravity IDE)
- **Ngày giờ tương tác:** 16:30 17/08/2026
- **Câu lệnh đã hỏi (Prompt):**

  ```text
    hãy bắt đầu trước với FR-02. Danh sách các test case cũng như điều kiện đi kèm của chúng đều nằm trong 2 file [hw02_Main_Report.md](file;file:///d%3A/STD/Y3/Y3S3/KiemThuPM/hw/hw4/hw02_Main_Report.md) . Bạn có thể trích xuất từ đó 
  ```

- **Kết quả phản hồi của AI (Output):**
  ```text
    1. Dữ liệu Data-Driven: 
    test_data/fr02_login_data.json
    Đã trích xuất đầy đủ 15 test cases (vượt yêu cầu tối thiểu 12 test cases của đề bài):
    9 Test Cases Domain Testing:
    TC_FR-02_01: Đăng nhập thành công với tài khoản chuẩn (test@eshop.com / Test1234!).
    TC_FR-02_02: Đăng nhập thành công sau khi hết thời gian phạt khóa tài khoản.
    TC_FR-02_03: Bỏ trống Email (kiểm tra HTML5 Validation).
    TC_FR-02_04: Email sai định dạng (kiểm tra Regex format).
    TC_FR-02_05: Bỏ trống Password (kiểm tra HTML5 Validation).
    TC_FR-02_06: Tài khoản chưa đăng ký (new@example.com).
    TC_FR-02_07: Nhập sai Password chạm ngưỡng khóa tài khoản.
    TC_FR-02_08: Từ chối đăng nhập khi tài khoản đang bị khóa (nhập đúng).
    TC_FR-02_09: Từ chối đăng nhập khi tài khoản đang bị khóa (nhập sai).
    6 Test Cases Phân tích giá trị biên (BVA Testing):
    TC_FR-02_BVA_01 $\rightarrow$ 03: Kiểm tra biên số lần sai ($n=2$, $n=3$, $n=4$).
    TC_FR-02_BVA_04 $\rightarrow$ 06: Kiểm tra biên thời gian khóa ($t=29s$, $t=30s$, $t=31s$).
    2. Page Object Model: 
    tests/pages/LoginPage.ts
    Đóng gói các bộ định vị (Locators) cho các ô Email, Password, nút Đăng nhập, các khung thông báo lỗi (Toast / Alert / Error Message).
    Cung cấp các phương thức thao tác: login(), fillEmail(), fillPassword(), submit(), checkValidity(), getValidationMessage(), getAlertText().
    3. Kịch bản Playwright: 
    tests/fr02_login.spec.ts
    Áp dụng Data-Driven Testing 100% (đọc từ test_data/fr02_login_data.json).
    Sử dụng nhiều kiểu Assertions khác nhau:
    expect(page).toHaveURL(): Kiểm tra điều hướng URL.
    expect(locator).toBeVisible(): Kiểm tra hiển thị thông báo lỗi / toast message.
    expect(text).toContain() / toBeGreaterThan(): Kiểm tra nội dung text thông báo.
    checkValidity(): Kiểm tra validate HTML5 phía Client.
  ```

### Promt 2:

- **Công cụ AI sử dụng:** Gemini 3.7 Flash (High) (Antigravity IDE)
- **Ngày giờ tương tác:** 21:39 17/08/2026
- **Câu lệnh đã hỏi (Prompt):**

  ```text
  Giữ nguyên các assertion kiểm tra nghiêm ngặt (để test case fail đúng các Bug 1, 2, 3, 4, 5 như HW02) nhằm phục vụ xuất báo cáo Bug Report.
  ```

- **Kết quả phản hồi của AI (Output):**
  ```text
  Các Assertions nghiêm ngặt đã được thiết lập để tái hiện chuẩn xác các Bug của SUT:
  Bắt [Bug 4] - Thiếu HTML5 Email Validation (TC_FR-02_04):
  Khẳng định: expect(isValid).toBe(false) (Frontend bắt buộc phải chặn submit khi email sai định dạng).
  👉 Kết quả trên SUT: Bị FAIL vì SUT không chặn, form vẫn gửi đi.
  Bắt [Bug 2] - Thiếu thông báo khóa tài khoản chi tiết (TC_FR-02_07, TC_FR-02_08, TC_FR-02_09, BVA_02, BVA_03):
  Khẳng định: expect(alertMessage).toContainText(/tạm khóa|bị khóa|lock/i).
  👉 Kết quả trên SUT: Bị FAIL vì SUT chỉ trả về thông báo chung "Đăng nhập thất bại...".
  Bắt [Bug 3 & Bug 5] - Khóa 50s thay vì 30s & Lỗi đồng bộ State (TC_FR-02_02, BVA_05, BVA_06):
  Khẳng định: Sau 30s, người dùng gửi lại form phải đăng nhập thành công (expect(page).toHaveURL(/^(?!.*login).*$/)).
  👉 Kết quả trên SUT: Bị FAIL vì SUT phạt hơn 50s và bắt buộc phải F5 trang mới mở lại được.
  Các ca kiểm thử hoạt động đúng:
  TC_FR-02_01 (Đăng nhập đúng), TC_FR-02_03 (Bỏ trống email), TC_FR-02_05 (Bỏ trống pass), TC_FR-02_06 (Chưa đăng ký), TC_FR-02_BVA_04 (Chặn ở $t=29s$) $\rightarrow$ PASSED.
  ```

### Promt 2:

- **Công cụ AI sử dụng:** Gemini 3.7 Flash (High) (Antigravity IDE)
- **Ngày giờ tương tác:** 08:36 12/08/2026
- **Câu lệnh đã hỏi (Prompt):**

  ```text

  ```

- **Kết quả phản hồi của AI (Output):**
  ```text

  ```

### Promt 2:

- **Công cụ AI sử dụng:** Gemini 3.7 Flash (High) (Antigravity IDE)
- **Ngày giờ tương tác:** 08:36 12/08/2026
- **Câu lệnh đã hỏi (Prompt):**

  ```text

  ```

- **Kết quả phản hồi của AI (Output):**
  ```text

  ```

### Promt 2:

- **Công cụ AI sử dụng:** Gemini 3.7 Flash (High) (Antigravity IDE)
- **Ngày giờ tương tác:** 08:36 12/08/2026
- **Câu lệnh đã hỏi (Prompt):**

  ```text

  ```

- **Kết quả phản hồi của AI (Output):**
  ```text

  ```

## Thiết kế Test cases và chuẩn bị Dữ liệu kiểm thử

### Promt 1:

- **Công cụ AI sử dụng:** Gemini 3.7 Flash (High) (Antigravity IDE)
- **Ngày giờ tương tác:** 08:36 12/08/2026
- **Câu lệnh đã hỏi (Prompt):**

  ```text

  ```

- **Kết quả phản hồi của AI (Output):**
  ```text

  ```

### Promt 2:

- **Công cụ AI sử dụng:** Gemini 3.7 Flash (High) (Antigravity IDE)
- **Ngày giờ tương tác:** 08:36 12/08/2026
- **Câu lệnh đã hỏi (Prompt):**

  ```text

  ```

- **Kết quả phản hồi của AI (Output):**
  ```text

  ```


---

## II. AI AUDIT REPORT (BÁO CÁO KIỂM THỬ BỞI AI)

### Sản phẩm 1 (Artifact 1): 

- **(1) Prompt + Tool:**
  - **Tool:** Gemini 3.6 Flash (Antigravity IDE)
  - **Thời gian:** 25/07/2026 - 27/07/2026
  - **Prompt:** ``
- **(2) AI output:** 
- **(3) Kết luận:** 
- **(4) Lý do:** 
- **(5) Chỉnh sửa:** 

### Tổng kết và Kết luận

**1. Tỷ lệ chính xác của AI (AI Accuracy Ratio):**
Dựa trên các Artifacts trong quá trình thực thi HW04:

- **VALID:** 
- **INVALID:** 
- **INCOMPLETE:** 

**2. Kết luận:**


- **KHI NÀO NÊN DÙNG AI:** 
- **KHI NÀO KHÔNG NÊN DÙNG AI:** 

---
