# AI CRITIQUE

```text
Sau khi sử dụng Gemini 3.7 Flash (High) và Antigravity IDE trong quá trình thực hiện bài tập HW04 – Automation Testing trên hệ thống EShop, tôi nhận thấy rằng việc áp dụng AI mang lại hiệu suất rất cao ở các tác vụ khởi tạo khung mã nguồn Page Object Model (POM), chuyển đổi dữ liệu kiểm thử sang định dạng JSON Data-Driven và thiết lập cấu hình đa trình duyệt kèm Watermark chống gian lận, nhưng cũng bộc lộ nhiều hạn chế nghiêm trọng khi đi vào thực thi kiểm thử End-to-End chuyên sâu trên giao diện trình duyệt thực tế.

Điểm mạnh nổi bật của AI là khả năng sinh mã cấp tốc theo khuôn mẫu chuẩn mực, tách biệt hoàn toàn dữ liệu kiểm thử khỏi file script và hỗ trợ đóng gói quy trình thành Agent Skill tự động hóa 9 Phase rất khoa học. Nhờ AI, việc thiết lập cấu hình chạy 3 trình duyệt (Chromium, Firefox, WebKit) và nhúng nhãn thời gian ISO cùng thông tin sinh viên được thực hiện nhanh chóng và nhất quán.

Tuy nhiên, điểm yếu cốt tử của AI là thiếu trải nghiệm trực quan thực tế và mang nặng tư duy tự động hóa máy móc. Tại FR-02, AI thiết lập timeline bất hợp lý khi không lường trước giới hạn timeout mặc định của Playwright lúc chờ phạt 30 giây mở khóa và thiếu vòng lặp nhập sai mật khẩu thực tế. Tại FR-08, AI tự tiện dùng lệnh page.goto('/cart') làm kích hoạt tải lại toàn trang (full reload), xóa sạch dữ liệu giỏ hàng vốn chỉ lưu trên bộ nhớ in-memory của ứng dụng React. Tại FR-13, AI mắc ảo giác cú pháp khi dùng pseudo-selector không chuẩn :contains() trong DOM evaluation và viết selector quá rộng div:has-text("đ") bắt trúng cả Sidebar/Header. Ngoài ra, AI còn tự ý gửi request ngầm liên tục vào cổng Backend 3000 làm dời mốc mở khóa của SUT.

Tóm lại, AI chỉ là một trợ lý sinh mã tăng tốc (Accelerator), tuyệt đối không thể thay thế tư duy phản biện của con người. Kỹ sư QA bắt buộc phải kiểm duyệt từng luồng thao tác, thấu hiểu kiến trúc SUT và duy trì kiểm soát thủ công để đảm bảo kịch bản kiểm thử phản ánh trung thực hành vi người dùng.
```