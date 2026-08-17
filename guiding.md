# HƯỚNG DẪN CHI TIẾT THỰC HIỆN VÀ NỘP BÀI HW04 - AUTOMATION TESTING (HW04-AI)

> **Tài liệu tham chiếu chính**: `2026.HW04.Automation Testing_En.pdf`  
> **Môn học**: Kiểm thử phần mềm / Software Testing  
> **Mã bài tập**: HW04-AI  
> **Thời lượng ước tính**: 10 giờ  
> **Hình thức**: Bài tập cá nhân  
> **Hình thức nộp**: Moodle (File nén `.zip`)  

---

## 📌 1. TỔNG QUAN BÀI TẬP VÀ NGUYÊN TẮC CỐT LÕI

### 1.1. Mục tiêu bài tập
Bài tập yêu cầu bạn thực hiện **Kiểm thử tự động (Automation Testing)** cho giao diện Web Frontend của hệ thống **EShop** bằng cách áp dụng chiến lược **AI-First**, kết hợp với công cụ kiểm thử như **Playwright** (khuyên dùng) hoặc **Selenium 4+**, cùng với hệ thống báo cáo **Allure** hoặc **Playwright HTML Reporter**.

- **Hệ thống thử nghiệm (SUT)**: EShop – Ứng dụng thương mại điện tử demo.
- **Repository SUT gốc**: [https://github.com/ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut)
- **Cấp độ Bloom-AI yêu cầu**: G9.2 (Apply), G9.3 (Analyse), G9.4 (Collaborate with AI).

### 1.2. 5 Nguyên tắc chỉ đạo bắt buộc (Guiding Principles)
1. **AI-First Strategy (Chiến lược ưu tiên AI)**: Sử dụng AI để sinh kịch bản kiểm thử, nhưng phải điều khiển AI **từng bước (step-by-step prompts)**. CẤM sử dụng 1 prompt chung chung kiểu *"Hãy viết tất cả kịch bản tự động cho tính năng này"*.
2. **Human Review (Rà soát bởi con người)**: Bạn phải trực tiếp kiểm tra, sửa lỗi, hoàn thiện code do AI sinh ra. **Không chấp nhận nộp kết quả thô chưa qua rà soát từ AI.**
3. **AI Audit Report (Nhật ký AI)**: Toàn bộ quá trình sử dụng AI phải được ghi chép chi tiết thành log/báo cáo audit.
4. **Anti-AI-Cheat Constraints (Ràng buộc chống gian lận AI)**:
   - Báo cáo HTML **BẮT BUỘC** hiển thị rõ dòng chữ `Run by: {StudentID}` kèm theo **ISO Timestamp**.
   - Video demo **BẮT BUỘC** có thuyết minh bằng giọng thật (tiếng Việt) và xuất hiện **Face-cam** HOẶC **Terminal chạy lệnh `whoami` & `hostname`**.
5. **Quality Over Completion (Chất lượng hơn số lượng)**: Điểm số dựa trên chất lượng kịch bản, dữ liệu kiểm thử, báo cáo HTML, báo cáo lỗi (Bug Report), video demo và lịch sử commit Git.

---

## 🎯 2. LỰA CHỌN TÍNH NĂNG KIỂM THỬ & MA TRẬN KẾ THỪA TỪ HW02

### 2.1. 3 Tính năng Web kế thừa từ HW02 của bạn (MSSV: 23127125)
Dựa trên kết quả bài tập **HW02** bạn đã hoàn thành (xem `hw2/README.md` & `hw2/Main_Report.md`), 3 tính năng Web tương ứng được chọn cho HW04 bao gồm:

1. **Pool A (Feature A)**: `FR-02` – Login and account lockout (Đăng nhập & Khóa tài khoản) *(HW02 đã thiết kế 15 TCs)*
2. **Pool B (Feature B)**: `FR-08` – Checkout (Thanh toán / Đặt hàng) *(HW02 đã thiết kế 14 TCs)*
3. **Pool C (Feature C)**: `FR-13` – Dashboard (Màn hình tổng quan Admin) *(HW02 đã thiết kế 12 TCs)*

*(Lưu ý: Tính năng `FR-20` thuộc Pool D - Mobile App trong HW02 sẽ **KHÔNG** dùng trong HW04 vì HW04 chỉ kiểm thử tự động trên Web Frontend).*

---

### 2.2. Chi tiết những gì HW04 yêu cầu lấy từ HW02

| Yếu tố trong HW02 | Cách sử dụng / Kế thừa trong HW04 |
| :--- | :--- |
| **1. Danh sách 3 Tính năng Web** | Kế thừa 100% 3 tính năng `FR-02`, `FR-08`, `FR-13`. Đảm bảo không trùng với thành viên khác trong nhóm. |
| **2. Danh sách Test Cases (>= 12 TCs / tính năng)** | Lấy **tối thiểu 12 test cases** cho mỗi tính năng từ HW02 (bao gồm cả Positive, Negative, và Boundary Edge cases) để đưa vào prompt cho AI chuyển thành kịch bản tự động Playwright/Selenium. |
| **3. Bảng Dữ liệu Kiểm thử (Domain & BVA Data)** | Các giá trị đầu vào, giá trị biên (On/Off/In/Out points) từ HW02 được trích xuất thành file dữ liệu riêng (`.json` hoặc `.csv`) để phục vụ **Data-Driven Testing**. |
| **4. Kết quả mong đợi (Expected Results)** | Chuyển đổi các tiêu chí nghiệm thu/kết quả mong đợi ở HW02 thành các câu lệnh **Assertions** trong script tự động (cần tối thiểu 3 kiểu Assertions khác nhau). |
| **5. Danh sách Bugs & GitHub Issues** | Các lỗi SUT tìm được từ HW02 sẽ được kiểm tra lại qua Automation Script. Các test case bị failed thực sự sẽ được log lên **GitHub Issues** kèm screenshot chứng minh. |
| **6. Agent Skill / Workflow** | Kế thừa tư duy thiết kế Agent Skill từ HW02 (`Eshop_QA_Agent_Skill.md`) để nâng cấp thành **Automation Agent Skill** phục vụ tự động hóa kịch bản đa trình duyệt (đạt 10 điểm bonus). |

---

## 🚀 3. HƯỚNG DẪN THỰC HIỆN CHI TIẾT TỪNG BƯỚC (STEP-BY-STEP WORKFLOW)

### BƯỚC 1: Chuẩn bị Môi trường & Kho chứa Mã nguồn (Repository Setup)
1. Fork hoặc clone ứng dụng SUT từ [https://github.com/ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut) và khởi chạy ứng dụng web cục bộ (Local environment).
2. Tạo một **Public GitHub Repository** dành riêng cho dự án Automation Testing HW04.
3. Khởi tạo dự án Playwright / Selenium:
   - Khuyên dùng Playwright với TypeScript: `npm init playwright@latest`.
   - Cấu hình Playwright HTML Reporter / Allure Reporter sao cho tên báo cáo hoặc metadata báo cáo tự động chèn thông tin `Run by: {StudentID}` (ví dụ: `Run by: 25127001`).

---

### BƯỚC 2: Thiết kế Test Cases & Chuẩn bị Dữ liệu Kiểm thử (Data-Driven Testing)
1. Với **mỗi tính năng trong 3 tính năng** đã chọn, thiết kế **tối thiểu 12 test cases** (Tổng cộng $\ge 36$ test cases cho cả 3 tính năng).
   - Phải bao gồm sự kết hợp giữa: **Positive test cases** (kịch bản thành công), **Negative test cases** (kịch bản thất bại/lỗi), và **Edge cases** (kịch bản biên/đặc biệt).
2. **Áp dụng Data-Driven Testing**:
   - Tất cả dữ liệu đầu vào (tên đăng nhập, mật khẩu, thông tin sản phẩm, dữ liệu biên...) phải được lưu trữ trong **file tách biệt** (`.json` hoặc `.csv`).
   - **CẤM** hardcode dữ liệu trực tiếp dạng mảng/object bên trong file script kiểm thử (`.spec.ts` / `.spec.js`).
   - Đọc dữ liệu từ file `.json`/`.csv` vào kịch bản kiểm thử thông qua các hàm đọc file hoặc `import`.

---

### BƯỚC 3: Sử dụng AI để Sinh Kịch bản Tự động (AI-First Script Generation)
1. Sử dụng các công cụ AI (ChatGPT, Claude, Gemini, Copilot, Cursor...) để sinh kịch bản Playwright/Selenium.
2. Thực hiện prompt từng bước (Step-by-Step Prompting):
   - **Lần prompt 1**: Cung cấp cấu trúc HTML/DOM hoặc UI mockup, yêu cầu AI định vị selector và xây dựng các Page Object Model (POM).
   - **Lần prompt 2**: Đưa danh sách test cases + cấu trúc file dữ liệu `.json/.csv`, yêu cầu AI viết hàm đọc dữ liệu và sinh vòng lặp test case tự động.
   - **Lần prompt 3**: Yêu cầu AI bổ sung các khẳng định (**Assertions**). Phải sử dụng **ít nhất 3 kiểu Assertions khác nhau** trong kịch bản (ví dụ trong Playwright: `expect(locator).toBeVisible()`, `expect(locator).toHaveText()`, `expect(locator).toHaveURL()`, `expect(locator).toBeDisabled()`, `expect(locator).toContainText()`).
3. **Ghi lại nhật ký tương tác AI (AI Audit Log)** ngay trong quá trình thực hiện:
   - Tên công cụ AI
   - Ngày giờ thực hiện
   - Câu prompt bạn gửi
   - Kết quả/mã nguồn AI phản hồi

---

### BƯỚC 4: Rà soát, Phân tích Khe hở & Sửa lỗi bởi Con người (Human Review & Fix)
1. Chạy thử kịch bản do AI tạo ra. Phát hiện các vấn đề thường gặp:
   - **Fragile selectors**: Selector quá dài, phụ thuộc cấu trúc DOM dễ thay đổi.
   - **Weak/Missing assertions**: Khẳng định chưa đủ chặt chẽ hoặc thiếu kiểm tra kết quả mong đợi.
   - **Flaky waits / Race conditions**: Thiếu thời gian chờ bất đồng bộ làm kịch bản chạy chập chờn.
   - **Missing edge cases**: AI bỏ sót trường hợp đặc biệt.
2. Trực tiếp chỉnh sửa code, tối ưu hóa kịch bản cho đến khi kịch bản chạy ổn định.
3. Document lại phần **Human Review & Gap Analysis** trong Báo cáo chính:
   - AI đã làm sai hoặc làm thiếu những điểm nào?
   - Nguyên nhân tại sao AI mắc lỗi (do chất lượng prompt, giới hạn mô hình AI, hay do đặc thù phức tạp của tính năng SUT?).
4. **Quản lý Git Commit**:
   - Duy trì kho chứa GitHub công khai với **tối thiểu 8 commits hợp lệ**.
   - Chỉ những commit làm thay đổi file script kiểm thử (`.spec.js`, `.spec.ts` hoặc tương đương) mới được tính vào số lượng 8 commits này. Commit chỉnh sửa README hay tài liệu sẽ KHÔNG được tính.

---

### BƯỚC 5: Thực thi Đa Trình duyệt & Xuất Báo cáo HTML (Multi-Browser Execution)
1. Cấu hình kịch bản chạy trên **ít nhất 3 trình duyệt khác nhau**:
   - Bộ 3 trình duyệt: **Chromium**, **Firefox**, **WebKit** (hoặc **Chrome**, **Edge**, **Firefox**).
2. Tất cả 3 tính năng đều phải chạy thành công trên cả 3 trình duyệt $\rightarrow$ **Tối thiểu 9 lượt chạy trình duyệt (9 browser runs)** cho toàn bộ suite kiểm thử.
3. Xuất Báo cáo HTML (Playwright HTML Report / Allure Report):
   - Đảm bảo trong tiêu đề, header, footer hoặc metadata của báo cáo HTML hiển thị rõ dòng chữ: `Run by: {StudentID}` (ví dụ: `Run by: 25127001`).
   - Kiểm tra báo cáo chứa đầy đủ thông tin thời gian thực thi (ISO timestamp).

---

### BƯỚC 6: Quản lý Báo cáo Lỗi (Bug Reporting) & Các trường hợp không tự động hóa
1. Khi khẳng định (Assertion) bị thất bại do phát hiện lỗi thực sự của ứng dụng SUT:
   - Ghi nhận lỗi vào phần **Bug Report** trong báo cáo Markdown.
   - Đăng lỗi lên trang **GitHub Issues** của repository dự án.
   - Chụp ảnh màn hình bằng chứng và đính kèm vào GitHub Issue.
2. Nếu có kịch bản test case KHÔNG THỂ tự động hóa (ví dụ: yêu cầu captcha, OTP SMS, thanh toán bên thứ ba...):
   - Liệt kê rõ ràng và giải thích nguyên nhân kỹ thuật tại sao không thể viết kịch bản tự động.

---

### BƯỚC 7: Quay Video Demo (Task 2 - Demo Video)
1. **Yêu cầu kỹ thuật Video**:
   - Thời lượng: **Tối thiểu 5 phút**.
   - Nền tảng: Đăng tải dưới dạng **Unlisted Video** trên YouTube.
   - Ngôn ngữ thuyết minh: **Tiếng Việt**.
2. **Nội dung video cần thể hiện**:
   - Mở giao diện và chạy kịch bản kiểm thử tự động end-to-end trên đa trình duyệt.
   - Mở Báo cáo HTML thu được sau khi chạy để chứng minh kết quả.
   - Giải thích và thuyết minh trực tiếp **ít nhất 1 điểm/lỗi mà bạn đã tự tay chỉnh sửa** sau khi AI sinh code.
3. **Bằng chứng xác thực tác giả (BẮT BUỘC)**:
   - Trong video phải xuất hiện **Face-cam** của bạn HOẶC mở màn hình **Terminal đang chạy lệnh `whoami` và `hostname`**.

---

### BƯỚC 8 (TÙY CHỌN - ĐIỂM CỘNG): Agent Skill (10 Điểm Bonus)
1. Bạn được khuyến khược tạo một **Agent Skill** đóng gói quy trình kiểm thử tự động này (đọc dữ liệu data-driven, sinh script đa trình duyệt, bảo trì script) để tái sử dụng cho các bài tập khác.
2. Nộp thư mục mã nguồn Agent Skill kèm theo **Link video YouTube demo riêng** chứng minh cách bạn áp dụng Agent Skill này cho một tính năng hoàn chỉnh từ đầu đến cuối.

---

### BƯỚC 9: Đánh giá AI Critique & Phụ lục AI Audit Report
1. **AI Critique (BẮT BUỘC - 200 đến 300 từ)**:
   - Viết một đoạn văn phê bình năng lực của AI trong bài tập này.
   - Trả lời các câu hỏi: AI đã làm sai/lệch lạc/thiếu sót ở đâu? Tại sao AI không phát hiện ra lỗi đó? Bạn rút ra bài học/nguyên tắc gì khi hợp tác với AI trong kiểm thử phần mềm?
2. **AI Audit Report (BẮT BUỘC - Phụ lục)**:
   - Bảng nhật ký ghi lại toàn bộ lịch sử prompt và phản hồi từ AI theo đúng template quy định.
   - Khai báo rõ ràng: `"I use AI tools for the following tasks..."` (hoặc `"I do not use any AI help in this exercise."`).

---

## 📋 4. CHECKLIST KIỂM TRA VÀ DANH MỤC FILE NỘP BÀI

### A. Technical & Evidence Checklist (Danh sách kiểm tra bằng chứng)

- [ ] **Lựa chọn tính năng**: Đã chọn đúng 3 tính năng Web từ Pools A, B, C (khớp với HW02).
- [ ] **Số lượng Test Cases**: Tối thiểu 12 test cases cho mỗi tính năng (Tổng $\ge 36$ test cases tích hợp Positive, Negative, Edge cases).
- [ ] **Data-Driven Testing**: Dữ liệu kiểm thử lưu tách biệt trong file `.json` hoặc `.csv` (Không hardcode inline).
- [ ] **Assertions**: Kịch bản sử dụng **ít nhất 3 dạng Assertions** khác nhau.
- [ ] **Thực thi Đa trình duyệt**: Đã chạy thành công trên 3 trình duyệt (Chromium, Firefox, WebKit) $\rightarrow$ Tối thiểu **9 browser runs**.
- [ ] **Báo cáo HTML**: Báo cáo có hiển thị rõ `Run by: {StudentID}` và nhãn thời gian ISO timestamp.
- [ ] **Human Review**: Có phần phân tích khe hở (Gap Analysis) trình bày chi tiết các lỗi AI sinh ra và cách sửa.
- [ ] **Git Commit Log**: Public GitHub Repository có **ít nhất 8 commits** thực sự chỉnh sửa các file script kiểm thử (`.spec.ts` / `.spec.js`). File `git_commit_log.txt` được trích xuất và nộp kèm.
- [ ] **GitHub Issues & Bug Report**: Đã đăng các lỗi tìm được lên GitHub Issues (có kèm ảnh chụp màn hình).
- [ ] **Video Demo**: Video YouTube Unlisted $\ge 5$ phút, thuyết minh tiếng Việt, thể hiện luồng chạy + báo cáo HTML + giải thích lỗi đã sửa + có **Face-cam** hoặc **Terminal `whoami` & `hostname`**.
- [ ] **AI Critique**: Viết đoạn đánh giá phê bình AI đúng dung lượng 200–300 từ.
- [ ] **AI Audit Report**: Đính kèm nhật ký prompt AI chi tiết ở phần phụ lục.
- [ ] **File README.md gốc**: Chứa **Self-Assessment Table (Bảng tự chấm điểm)** và **Test Summary Report**.
- [ ] **Agent Skill (Bonus)**: Nộp thư mục skill + link video demo (nếu có làm).

---

### B. Cấu trúc File Nộp bài & Quy cách Đặt tên (Submission Package)

#### 1. Quy tắc đặt tên file nộp (.zip):
`<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip`  
- `StudentID`: Mã số sinh viên (ví dụ: `25127001`).
- `SelfAssessedGrade`: Điểm tự đánh giá gồm 3 chữ số từ `000` đến `100` (ví dụ: `090` cho 90 điểm).
- **Ví dụ tên file chuẩn**: `25127001_HW04_AI_Automation_090.zip`

#### 2. Cấu trúc thư mục chi tiết bên trong file .zip:
```text
25127001_HW04_AI_Automation_090/
├── README.md                          # Chứa Bảng tự chấm điểm, Test Summary Report & Link Video Demo
├── Main_Report.md                     # Báo cáo chính (Báo cáo tự động hóa + Human Review/Gap Analysis)
├── Main_Report.pdf                    # Báo cáo chính xuất dạng PDF
├── AI_Critique_and_Audit_Report.md    # Báo cáo phê bình AI (200-300 từ) & Phụ lục nhật ký AI Audit
├── AI_Critique_and_Audit_Report.pdf   # Báo cáo phê bình AI & Phụ lục xuất dạng PDF
├── git_commit_log.txt                 # Nhật ký commit Git (File text xuất bằng lệnh: git log --oneline > git_commit_log.txt)
├── links.txt                          # File chứa các liên kết: GitHub Repo, YouTube Demo Video, Agent Skill Video
├── test_data/                         # Thư mục chứa các file dữ liệu kiểm thử (.json hoặc .csv)
│   ├── fr01_register_data.json
│   ├── fr07_cart_data.json
│   └── fr14_category_data.json
├── reports/                           # Thư mục chứa báo cáo HTML xuất ra từ Playwright / Allure
│   ├── chromium_report/
│   ├── firefox_report/
│   └── webkit_report/
├── bug_reports/                       # Thư mục ảnh chụp màn hình các lỗi phát hiện trên SUT (nếu có)
│   ├── issue_01_screenshot.png
│   └── issue_02_screenshot.png
└── agent_skill/                       # (Tùy chọn - Điểm cộng 10đ) Thư mục định nghĩa Agent Skill
    ├── SKILL.md
    └── scripts/
```

---

## 💯 5. BẢNG TỰ ĐÁNH GIÁ ĐIỂM (ASSESSMENT TEMPLATE)

Điền bảng này vào file `README.md` trong gói bài nộp:

| STT | Tiêu chí đánh giá (Criteria) | Điểm tối đa | Điểm tự đánh giá (Self-Assessed Grade) |
| :---: | :--- | :---: | :---: |
| **1** | Task 1 – Feature A Automation (Data-driven, Multi-browser, HTML report, Human review) | 25 | ... / 25 |
| **2** | Task 1 – Feature B Automation (Data-driven, Multi-browser, HTML report, Human review) | 25 | ... / 25 |
| **3** | Task 1 – Feature C Automation (Data-driven, Multi-browser, HTML report, Human review) | 25 | ... / 25 |
| **4** | Task 2 – Demo Video ($\ge 5$ phút, thuyết minh tiếng Việt, bằng chứng tác giả) | 15 | ... / 15 |
| **5** | Agent Skills (Skill reusable + Video demo) *(Bonus)* | 10 | ... / 10 |
| **TỔNG CỘNG** | | **100** | **... / 100** |

---

## 📢 6. BẢO VỆ VẤN ĐÁP (ORAL DEFENSE) & QUY ĐỊNH KHÁC

- **Bảo vệ vấn đáp (30% ngẫu nhiên)**: Khoảng 30% sinh viên ngẫu nhiên sẽ được mời tham gia bảo vệ vấn đáp 5–7 phút trong tuần sau hạn nộp để giải thích kịch bản, cách prompt AI và chứng minh tính thực tế của báo cáo/video.
- **Trừ điểm / Nộp muộn**: Không chấp nhận nộp muộn (Late submission is not permitted). Thiếu bất kỳ tài liệu bắt buộc nào trong file zip sẽ nhận **0 điểm**.
- **Gian lận**: Sao chép kịch bản hoặc prompt giữa các sinh viên sẽ dẫn đến **0 điểm** cho cả hai bên.
