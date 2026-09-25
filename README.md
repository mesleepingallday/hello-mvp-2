# Hello Calculator MVP v1.0

Một Web App calculator nhỏ phục vụ giảng dạy các khái niệm nền tảng:

**HTML → CSS → JavaScript → DOM → Event → State → Render → Test**

## Chức năng MVP

- Số `0–9`
- Dấu thập phân `.`
- `+`, `−`, `×`, `÷`
- `=`
- `C` để reset
- `⌫` để xóa ký tự cuối
- Xử lý chia cho 0 → `Error`
- Responsive từ viewport khoảng 320 px
- Keyboard: `0–9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Escape`
- Developer / Learning Panel hiển thị Event và State

## Cấu trúc source

```text
hello-calculator-mvp-v1.0/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── calculator.js
├── docs/
│   ├── DEPLOY_GITHUB_PAGES.md
│   └── TEST_CASES.md
├── tests/
│   └── model_test.mjs
├── .nojekyll
├── .gitignore
└── README.md
```

## Chạy local

Không cần cài package.

### Python

```bash
cd hello-calculator-mvp-v1.0
python3 -m http.server 8080
```

Mở: `http://localhost:8080`

### VS Code Live Server

Mở `index.html` → **Open with Live Server**.

## Test

Test thủ công: xem `docs/TEST_CASES.md`.

Unit test logic (không cần package):

```bash
node tests/model_test.mjs
```

Sau khi deploy, chạy thêm bộ test browser thủ công trong `docs/TEST_CASES.md`.

## GitHub Pages

Xem hướng dẫn chi tiết: `docs/DEPLOY_GITHUB_PAGES.md`.

## 25/09/2026 HUST

Phím tắt mở terminal trong VSCode: Ctrl + ~
unsaved
