# Tìm hiểu
- SRP: mỗi module, hàm,... chỉ đảm nhiệm một chức năng chính
- DRY: một chức năng không nên được implement ở nhiều đoạn code khác nhau => khó bảo trì (sửa 1 cái phải tìm nhiều cái khác để sửa)

# Refactor
## FE
- Tách axios instance ra ngoài cùng với base url để tiện chỉnh sửa (áp dụng DRY)
- Tách các hàm handle các submit, fetch của các component ra ngoài file riêng trong một page (thành các file handler.ts)
- Trong quá trình tách các handler, phát hiện ra một số hàm bị gọi trùng chức năng (chẳng hạn như Blob download file,...). Các hàm này đã được tách ra (SRP)
- Thêm các utils outputHTML, outputMD, outputPDF: các utils này hiện hỗ trợ cho việc xuất giấy xác nhận tình trạng sinh viên, sẽ nhận content và parse thành nội dung theo template được cung cấp. Các hàm được viết abstract nhất có thể để có thể táí sử dụng (input là content dạng object `{key:value}` và template dạng `string`; các field cần được điền được denoted bởi `{{key}}`)
## BE
- `controllers/studentsController` (`get` và `post`) tách nhỏ thành các hàm con rồi gọi (SRP + DRY)

# Chức năng hoàn thành
Mọi chức năng được yêu cầu trong Ex03_04 (cả FE và BE)