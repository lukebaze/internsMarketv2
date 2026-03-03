# EPIC 1: UX/UI DESIGN & USER JOURNEY
**Muc tieu:** Toi uu hoa diem cham, dam bao End-user (Non-dev) thao tac muot ma nhat.

## Ticket 1.1: Re-design Onboarding Flow
**User Story:** La mot nguoi dung moi (khong biet code), toi muon trai qua mot luong dang ky va tim hieu san pham don gian de co the nhanh chong su dung Intern Agent.

**Acceptance Criteria (AC):**
- [ ] Hoan thien UI/UX luong Sign-up/Login.
- [ ] Co man hinh gioi thieu (Walkthrough/Tooltip) ngan gon ve cach van hanh Clawbot.
- [ ] Luong tu luc mo app den khi vao Dashboard toi da 3-4 steps.

## Ticket 1.2: Design Management Dashboard & Instant Deploy Interface
**User Story:** La mot nguoi dung, toi muon co mot Dashboard truc quan de theo doi trang thai va kich hoat Clawbot chi bang 1 nut bam.

**Acceptance Criteria (AC):**
- [ ] Hoan thien UI Dashboard quan ly danh sach Agent da thue.
- [ ] Nut "Deploy" hoac "Start/Stop" duoc thiet ke noi bat, ro rang.
- [ ] Co khu vuc hien thi trang thai bot (Active/Idle/Error) va thong so co ban.

---

# EPIC 2: BACKEND ARCHITECTURE & INFRASTRUCTURE
**Muc tieu:** Chuan bi nen tang loi vung chac cho MVP.

## Ticket 2.1: Re-build Backend Architecture
**User Story:** La mot he thong, backend can duoc tai cau truc de xu ly muot ma luong request tang cao va ho tro viec tu dong hoa (automation) khi deploy bot.

**Acceptance Criteria (AC):**
- [ ] Hoan thien tai lieu so do kien truc he thong moi.
- [ ] Setup thanh cong moi truong Database (Users, Transactions, Bot status, Skill sets).
- [ ] Xay dung luong logic de giao tiep muot ma voi server chay Clawbot.

---

# EPIC 3: CORE MVP FEATURES (DEVELOPMENT)
**Muc tieu:** Code cac tinh nang thiet yeu khep kin luong nguoi dung.

## Ticket 3.1: Develop "Rent Intern Agent" Flow & Payment Integration
**User Story:** La mot nguoi dung, toi muon chon mot Intern Agent phu hop (dua tren skill sets) va tien hanh thanh toan an toan.

**Acceptance Criteria (AC):**
- [ ] He thong goi API hien thi dung danh sach va thong tin Agent/Skill sets (tu data cua Tiger).
- [ ] Tich hop thanh cong module thanh toan (Payment Gateway).
- [ ] Xu ly logic cap nhat trang thai "Da thanh toan" va cap quyen so huu bot cho user trong Database.

## Ticket 3.2: Develop Instant Deploy Mechanism & Dashboard Logic
**User Story:** La mot nguoi dung non-dev, sau khi thue xong, toi muon an mot nut de bot tu dong chay (Instant Deploy) ma khong can cau hinh server hay go lenh.

**Acceptance Criteria (AC):**
- [ ] API xu ly lenh "Deploy": Tu dong kich hoat instance cua Clawbot tuong ung voi user.
- [ ] Thoi gian tu luc bam nut den luc bot chuyen trang thai "Active" duoi 2 phut.
- [ ] Giao dien Dashboard nhan duoc tin hieu Real-time (hoac polling) tu Backend de hien thi dung tinh trang hien tai cua bot.
