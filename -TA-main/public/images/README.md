# 📸 THƯ MỤC CHỨA ẢNH SINH NHẬT CỦA BẠN (LOCAL IMAGES)

Khi bạn tải mã nguồn website này về máy tính, bạn có thể dễ dàng thay toàn bộ ảnh mặc định bằng ảnh thật của bạn theo hướng dẫn dưới đây:

### 1. Thêm ảnh vào thư mục này:
- **Ảnh đại diện trang đăng nhập**: Đặt tên file là `avatar.jpg` (hoặc `avatar.png`)
- **Ảnh kỷ niệm trong Album (16 ảnh)**: Đặt tên file là:
  - `photo1.jpg`
  - `photo2.jpg`
  - `photo3.jpg`
  - `photo4.jpg`
  - ... đến `photo16.jpg`

### 2. Cách đổi đường dẫn trong file code:
Mở file: `src/data/defaultBirthdayData.ts`
Chỉ cần thay:
- `loginPhoto: '/images/avatar.jpg'`
- `url: '/images/photo1.jpg'`, `url: '/images/photo2.jpg'`, ...

Hoặc bạn có thể dán trực tiếp bất kỳ đường link ảnh online nào bạn thích!
Ngoài ra bạn cũng có thể bấm nút **"Chỉnh sửa quà tặng" (Shift + S)** trực tiếp trên giao diện web để tải ảnh lên từ máy tính.
