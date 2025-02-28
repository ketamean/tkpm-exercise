# I. Các Loại Code Coverage Quan Trọng
## Line Coverage (Độ bao phủ dòng lệnh)
* Đo lường tỷ lệ các dòng code đã được thực thi trong quá trình chạy unit test.
* Giúp đảm bảo rằng mọi dòng code đều được kiểm tra ít nhất một lần.

## Branch Coverage (Độ bao phủ nhánh)
* Kiểm tra xem tất cả các nhánh rẽ (ví dụ: `if`, `else`, `switch`) trong code có được thực thi hay không.
* Đảm bảo rằng tất cả các trường hợp có thể xảy ra của luồng điều khiển đều được kiểm tra.

## Function Coverage (Độ bao phủ hàm)
* Xác minh rằng tất cả các hàm hoặc phương thức trong code đã được gọi ít nhất một lần.
* Giúp đảm bảo rằng tất cả các đơn vị chức năng đều được kiểm tra.

## Path Coverage (Độ bao phủ đường dẫn)
* Kiểm tra tất cả các đường dẫn thực thi có thể có của code.
* Đảm bảo rằng tất cả các luồng logic phức tạp đều được kiểm tra.

# II. Mức Coverage Tối Thiểu
* Không có một con số cụ thể nào áp dụng cho tất cả các dự án, nhưng một mức coverage hợp lý thường nằm trong khoảng 70-85%.
* Quan trọng hơn con số là việc đảm bảo rằng các logic quan trọng, các trường hợp biên (edge cases) và các luồng xử lý lỗi đều được kiểm tra kỹ lưỡng.
* Các hệ thống quan trọng (ví dụ: hệ thống tài chính, y tế) thường yêu cầu mức coverage cao hơn.
* Việc đạt được 100% Code coverage là điều khó khăn và không cần thiết, nó sẽ tốn rất nhiều thời gian, và chi phí.

# III. Best Practices Khi Viết Unit Test
## Tính độc lập

* Unit test nên độc lập với nhau và không phụ thuộc vào thứ tự thực thi.
* Sử dụng mock hoặc stub để thay thế các phụ thuộc bên ngoài (ví dụ: database, API).

## Tính dễ đọc và dễ bảo trì
* Viết test code rõ ràng, dễ hiểu và dễ bảo trì.
* Tránh viết test quá phức tạp hoặc quá phụ thuộc vào chi tiết triển khai.

## Kiểm tra các trường hợp
* Đảm bảo kiểm tra cả các trường hợp thành công (happy path) và các trường hợp lỗi (edge cases, invalid input).
* Tập trung vào việc kiểm tra các hành vi của code chứ không phải chi tiết triển khai.

## Tránh trùng lặp
* Tránh viết các test case trùng lặp hoặc quá tương tự nhau.
* Tái sử dụng các hàm hỗ trợ hoặc các test fixture khi cần thiết.
* Sử dụng các framework hỗ trợ test: có các framework hỗ trợ testing như jest,...

# IV. Đánh giá
- Các test cases code hiện có được viết trên BackEnd/models: `/faculty` và `\student` (program và status hiện tại không khác gì faculty: chỉ gồm id và name; các business rules trong models cũng tương tự, chỉ khác ở controller).
- BackEnd/models xử lý một phần của business logic như là verify định dạng của email, phone number,... Còn BackEnd/controllers xử lý các business logic khác $\Rightarrow$ Dẫn đến khó test do bị phân mảnh.
- Ngoài những trở ngại nhỏ như trên, do ngay từ đầu đã theo MVC nên phân chia các modules tương đối rõ ràng.
- Chưa biết cách test trên UI bằng code (đã test bằng tay với các test case cho BackEnd/models).
- Đối với các hàm handle onsubmit, onclick do được lồng hẳn vào react component nên hiện chưa có code test mà phải test qua UI. Việc dời các handler ra /utils sẽ làm code bị rời rạc, khó quản lý. Tuy nhiên trong Ex4 sẽ tìm cách để xử lý vấn đề này. Việc tách ra này cũng có thể hỗ trợ trong việc test controllers và routers.