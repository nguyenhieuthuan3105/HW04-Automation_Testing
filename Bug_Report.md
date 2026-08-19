# Bug Report

**MSSV:** 23127125 </br>
**Họ và tên:** Nguyễn Hiếu Thuận </br>
**Bài tập:** HW04 - Automation Testing </br>
**Chức năng kiểm thử:** FR-02, FR-08, FR-13

---

## Danh sách Lỗi (Bugs) phát hiện được trên SUT qua Automation Testing

### 1. Bug 1: Hệ thống vẫn khóa tài khoản sau hơn 30s bị khóa

- **Mô tả:** Theo đặc tả nghiệp vụ (FR-02), khi người dùng nhập sai mật khẩu 3 lần liên tiếp, tài khoản phải bị tạm khóa trong 30 giây và từ chối mọi yêu cầu đăng nhập. Tuy nhiên trên SUT, sau khi nhập sai 3 lần và chờ hơn 30 giây, người dùng tiếp tục nhập mật khẩu đúng thì hệ thống vẫn không cho phép đăng nhập.
- **Chức năng ảnh hưởng:** FR-02 (Đăng nhập & Khóa tài khoản)
- **Test Case phát hiện:** `TC_FR-02_02`
- **GitHub Issue:** [Link Issue #1](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/1)
- **Ảnh minh chứng:**
  ![Bug 1](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/1)

---

### 2. Bug 2: Ô Email không kiểm tra định dạng "email"

- **Mô tả:** Ô nhập Email ở giao diện đăng nhập không kích hoạt cơ chế kiểm tra định dạng email tiêu chuẩn của trình duyệt HTML5 (như kiểm tra ký tự `@`, domain). Khi người dùng nhập chuỗi không đúng định dạng (VD: `testeshop.com`), form vẫn cho phép gửi dữ liệu đi.
- **Chức năng ảnh hưởng:** FR-02 (Đăng nhập)
- **Test Case phát hiện:** `TC_FR-02_04`
- **GitHub Issue:** [Link Issue #2](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/2)
- **Ảnh minh chứng:**
  ![Bug 2](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/2)

---

### 3. Bug 3: Không thông báo khi tài khoản bị tạm khóa

- **Mô tả:** Sau khi thực hiện nhập sai 3 lần liên tiếp, tài khoản bị khóa trong 30 giây. Tuy nhiên, hệ thống không hiển thị thông báo tài khoản bị khóa cho người dùng. Khi người dùng cố gắng đăng nhập, vẫn chỉ hiện lỗi chung chung "Đăng nhập thất bại, vui lòng kiểm tra lại" mà không chỉ rõ nguyên nhân cụ thể.
- **Chức năng ảnh hưởng:** FR-02 (Đăng nhập & Bảo mật)
- **Test Case phát hiện:** `TC_FR-02_07`
- **GitHub Issue:** [Link Issue #3](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/3)
- **Ảnh minh chứng:**
  ![Bug 3](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/3)

---

### 4. Bug 4: Hệ thống khóa đăng nhập dù người dùng mới chỉ nhập sai 2 lần

- **Mô tả:** Sau khi thực hiện nhập sai 2 lần liên tiếp, tài khoản bị khóa. Tuy nhiên trong đặc tả lẽ ra phải sau 3 lần mới bị khóa
- **Chức năng ảnh hưởng:** FR-02 (Đăng nhập & Bảo mật)
- **Test Case phát hiện:** `TC_FR-02_BVA_01`
- **GitHub Issue:** [Link Issue #4](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/4)
- **Ảnh minh chứng:**
  ![Bug 4](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/4)

---

### 5. Bug 5: Hệ thống vẫn khóa tài khoản sau 30s bị khóa

- **Mô tả:** Theo đặc tả nghiệp vụ (FR-02), khi người dùng nhập sai mật khẩu 3 lần liên tiếp, tài khoản phải bị tạm khóa trong 30 giây và từ chối mọi yêu cầu đăng nhập. Tuy nhiên trên SUT, sau khi nhập sai 3 lần và chờ đúng 30 giây, người dùng tiếp tục nhập mật khẩu đúng thì hệ thống không cho phép đăng nhập vào tài khoản.
- **Chức năng ảnh hưởng:** FR-02 (Đăng nhập & Khóa tài khoản)
- **Test Case phát hiện:** `TC_FR-02_BVA_05`
- **GitHub Issue:** [Link Issue #5](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/5)
- **Ảnh minh chứng:**
  ![Bug 5](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/5)

---

### 6. Bug 6: Không tự động xóa giỏ hàng sau khi thanh toán thành công

- **Mô tả:** Sau khi hoàn tất quy trình đặt hàng và hiển thị thông báo "Thanh toán thành công!", nếu người dùng quay lại nhấn vào nút "Giỏ hàng" trên thanh Header, toàn bộ các sản phẩm đã thanh toán vẫn còn nguyên trong giỏ hàng mà không tự động làm rỗng (clear cart).
- **Chức năng ảnh hưởng:** FR-08 (Thanh toán & Giỏ hàng)
- **Test Case phát hiện:** `TC_FR-08_01`
- **GitHub Issue:** [Link Issue #6](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/6)
- **Ảnh minh chứng:**
  ![Bug 6](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/6)

---

### 7. Bug 7: Lỗ hổng cho phép can thiệp sửa tổng tiền và thanh toán đơn hàng 0 VNĐ

- **Mô tả:** Trên màn hình thanh toán `/checkout`, trường "Tổng tiền thanh toán (VND):" là một thẻ input có thể chỉnh sửa tự do. Người dùng có thể sửa số tiền thành 0đ và bấm xác nhận, hệ thống vẫn ghi nhận tạo đơn hàng thành công với giá trị 0đ mà không có cơ chế tính toán lại từ phía server.
- **Chức năng ảnh hưởng:** FR-08 (Thanh toán & Tính toàn vẹn dữ liệu)
- **Test Case phát hiện:** `TC_FR-08_02`
- **GitHub Issue:** [Link Issue #7](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/7)
- **Ảnh minh chứng:**
  ![Bug 7](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/7)

---

### 8. Bug 8: Lỗ hổng cho phép thanh toán đơn hàng với giá trị âm

- **Mô tả:** Tương tự Bug 7, hệ thống thiếu hoàn toàn cơ chế validation giá tiền phía backend. Người dùng có thể chỉnh sửa tổng tiền thành số âm (VD: `-10` hoặc `-30,000,000 VNĐ`), hệ thống vẫn ghi nhận đơn hàng số âm thành công, gây sai lệch nghiêm trọng cho báo cáo tài chính.
- **Chức năng ảnh hưởng:** FR-08 (Thanh toán & Tính toàn vẹn dữ liệu)
- **Test Case phát hiện:** `TC_FR-08_03`
- **GitHub Issue:** [Link Issue #8](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/8)
- **Ảnh minh chứng:**
  ![Bug 8](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/8)

---

### 9. Bug 9: Lỗi cho phép tạo đơn hàng ma khi giỏ hàng trống hoàn toàn (Empty Cart Ghost Order)

- **Mô tả:** Khi giỏ hàng không có bất kỳ sản phẩm nào, nếu người dùng điều hướng vào màn hình thanh toán `/checkout` và bấm "Xác Nhận Thanh Toán", hệ thống vẫn chấp nhận và tạo ra một đơn hàng "bóng ma" trong cơ sở dữ liệu.
- **Chức năng ảnh hưởng:** FR-08 (Thanh toán)
- **Test Case phát hiện:** `TC_FR-08_04`
- **GitHub Issue:** [Link Issue #9](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/9)
- **Ảnh minh chứng:**
  ![Bug 9](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/9)

---

### 10. Bug 10: Lỗ hổng logic cho phép đặt đơn hàng có số lượng sản phẩm bằng 0

- **Mô tả:** Khi người dùng nhập số lượng bằng 0 vào ô "Số lượng:" tại trang chi tiết sản phẩm và tiến hành thanh toán, hệ thống không chặn lại mà vẫn ghi nhận đơn hàng có sản phẩm với `quantity = 0`.
- **Chức năng ảnh hưởng:** FR-08 (Thanh toán & BVA)
- **Test Case phát hiện:** `TC_FR-08_BVA_01`
- **GitHub Issue:** [Link Issue #10](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/10)
- **Ảnh minh chứng:**
  ![Bug 10](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/10)

---

### 11. Bug 11: Lỗi Race Condition - Cho phép thanh toán sản phẩm đã bị xóa khỏi hệ thống bởi Admin

- **Mô tả:** Khi người dùng đã thêm một sản phẩm vào giỏ hàng, sau đó Admin đăng nhập vào trang quản trị (`:5174`) và xóa hoàn toàn sản phẩm đó. Khi người dùng bấm "Xác Nhận Thanh Toán", hệ thống không kiểm tra tính tồn tại của sản phẩm mà vẫn tạo đơn hàng thành công cho một sản phẩm không còn trong kho.
- **Chức năng ảnh hưởng:** FR-08 (Thanh toán & Nhất quán dữ liệu phân tán)
- **Test Case phát hiện:** `TC_FR-08_06`
- **GitHub Issue:** [Link Issue #11](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/11)
- **Ảnh minh chứng:**
  ![Bug 11](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/11)

---

### 12. Bug 12: Giỏ hàng bị xóa sạch dữ liệu khi truy cập trực tiếp bằng URL hoặc tải lại trang

- **Mô tả:** Khi người dùng đã thêm sản phẩm vào giỏ hàng thành công, nếu điều hướng sang trang giỏ hàng bằng cách truy cập trực tiếp đường dẫn URL (`http://localhost:5173/cart`) hoặc tải lại trang (F5 / Reload), toàn bộ dữ liệu sản phẩm trong giỏ hàng bị xóa sạch ngay lập tức do Frontend React chỉ lưu giỏ hàng tạm thời trên memory/state cục bộ mà không đồng bộ lưu vào LocalStorage, SessionStorage hoặc Database.
- **Chức năng ảnh hưởng:** FR-08 (Giỏ hàng & Quản lý trạng thái)
- **Test Case phát hiện:** `TC_FR-08_01`, `TC_FR-08_09`, `TC_FR-08_BVA_01..05`
- **GitHub Issue:** [Link Issue #12](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/12)
- **Ảnh minh chứng:**
  ![Bug 12](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/12)

---

### 13. Bug 13: Lỗi logic tính toán nhân đôi ($2 \times$) Tổng doanh thu trên Dashboard

- **Mô tả:** Trên trang Dashboard của Admin (`:5174`), giá trị hiển thị tại thẻ "Tổng doanh thu (Delivered)" luôn luôn bị tính toán nhân đôi ($2 \times$) so với tổng số tiền thực tế của các đơn hàng có trạng thái `delivered` trong Database (ví dụ: 1 đơn 30.000.000đ hiển thị thành 60.000.000đ).
- **Chức năng ảnh hưởng:** FR-13 (Admin Dashboard & Thống kê doanh thu)
- **Test Case phát hiện:** `TC_FR-13_03`
- **GitHub Issue:** [Link Issue #13](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/13)
- **Ảnh minh chứng:**
  ![Bug 13](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/13)

---

### 14. Bug 14: Giao diện thẻ Tổng doanh thu không Responsive, bị tràn vỡ layout khi số tiền lớn

- **Mô tả:** Khi tổng doanh thu đạt giá trị lớn (hàng trăm nghìn tỷ đồng), thẻ (Card) hiển thị Tổng doanh thu trên Dashboard không có cơ chế co chữ hoặc ngắt dòng/rút gọn số liệu. Dãy chữ số bị tràn ra ngoài khung viền Card (`textRect.right > cardRect.right`), gây vỡ bố cục giao diện khi xem trên các màn hình có kích thước trung bình và nhỏ.
- **Chức năng ảnh hưởng:** FR-13 (Admin Dashboard & UI Responsive)
- **Test Case phát hiện:** `TC_FR-13_BVA_05`
- **GitHub Issue:** [Link Issue #14](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/14)
- **Ảnh minh chứng:**
  ![Bug 14](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/14)

---

### 15. Bug 15: Giao diện thẻ Tổng số đơn hàng không Responsive, bị tràn vỡ layout khi số lượng lớn

- **Mô tả:** Tương tự thẻ Tổng doanh thu, thẻ "Tổng số đơn hàng" trên Dashboard không hỗ trợ responsive cho các giá trị số nguyên lớn. Khi số lượng đơn hàng đạt mốc cực lớn (VD: 999.999.999.999.999 đơn), chữ số bị tràn ra ngoài khung Card và đè lên các phần tử xung quanh.
- **Chức năng ảnh hưởng:** FR-13 (Admin Dashboard & UI Responsive)
- **Test Case phát hiện:** `TC_FR-13_BVA_06`
- **GitHub Issue:** [Link Issue #15](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/15)
- **Ảnh minh chứng:**
  ![Bug 15](https://github.com/nguyenhieuthuan3105/HW04-Automation_Testing/issues/15)
