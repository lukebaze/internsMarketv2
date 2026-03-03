# 🟢 EPIC 1: UX/UI DESIGN & USER JOURNEY
**Mục tiêu:** Tối ưu hóa điểm chạm, đảm bảo End-user (Non-dev) thao tác mượt mà nhất.

## Ticket 1.1: Re-design Onboarding Flow
**User Story:** Là một người dùng mới (không biết code), tôi muốn trải qua một luồng đăng ký và tìm hiểu sản phẩm đơn giản để có thể nhanh chóng sử dụng Intern Agent.

**Acceptance Criteria (AC):**
- [ ] Hoàn thiện UI/UX luồng Sign-up/Login.
- [ ] Có màn hình giới thiệu (Walkthrough/Tooltip) ngắn gọn về cách vận hành Clawbot.
- [ ] Luồng từ lúc mở app đến khi vào Dashboard tối đa 3-4 steps.

## Ticket 1.2: Design Management Dashboard & Instant Deploy Interface
**User Story:** Là một người dùng, tôi muốn có một Dashboard trực quan để theo dõi trạng thái và kích hoạt Clawbot chỉ bằng 1 nút bấm.

**Acceptance Criteria (AC):**
- [ ] Hoàn thiện UI Dashboard quản lý danh sách Agent đã thuê.
- [ ] Nút "Deploy" hoặc "Start/Stop" được thiết kế nổi bật, rõ ràng.
- [ ] Có khu vực hiển thị trạng thái bot (Active/Idle/Error) và thông số cơ bản.

---

# 🔵 EPIC 2: BACKEND ARCHITECTURE & INFRASTRUCTURE
**Mục tiêu:** Chuẩn bị nền tảng lõi vững chắc cho MVP.

## Ticket 2.1: Re-build Backend Architecture
**User Story:** Là một hệ thống, backend cần được tái cấu trúc để xử lý mượt mà lượng request tăng cao và hỗ trợ việc tự động hóa (automation) khi deploy bot.

**Acceptance Criteria (AC):**
- [ ] Hoàn thiện tài liệu sơ đồ kiến trúc hệ thống mới.
- [ ] Setup thành công môi trường Database (Users, Transactions, Bot status, Skill sets).
- [ ] Xây dựng luồng logic để giao tiếp mượt mà với server chạy Clawbot.

---

# 🔴 EPIC 3: CORE MVP FEATURES (DEVELOPMENT)
**Mục tiêu:** Code các tính năng thiết yếu khép kín luồng người dùng.

## Ticket 3.1: Develop "Rent Intern Agent" Flow & Payment Integration
**User Story:** Là một người dùng, tôi muốn chọn một Intern Agent phù hợp (dựa trên skill sets) và tiến hành thanh toán an toàn.

**Acceptance Criteria (AC):**
- [ ] Hệ thống gọi API hiển thị đúng danh sách và thông tin Agent/Skill sets (từ data của Tiger).
- [ ] Tích hợp thành công module thanh toán (Payment Gateway).
- [ ] Xử lý logic cập nhật trạng thái "Đã thanh toán" và cấp quyền sở hữu bot cho user trong Database.

## Ticket 3.2: Develop Instant Deploy Mechanism & Dashboard Logic
**User Story:** Là một người dùng non-dev, sau khi thuê xong, tôi muốn ấn một nút để bot tự động chạy (Instant Deploy) mà không cần cấu hình server hay gõ lệnh.

**Acceptance Criteria (AC):**
- [ ] API xử lý lệnh "Deploy": Tự động kích hoạt instance của Clawbot tương ứng với user.
- [ ] Thời gian từ lúc bấm nút đến lúc bot chuyển trạng thái "Active" dưới 2 phút.
- [ ] Giao diện Dashboard nhận được tín hiệu Real-time (hoặc polling) từ Backend để hiển thị đúng tình trạng hiện tại của bot.
