# 🧪 Test Cases Suite Specification

> **Mục đích:** File này là nơi cung cấp toàn bộ danh sách Test Cases cần được chuyển đổi thành Automation Test Scripts.
> Theo yêu cầu đề bài, mỗi tính năng cần tối thiểu **12 Test Cases** (kết hợp giữa Positive, Negative và Edge/Boundary cases).

---

## 📊 Bảng tổng quan danh sách Test Cases (Summary Matrix)

| STT | Test Case ID | Phân loại (Category) | Tên kịch bản / Mục tiêu | Trọng tâm kiểm thử | Dạng Assertion dự kiến |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | `TC_FRXX_01` | Positive (Happy Path) | Thực hiện thành công luồng chính | Hành vi đúng đắn | URL / Visible / Text |
| 2 | `TC_FRXX_02` | Positive (Alternative) | Luồng hợp lệ thứ hai | Xử lý trạng thái | Visible / Text |
| 3 | `TC_FRXX_03` | Negative (Validation) | Bỏ trống trường bắt buộc | Client validation | Validity / Error Msg |
| 4 | `TC_FRXX_04` | Negative (Format) | Dữ liệu sai định dạng | Pattern validation | Validity / Error Msg |
| 5 | `TC_FRXX_05` | Negative (Logic) | Dữ liệu không tồn tại / Sai logic | API / Server error | Toast / Alert Text |
| 6 | `TC_FRXX_06` | Negative (Security) | Tấn công hoặc hành vi không hợp lệ | Bảo mật / Chặn đứng | Error / Redirect |
| 7 | `TC_FRXX_07` | Negative (Flow) | Thao tác sai thứ tự / thiếu bước | Điều hướng an toàn | UI state / Disabled |
| 8 | `TC_FRXX_08` | Boundary (BVA Min) | Giá trị biên dưới | Xử lý giá trị nhỏ nhất | Value / Text Match |
| 9 | `TC_FRXX_09` | Boundary (BVA Max) | Giá trị biên trên | Chống tràn số / Xử lý | Text / Numeric Match |
| 10 | `TC_FRXX_10` | Edge Case (Tampering) | Sửa đổi giá trị trái phép (0đ, âm) | Kiểm soát tính toàn vẹn | UI / Toast / Disabled |
| 11 | `TC_FRXX_11` | Edge Case (Concurrency) | Race condition / Đa thao tác | Xử lý đồng thời | State transition |
| 12 | `TC_FRXX_12` | Edge Case (UI Layout) | Responsive / Tràn chữ màn hình hẹp | Layout & hiển thị | BoundingBox / Overflow |

---

## 📝 Chi tiết từng Test Case (Detailed Test Case Specifications)

> *Sao chép mẫu bên dưới cho từng Test Case từ 1 đến 12 (hoặc nhiều hơn):*

### 🔹 [TC_FRXX_01] - Tên kịch bản kiểm thử 1
* **Mã Test Case:** `TC_FRXX_01`
* **Phân loại:** `Positive / Happy Path`
* **Mục tiêu:** Kiểm tra chức năng hoạt động đúng khi người dùng nhập dữ liệu chuẩn.
* **Tiền điều kiện (Preconditions):**
  * Người dùng đang ở trang `http://localhost:5173/...`
  * Đã đăng nhập hoặc giỏ hàng có sẵn sản phẩm (nếu cần).
* **Các bước thực hiện (Test Steps):**
  1. Điều hướng đến trang ...
  2. Nhập dữ liệu vào các trường ...
  3. Nhấn nút hành động ...
* **Dữ liệu đầu vào (Inputs / Payload):**
  ```json
  {
    "input_field_1": "valid_value_1",
    "input_field_2": "valid_value_2"
  }
  ```
* **Kết quả kỳ vọng (Expected Results):**
  * Hệ thống chuyển hướng sang URL `http://localhost:5173/expected_url`.
  * Hiển thị thông báo thành công hoặc phần tử kết quả hiển thị trên màn hình.
* **Mẫu Assertion dự kiến (Tối thiểu 1 trong 3 mẫu):**
  * Pattern 1: `await expect(page).toHaveURL(/expected_url/)`
  * Pattern 2: `await expect(page.getByRole('alert')).toBeVisible()`
  * Pattern 3: `await expect(page.getByText('Thành công')).toBeVisible()`

---

### 🔹 [TC_FRXX_02] - Tên kịch bản kiểm thử 2
* **Mã Test Case:** `TC_FRXX_02`
* **Phân loại:** `Negative / Validation`
* **Mục tiêu:** Kiểm tra xử lý khi để trống trường bắt buộc.
* **Tiền điều kiện:** Người dùng ở form nhập liệu.
* **Các bước thực hiện:**
  1. Để trống trường A.
  2. Nhấn nút Submit.
* **Dữ liệu đầu vào:**
  ```json
  {
    "field_a": "",
    "field_b": "some_value"
  }
  ```
* **Kết quả kỳ vọng:**
  * Form không submit, hiển thị lỗi validation hoặc tooltip cảnh báo.
* **Mẫu Assertion:**
  * Pattern: `expect(await input.evaluate(el => el.checkValidity())).toBe(false)`

*(Tiếp tục bổ sung đầy đủ từ TC 03 đến TC 12...)*
