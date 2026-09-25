# Triển khai Hello Calculator lên GitHub Pages

## 1. Tạo repository

Gợi ý tên repository:

`hello-calculator-mvp-v1`

Tạo repository trên GitHub. Với GitHub Free, dùng repository **Public** nếu muốn dùng GitHub Pages theo cách đơn giản nhất.

## 2. Đưa source lên GitHub bằng Git

Trong Terminal tại thư mục project:

```bash
git init
git add .
git commit -m "Initial Hello Calculator MVP v1.0"
git branch -M main
git remote add origin https://github.com/USERNAME/hello-calculator-mvp-v1.git
git push -u origin main
```

Thay `USERNAME` bằng GitHub username thật.

## 3. Bật GitHub Pages

Trong repository trên GitHub:

1. Mở **Settings**.
2. Ở menu bên trái, chọn **Pages**.
3. Trong **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
4. Nhấn **Save**.

Repository đã có `index.html` ở root và file `.nojekyll`, phù hợp để publish trực tiếp.

## 4. Mở website online

Sau khi deploy thành công, vào:

**Settings → Pages → Visit site**

URL thường có dạng:

`https://USERNAME.github.io/hello-calculator-mvp-v1/`

## 5. Kiểm thử online

- Mở URL bằng máy tính.
- Mở URL bằng điện thoại qua 4G/5G hoặc Wi‑Fi khác để xác nhận truy cập Internet thật.
- Chạy lại các test trong `docs/TEST_CASES.md`.
- Mở DevTools → Console và xác nhận không có lỗi JavaScript.
- DevTools → Toggle device toolbar → kiểm tra viewport 320, 375, 768 px.

## 6. Cập nhật phiên bản sau

```bash
git add .
git commit -m "Improve calculator UI"
git push
```

GitHub Pages sẽ tự triển khai lại từ branch `main`.
