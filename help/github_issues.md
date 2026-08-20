# DANH SÁCH GITHUB ISSUES TEMPLATE (COPY TRỰC TIẾP LÊN GITHUB)

Dưới đây là nội dung chi tiết của 15 GitHub Issues tương ứng với 15 Bugs đã phát hiện trong bài tập HW04. Bạn chỉ cần copy từng phần tiêu đề (Title) và nội dung (Body) để đăng lên GitHub Issues.

---

# ISSUE #1: [BUG] FR-02: Hệ thống vẫn từ chối đăng nhập sau khi đã chờ hơn 30 giây hết thời gian phạt

### Title:
```text
[BUG] FR-02: Hệ thống vẫn từ chối đăng nhập sau khi đã chờ hơn 30 giây hết thời gian phạt
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Theo đặc tả nghiệp vụ (FR-02), khi người dùng nhập sai mật khẩu 3 lần liên tiếp, tài khoản sẽ bị tạm khóa trong vòng 30 giây và từ chối mọi yêu cầu đăng nhập. Tuy nhiên, sau khi người dùng chờ đủ và vượt quá 30 giây (ví dụ 35s - 40s), nếu tiếp tục nhập mật khẩu chính xác thì hệ thống Frontend vẫn từ chối và báo lỗi, không cho phép đăng nhập vào trang chủ. Người dùng phải tải lại trang (F5) thì mới đăng nhập lại được.

## Các bước tái hiện (Steps to Reproduce)
1. Truy cập trang Đăng nhập (`http://localhost:5173/login`).
2. Nhập Email đúng (`test@eshop.com`) và mật khẩu sai 3 lần liên tiếp để kích hoạt trạng thái khóa.
3. Chờ đồng hồ đếm ngược vượt qua 30 giây (khoảng 35 giây).
4. Nhập lại mật khẩu CHÍNH XÁC (`Test1234!`) và bấm nút **Sign In**.

## Kết quả mong đợi (Expected Behavior)
Sau khi hết thời gian phạt 30 giây, trạng thái khóa của tài khoản phải tự động được giải phóng (Unlock/Reset). Người dùng đăng nhập bằng mật khẩu đúng phải được chuyển hướng thành công về trang chủ (`/`).

## Kết quả thực tế (Actual Behavior)
Hệ thống vẫn giữ trạng thái khóa trên giao diện, từ chối đăng nhập và không chuyển hướng về trang chủ dù đã chờ quá 30 giây.

## Test Case liên quan
- `TC_FR-02_02`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình hoặc Playwright trace/video khi tạo Issue)*
```

---

# ISSUE #2: [BUG] FR-02: Ô nhập Email không kiểm tra định dạng email tiêu chuẩn HTML5 (Thiếu type="email")

### Title:
```text
[BUG] FR-02: Ô nhập Email không kiểm tra định dạng email tiêu chuẩn HTML5 (Thiếu type="email")
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Ô nhập Email tại trang Đăng nhập đang sử dụng thẻ input thông thường hoặc thiếu ràng buộc kiểm tra định dạng email (`type="email"` của HTML5). Khi người dùng nhập chuỗi không đúng cấu trúc email (thiếu ký tự `@`, thiếu tên miền domain), trình duyệt không chặn lại mà vẫn cho phép submit form gửi request xuống backend.

## Các bước tái hiện (Steps to Reproduce)
1. Truy cập trang Đăng nhập (`http://localhost:5173/login`).
2. Nhập vào ô Username/Email một chuỗi sai định dạng (ví dụ: `testeshop.com`).
3. Nhập mật khẩu bất kỳ và bấm **Sign In**.

## Kết quả mong đợi (Expected Behavior)
Trình duyệt phải kích hoạt cơ chế HTML5 Form Validation, chặn việc submit form và hiển thị cảnh báo yêu cầu người dùng nhập đúng định dạng email (phải có ký tự `@`).

## Kết quả thực tế (Actual Behavior)
Form vẫn được submit bình thường, không có bất kỳ thông báo validation nào từ phía UI Client-side.

## Test Case liên quan
- `TC_FR-02_04`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #3: [BUG] FR-02: Hệ thống không hiển thị thông báo chi tiết khi tài khoản rơi vào trạng thái tạm khóa

### Title:
```text
[BUG] FR-02: Hệ thống không hiển thị thông báo chi tiết khi tài khoản rơi vào trạng thái tạm khóa
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Theo đặc tả (FR-02), khi tài khoản bị khóa do nhập sai mật khẩu 3 lần liên tiếp, hệ thống cần hiển thị thông báo rõ ràng cho người dùng biết (VD: "Tài khoản của bạn đã bị tạm khóa trong 30 giây"). Tuy nhiên, giao diện chỉ hiển thị thông báo chung chung "Đăng nhập thất bại. Vui lòng kiểm tra lại." mà không nêu rõ tài khoản đang bị khóa và thời gian chờ còn lại.

## Các bước tái hiện (Steps to Reproduce)
1. Truy cập trang Đăng nhập (`http://localhost:5173/login`).
2. Nhập Email đúng (`test@eshop.com`) và mật khẩu sai 3 lần liên tiếp.
3. Quan sát thông báo lỗi hiển thị trên giao diện ở lần thứ 3.

## Kết quả mong đợi (Expected Behavior)
Hệ thống phải hiển thị thông báo lỗi cụ thể về trạng thái khóa: "Tài khoản đang bị tạm khóa trong 30 giây, vui lòng thử lại sau."

## Kết quả thực tế (Actual Behavior)
Giao diện chỉ hiển thị thông báo lỗi sai mật khẩu bình thường: "Đăng nhập thất bại. Vui lòng kiểm tra lại." gây hiểu lầm cho người dùng.

## Test Case liên quan
- `TC_FR-02_07`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #4: [BUG] FR-02: Hệ thống khóa đăng nhập sớm ngay từ lần nhập sai thứ 2 (Thay vì 3 lần theo đặc tả)

### Title:
```text
[BUG] FR-02: Hệ thống khóa đăng nhập sớm ngay từ lần nhập sai thứ 2 (Thay vì 3 lần theo đặc tả)
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Theo đặc tả hệ thống (FR-02), tài khoản chỉ bị tạm khóa khi người dùng nhập sai thông tin từ 3 lần trở lên liên tiếp ($N=3$). Tuy nhiên, thực tế kiểm thử cho thấy hệ thống đã kích hoạt khóa tài khoản ngay ở lần nhập sai thứ 2 ($N=2$), khiến người dùng bị chặn đăng nhập sớm hơn quy định.

## Các bước tái hiện (Steps to Reproduce)
1. Truy cập trang Đăng nhập (`http://localhost:5173/login`).
2. Nhập Email đúng (`test@eshop.com`) và Mật khẩu sai (Lần 1). Nhấn Sign In.
3. Nhập tiếp Mật khẩu sai (Lần 2). Nhấn Sign In.
4. Ngay sau đó, nhập Mật khẩu ĐÚNG (`Test1234!`) và nhấn Sign In.

## Kết quả mong đợi (Expected Behavior)
Tại mốc $N=2$ lần sai, tài khoản chưa đạt ngưỡng khóa ($N=3$), do đó khi người dùng nhập mật khẩu đúng thì hệ thống phải cho phép đăng nhập thành công vào trang chủ.

## Kết quả thực tế (Actual Behavior)
Hệ thống đã khóa tài khoản ngay ở lần thứ 2, từ chối yêu cầu đăng nhập dù người dùng đã nhập đúng mật khẩu.

## Test Case liên quan
- `TC_FR-02_BVA_01`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #5: [BUG] FR-02: Tài khoản vẫn bị khóa tại đúng mốc biên 30 giây thời gian phạt

### Title:
```text
[BUG] FR-02: Tài khoản vẫn bị khóa tại đúng mốc biên 30 giây thời gian phạt
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Theo phân tích giá trị biên (BVA) của FR-02, mốc thời gian $t = 30s$ là biên kết thúc thời gian phạt. Tại thời điểm đúng 30 giây, trạng thái khóa phải được hủy bỏ. Tuy nhiên trên SUT, tại đúng mốc 30 giây, khi người dùng nhập đúng mật khẩu thì hệ thống vẫn từ chối đăng nhập.

## Các bước tái hiện (Steps to Reproduce)
1. Truy cập trang Đăng nhập (`http://localhost:5173/login`).
2. Nhập sai mật khẩu 3 lần liên tiếp để kích hoạt khóa.
3. Đếm thời gian chờ đúng 30 giây ($t = 30000ms$).
4. Nhập mật khẩu chính xác (`Test1234!`) và nhấn Sign In.

## Kết quả mong đợi (Expected Behavior)
Tại mốc $t = 30s$, thời gian phạt đã kết thúc, hệ thống phải mở khóa và cho phép đăng nhập thành công vào trang chủ.

## Kết quả thực tế (Actual Behavior)
Hệ thống vẫn từ chối đăng nhập và không chuyển hướng người dùng vào hệ thống.

## Test Case liên quan
- `TC_FR-02_BVA_05`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #6: [BUG] FR-08: Giỏ hàng không tự động làm rỗng sau khi thanh toán đơn hàng thành công

### Title:
```text
[BUG] FR-08: Giỏ hàng không tự động làm rỗng sau khi thanh toán đơn hàng thành công
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Sau khi người dùng hoàn tất quá trình thanh toán và nhận được thông báo "Thanh toán thành công!", nếu bấm vào nút "Giỏ hàng" trên thanh điều hướng Header, toàn bộ các sản phẩm đã mua trước đó vẫn còn nguyên vẹn trong giỏ hàng thay vì được tự động làm rỗng. Điều này dẫn đến nguy cơ người dùng đặt trùng lặp đơn hàng.

## Các bước tái hiện (Steps to Reproduce)
1. Đăng nhập vào tài khoản người dùng (`test@eshop.com`).
2. Chọn sản phẩm iPhone 15 Pro Max và bấm "Thêm vào giỏ hàng".
3. Nhấp vào nút "Giỏ hàng" trên Header $\rightarrow$ Bấm "Tiến hành thanh toán" $\rightarrow$ Bấm "Xác Nhận Thanh Toán".
4. Màn hình hiển thị "Thanh toán thành công!".
5. Nhấp lại vào nút "Giỏ hàng" trên Header.

## Kết quả mong đợi (Expected Behavior)
Giỏ hàng phải được xóa rỗng và hiển thị thông báo "Giỏ hàng của bạn đang trống".

## Kết quả thực tế (Actual Behavior)
Sản phẩm cũ vẫn còn nguyên trong giỏ hàng với số lượng và đơn giá như trước khi thanh toán.

## Test Case liên quan
- `TC_FR-08_01`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #7: [BUG] FR-08: Lỗ hổng bảo mật cho phép can thiệp chỉnh sửa tổng tiền thành 0 VNĐ khi thanh toán

### Title:
```text
[BUG] FR-08: Lỗ hổng bảo mật cho phép can thiệp chỉnh sửa tổng tiền thành 0 VNĐ khi thanh toán
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Trên giao diện thanh toán (`/checkout`), ô nhập "Tổng tiền thanh toán (VND):" là một thẻ input có thể chỉnh sửa tự do bởi người dùng. Người dùng có thể xóa số tiền thực tế và nhập vào `0`. Backend thiếu cơ chế tính toán lại giá trị đơn hàng từ cơ sở dữ liệu nên vẫn chấp nhận tạo đơn hàng 0 VNĐ thành công.

## Các bước tái hiện (Steps to Reproduce)
1. Thêm sản phẩm trị giá 30.000.000 VNĐ vào giỏ hàng và chuyển đến trang `/checkout`.
2. Tại ô "Tổng tiền thanh toán (VND):", can thiệp xóa giá trị cũ và điền số `0`.
3. Nhấp nút "Xác Nhận Thanh Toán".

## Kết quả mong đợi (Expected Behavior)
Hệ thống phải phát hiện sai lệch giá tiền, từ chối thanh toán hoặc tự động tính toán lại tổng tiền từ giá niêm yết của sản phẩm.

## Kết quả thực tế (Actual Behavior)
Hệ thống ghi nhận thanh toán thành công và tạo một đơn hàng có tổng giá trị bằng 0 VNĐ trong Database.

## Test Case liên quan
- `TC_FR-08_02`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #8: [BUG] FR-08: Lỗ hổng bảo mật cho phép thanh toán đơn hàng có giá trị tiền âm

### Title:
```text
[BUG] FR-08: Lỗ hổng bảo mật cho phép thanh toán đơn hàng có giá trị tiền âm
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Tương tự lỗi thanh toán 0 VNĐ, trường tổng tiền tại trang `/checkout` không có validation chặn số âm. Người dùng có thể sửa tổng tiền thành số âm (ví dụ: `-10` hoặc `-30,000,000 VNĐ`), và hệ thống vẫn chấp nhận thanh toán thành công. Khi đơn hàng này được duyệt, nó sẽ làm trừ sai lệch tổng doanh thu của hệ thống.

## Các bước tái hiện (Steps to Reproduce)
1. Thêm sản phẩm vào giỏ hàng và đi tới trang `/checkout`.
2. Tại trường tổng tiền, nhập số âm (ví dụ: `-10`).
3. Nhấp nút "Xác Nhận Thanh Toán".

## Kết quả mong đợi (Expected Behavior)
Hệ thống phải validate chặt chẽ `total_amount > 0` và từ chối xử lý đơn hàng có số tiền âm.

## Kết quả thực tế (Actual Behavior)
Hệ thống tạo đơn hàng thành công với giá trị âm trong cơ sở dữ liệu.

## Test Case liên quan
- `TC_FR-08_03`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #9: [BUG] FR-08: Cho phép tạo đơn hàng ma khi giỏ hàng hoàn toàn trống rỗng

### Title:
```text
[BUG] FR-08: Cho phép tạo đơn hàng ma khi giỏ hàng hoàn toàn trống rỗng
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Khi người dùng chưa thêm bất kỳ sản phẩm nào vào giỏ hàng nhưng truy cập trực tiếp vào đường dẫn `/checkout` và bấm "Xác Nhận Thanh Toán", hệ thống không kiểm tra tính rỗng của giỏ hàng mà vẫn ghi nhận tạo một đơn hàng không có sản phẩm (Ghost Order) trong Database.

## Các bước tái hiện (Steps to Reproduce)
1. Đăng nhập vào tài khoản và đảm bảo giỏ hàng đang trống rỗng (0 sản phẩm).
2. Điều hướng vào trang `/checkout`.
3. Bấm nút "Xác Nhận Thanh Toán".

## Kết quả mong đợi (Expected Behavior)
Hệ thống phải hiển thị cảnh báo "Giỏ hàng trống, không thể thanh toán" và vô hiệu hóa (disable) nút xác nhận đặt hàng.

## Kết quả thực tế (Actual Behavior)
Hệ thống hiển thị "Thanh toán thành công!" và tạo một đơn hàng rỗng trong cơ sở dữ liệu.

## Test Case liên quan
- `TC_FR-08_04`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #10: [BUG] FR-08: Lỗi Race Condition - Cho phép thanh toán sản phẩm đã bị xóa hoàn toàn khỏi kho bởi Admin

### Title:
```text
[BUG] FR-08: Lỗi Race Condition - Cho phép thanh toán sản phẩm đã bị xóa hoàn toàn khỏi kho bởi Admin
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Khi một sản phẩm đã được người dùng thêm vào giỏ hàng, nhưng sau đó Admin đăng nhập vào trang quản trị (`:5174`) và xóa hoàn toàn sản phẩm đó khỏi hệ thống. Khi người dùng bấm thanh toán, hệ thống không kiểm tra tính khả dụng và tồn tại của sản phẩm trong kho mà vẫn tạo đơn hàng thành công cho sản phẩm đã bị xóa.

## Các bước tái hiện (Steps to Reproduce)
1. User đăng nhập trên Storefront (`:5173`), thêm sản phẩm iPhone 15 Pro Max vào giỏ hàng.
2. Admin đăng nhập trên Admin Portal (`:5174`), vào mục "Sản phẩm" và bấm nút "Xóa" sản phẩm iPhone 15 Pro Max.
3. User quay lại trang Checkout và bấm "Xác Nhận Thanh Toán".

## Kết quả mong đợi (Expected Behavior)
Hệ thống phải kiểm tra trạng thái sản phẩm trước khi thanh toán, báo lỗi "Sản phẩm trong giỏ hàng không còn tồn tại" và từ chối tạo đơn.

## Kết quả thực tế (Actual Behavior)
Hệ thống vẫn cho phép thanh toán thành công đơn hàng chứa sản phẩm đã bị xóa.

## Test Case liên quan
- `TC_FR-08_06`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #11: [BUG] FR-08: Lỗ hổng logic cho phép đặt đơn hàng với số lượng sản phẩm bằng 0

### Title:
```text
[BUG] FR-08: Lỗ hổng logic cho phép đặt đơn hàng với số lượng sản phẩm bằng 0
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Tại trang chi tiết sản phẩm (`/product/1`), người dùng có thể nhập số lượng bằng 0 ($N=0$) vào ô "Số lượng:" và bấm thêm vào giỏ hàng. Hệ thống không kiểm tra điều kiện $quantity \ge 1$ mà vẫn cho phép tiến hành thanh toán và tạo đơn hàng có số lượng 0 sản phẩm.

## Các bước tái hiện (Steps to Reproduce)
1. Truy cập trang chi tiết sản phẩm (`http://localhost:5173/product/1`).
2. Nhập số `0` vào ô "Số lượng:".
3. Bấm "Thêm vào giỏ hàng" $\rightarrow$ Mở giỏ hàng $\rightarrow$ Tiến hành thanh toán $\rightarrow$ Xác nhận thanh toán.

## Kết quả mong đợi (Expected Behavior)
Ô số lượng phải có ràng buộc `min="1"` và hệ thống từ chối thêm sản phẩm có số lượng bằng 0 vào giỏ hàng.

## Kết quả thực tế (Actual Behavior)
Hệ thống cho phép thanh toán thành công đơn hàng có số lượng bằng 0.

## Test Case liên quan
- `TC_FR-08_BVA_01`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #12: [BUG] FR-08: Giỏ hàng bị xóa sạch dữ liệu khi truy cập trực tiếp bằng URL hoặc tải lại trang (F5)

### Title:
```text
[BUG] FR-08: Giỏ hàng bị xóa sạch dữ liệu khi truy cập trực tiếp bằng URL hoặc tải lại trang (F5)
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Khi người dùng đã thêm sản phẩm vào giỏ hàng, nếu điều hướng bằng cách nhập trực tiếp URL (`http://localhost:5173/cart`) trên thanh địa chỉ trình duyệt hoặc nhấn phím F5 / Reload trang, toàn bộ sản phẩm trong giỏ hàng bị biến mất ngay lập tức do ứng dụng React chỉ lưu giỏ hàng trên bộ nhớ RAM (state component) mà không đồng bộ vào LocalStorage, SessionStorage hoặc Database.

## Các bước tái hiện (Steps to Reproduce)
1. Thêm một sản phẩm vào giỏ hàng thành công.
2. Nhập trực tiếp đường dẫn `http://localhost:5173/cart` vào thanh địa chỉ trình duyệt và nhấn Enter (hoặc nhấn F5 tải lại trang).
3. Quan sát giao diện giỏ hàng.

## Kết quả mong đợi (Expected Behavior)
Dữ liệu giỏ hàng phải được duy trì liên tục trong phiên làm việc của người dùng dù có reload trang hoặc truy cập URL trực tiếp.

## Kết quả thực tế (Actual Behavior)
Giỏ hàng bị xóa sạch hoàn toàn và hiển thị thông báo "Giỏ hàng của bạn đang trống".

## Test Case liên quan
- `TC_FR-08_01`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #13: [BUG] FR-13: Lỗi logic tính toán nhân đôi ($2 \times$) Tổng doanh thu trên Admin Dashboard

### Title:
```text
[BUG] FR-13: Lỗi logic tính toán nhân đôi ($2 \times$) Tổng doanh thu trên Admin Dashboard
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Theo đặc tả (FR-13), thẻ "Tổng doanh thu (Delivered)" trên Dashboard Admin chỉ cộng dồn giá trị `total_amount` của các đơn hàng có trạng thái `delivered`. Tuy nhiên, thực tế hệ thống luôn luôn hiển thị giá trị doanh thu gấp đôi ($2 \times$) so với tổng tiền thực tế của các đơn hàng đã giao trong cơ sở dữ liệu (ví dụ: 1 đơn hàng 30.000.000 VNĐ Delivered nhưng Dashboard lại hiển thị thành 60.000.000 VNĐ).

## Các bước tái hiện (Steps to Reproduce)
1. Tạo 1 đơn hàng duy nhất trị giá 30.000.000 VNĐ.
2. Đăng nhập Admin (`:5174`), vào mục "Đơn hàng" và duyệt đơn hàng sang trạng thái "Đã giao" (Delivered).
3. Mở trang Dashboard và quan sát con số tại thẻ "Tổng doanh thu (Delivered)".

## Kết quả mong đợi (Expected Behavior)
Tổng doanh thu hiển thị đúng `30.000.000 đ`.

## Kết quả thực tế (Actual Behavior)
Tổng doanh thu hiển thị sai thành `60.000.000 đ` (bị nhân đôi x2).

## Test Case liên quan
- `TC_FR-13_03`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #14: [BUG] FR-13: Giao diện thẻ Tổng doanh thu không Responsive, bị vỡ layout khi số tiền lớn

### Title:
```text
[BUG] FR-13: Giao diện thẻ Tổng doanh thu không Responsive, bị vỡ layout khi số tiền lớn
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Khi tổng doanh thu đạt giá trị số lớn (ví dụ: hàng trăm nghìn tỷ đồng do tích lũy đơn hàng lớn), thẻ Card hiển thị "Tổng doanh thu" trên trang Dashboard không có cơ chế co giãn phông chữ, ngắt dòng hoặc rút gọn số liệu (như hiển thị dạng 300T đ). Kết quả là chuỗi chữ số bị tràn ra ngoài khung viền của thẻ (`overflow`), đè lên các phần tử lân cận và gây vỡ giao diện trên màn hình trung bình/nhỏ.

## Các bước tái hiện (Steps to Reproduce)
1. Đăng nhập Admin (`:5174`), truy cập trang Dashboard có đơn hàng Delivered giá trị cực lớn (hoặc co nhỏ kích thước cửa sổ trình duyệt về chiều rộng 768px).
2. Quan sát thẻ "Tổng doanh thu (Delivered)".

## Kết quả mong đợi (Expected Behavior)
Thẻ Card phải có thiết kế Responsive, tự động co nhỏ cỡ chữ hoặc định dạng rút gọn để nội dung luôn nằm gọn gàng bên trong khung viền.

## Kết quả thực tế (Actual Behavior)
Dãy chữ số tiền tệ bị tràn hẳn ra ngoài mép phải của khung Card, làm hỏng bố cục giao diện Dashboard.

## Test Case liên quan
- `TC_FR-13_BVA_05`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```

---

# ISSUE #15: [BUG] FR-13: Giao diện thẻ Tổng số đơn hàng không Responsive, bị vỡ layout khi số lượng đơn cực lớn

### Title:
```text
[BUG] FR-13: Giao diện thẻ Tổng số đơn hàng không Responsive, bị vỡ layout khi số lượng đơn cực lớn
```

### Body:
```markdown
## Mô tả lỗi (Bug Description)
Tương tự thẻ Doanh thu, thẻ "Tổng số đơn hàng" trên Dashboard Admin thiếu cơ chế responsive khi số đếm đạt mốc cực lớn (ví dụ mock số lượng $999.999.999.999.999$ đơn hàng để kiểm thử giới hạn hiển thị BVA). Chuỗi số nguyên dài bị tràn ra ngoài khung giới hạn của thẻ Card, làm vỡ bố cục Dashboard.

## Các bước tái hiện (Steps to Reproduce)
1. Truy cập trang Dashboard Admin (`:5174`).
2. Can thiệp hiển thị số lượng đơn hàng lớn (hoặc thu nhỏ viewport trình duyệt về 768px).
3. Quan sát vị trí chữ số tại thẻ "Tổng số đơn hàng".

## Kết quả mong đợi (Expected Behavior)
Thẻ hiển thị phải responsive, tự động co chữ hoặc xử lý văn bản dài để không bị tràn viền.

## Kết quả thực tế (Actual Behavior)
Chữ số đếm đơn hàng bị tràn ra ngoài khung viền của thẻ Card.

## Test Case liên quan
- `TC_FR-13_BVA_06`

## Ảnh minh chứng (Screenshots)
*(Đính kèm ảnh chụp màn hình khi tạo Issue)*
```
