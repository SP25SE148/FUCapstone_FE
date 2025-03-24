export interface NewsItem {
  id: string
  title: string
  date: string
  content: string
  image: string
}

export const data: NewsItem[] = [
  {
    id: "1",
    title: "Thông báo đăng ký tìm nhóm/thành viên kỳ SP25",
    date: "2025-04-13",
    content: `
          <h2>Thông báo đăng ký tìm nhóm/thành viên kỳ SP25</h2>
          <p>Nhằm hỗ trợ sinh viên hoàn thành các dự án môn học trong kỳ học SP25, Đại học FPT chính thức mở cổng đăng ký tìm nhóm/thành viên. Đây là cơ hội để sinh viên dễ dàng kết nối với các bạn cùng chí hướng, cùng nhau hoàn thành mục tiêu học tập một cách hiệu quả.</p>
          <h3>Hướng dẫn đăng ký</h3>
          <ol>
            <li>Truy cập vào <a href="https://hethong.fpt.edu.vn" target="_blank">hệ thống online</a>.</li>
            <li>Đăng nhập bằng tài khoản sinh viên được cấp.</li>
            <li>Điền thông tin cá nhân, bao gồm tên, mã số sinh viên, và thông tin liên hệ.</li>
            <li>Lựa chọn trạng thái <strong>"Cần tìm nhóm"</strong> nếu chưa có nhóm, hoặc <strong>"Cần tìm thành viên"</strong> nếu nhóm bạn đang thiếu thành viên.</li>
          </ol>
          <p><em>Lưu ý:</em> Thời gian đăng ký sẽ kéo dài từ ngày 15/04/2025 đến hết ngày 25/04/2025. Sau thời gian này, hệ thống sẽ đóng và không chấp nhận đăng ký bổ sung.</p>
          <h3>Quyền lợi khi đăng ký</h3>
          <ul>
            <li>Được hỗ trợ bởi đội ngũ tư vấn để tìm nhóm phù hợp nhất.</li>
            <li>Cơ hội giao lưu, kết nối với bạn bè mới.</li>
            <li>Tiếp cận nguồn tài liệu và sự hướng dẫn từ nhà trường.</li>
          </ul>
          <p>Đừng bỏ lỡ cơ hội này, hãy nhanh chóng đăng ký để hoàn thành kỳ học SP25 một cách thành công!</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/DSC06698-1024x576.avif",
  },
  {
    id: "2",
    title: "Lịch nghỉ lễ Giỗ Tổ Hùng Vương, 30/4 và 1/5",
    date: "2025-04-14",
    content: `
          <h2>Lịch nghỉ lễ Giỗ Tổ Hùng Vương, 30/4 và 1/5</h2>
          <p>Trường Đại học FPT thông báo đến toàn thể sinh viên, giảng viên và cán bộ nhân viên về lịch nghỉ lễ Giỗ Tổ Hùng Vương, Ngày Giải phóng miền Nam 30/4 và Quốc tế Lao động 1/5. Đây là dịp quan trọng để chúng ta tưởng nhớ công lao to lớn của các vị vua Hùng cũng như chào mừng những thành tựu lịch sử của dân tộc.</p>
          <h3>Chi tiết lịch nghỉ</h3>
          <ul>
            <li><strong>Giỗ Tổ Hùng Vương:</strong> Thứ Bảy, ngày 27/04/2025.</li>
            <li><strong>Ngày Giải phóng miền Nam:</strong> Nghỉ từ ngày 30/04/2025.</li>
            <li><strong>Ngày Quốc tế Lao động:</strong> Nghỉ đến hết ngày 01/05/2025.</li>
          </ul>
          <h3>Những lưu ý</h3>
          <p>Trong thời gian nghỉ lễ, sinh viên cần chú ý:</p>
          <ul>
            <li>Tuân thủ các quy định an toàn giao thông khi về quê hoặc đi du lịch.</li>
            <li>Không quên hoàn thành các bài tập, dự án môn học có thời hạn giao nộp gần.</li>
            <li>Quay lại trường đầy đủ vào ngày 02/05/2025 để đảm bảo tiến độ học tập.</li>
          </ul>
          <p>Chúc toàn thể sinh viên và cán bộ nhân viên một kỳ nghỉ lễ an lành, vui vẻ và ý nghĩa!</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/DSC066672-2048x1152.avif"
  },
  {
    id: "3",
    title: "Chương trình định hướng tân sinh viên khóa 2025",
    date: "2025-04-15",
    content: `
          <h2>Chương trình định hướng tân sinh viên khóa 2025</h2>
          <p>Để chào đón tân sinh viên khóa 2025, Đại học FPT tổ chức chương trình định hướng kéo dài 3 ngày với nhiều nội dung thú vị. Đây là dịp để các bạn sinh viên mới làm quen với môi trường học tập, gặp gỡ thầy cô và bạn bè, cũng như tìm hiểu về văn hóa của Đại học FPT.</p>
          <h3>Thông tin chi tiết</h3>
          <ul>
            <li><strong>Thời gian:</strong> Từ ngày 05/05/2025 đến 07/05/2025.</li>
            <li><strong>Địa điểm:</strong> Hội trường lớn, khuôn viên chính Đại học FPT.</li>
          </ul>
          <h3>Nội dung chính</h3>
          <ul>
            <li>Giới thiệu về lịch sử, sứ mệnh và giá trị cốt lõi của Đại học FPT.</li>
            <li>Hướng dẫn sử dụng hệ thống quản lý học tập trực tuyến (LMS).</li>
            <li>Giao lưu văn hóa và hoạt động nhóm nhằm xây dựng tình đoàn kết.</li>
            <li>Tham quan các phòng ban, thư viện và khu vực giải trí.</li>
          </ul>
          <p>Hãy chuẩn bị tinh thần để bước vào một hành trình học tập mới đầy hứng khởi tại Đại học FPT!</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/473570005_1075162927744915_8531605701161055600_n.avif"
  },
  {
    id: "4",
    title: "FPT Edu Hackathon 2025 chính thức khởi động",
    date: "2025-04-16",
    content: `
          <h2>FPT Edu Hackathon 2025 chính thức khởi động</h2>
          <p>Cuộc thi lập trình thường niên lớn nhất trong hệ thống FPT Education - FPT Edu Hackathon 2025 - đã chính thức khởi động. Đây là sân chơi để các bạn trẻ đam mê công nghệ thử sức với những bài toán thực tế, sáng tạo những giải pháp hữu ích và tiếp cận với cộng đồng công nghệ hàng đầu tại Việt Nam.</p>
          <h3>Chủ đề năm nay</h3>
          <p>Chủ đề năm nay xoay quanh việc sử dụng trí tuệ nhân tạo (AI) để giải quyết các vấn đề xã hội. Các đội thi sẽ phát triển những ứng dụng mang tính thực tiễn, đóng góp vào các lĩnh vực như y tế, giáo dục, môi trường và giao thông.</p>
          <h3>Lịch trình cuộc thi</h3>
          <ul>
            <li><strong>Vòng đăng ký:</strong> 20/04/2025 - 30/04/2025.</li>
            <li><strong>Vòng sơ loại:</strong> 01/05/2025 - 15/05/2025.</li>
            <li><strong>Vòng chung kết:</strong> 20/05/2025 tại cơ sở Hòa Lạc, Đại học FPT.</li>
          </ul>
          <h3>Giải thưởng</h3>
          <p>Tổng giá trị giải thưởng lên đến 200 triệu đồng, bao gồm:</p>
          <ul>
            <li>Giải Nhất: 100 triệu đồng.</li>
            <li>Giải Nhì: 50 triệu đồng.</li>
            <li>Giải Ba: 30 triệu đồng.</li>
            <li>Giải thưởng phụ: 20 triệu đồng.</li>
          </ul>
          <p>Hãy sẵn sàng để chứng tỏ khả năng sáng tạo và tinh thần đổi mới của bạn tại FPT Edu Hackathon 2025!</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/anh-1-7149-7421-6189-5382.jpeg-768x432.avif"
  },
  {
    id: "5",
    title: "Công bố danh sách sinh viên đạt học bổng kỳ SP25",
    date: "2025-04-17",
    content: `
          <h2>Công bố danh sách sinh viên đạt học bổng kỳ SP25</h2>
          <p>Đại học FPT vừa chính thức công bố danh sách sinh viên nhận học bổng kỳ học SP25. Đây là sự ghi nhận xứng đáng cho những nỗ lực học tập và đóng góp tích cực của các bạn trong cộng đồng sinh viên.</p>
          <h3>Tiêu chí xét học bổng</h3>
          <p>Học bổng kỳ SP25 được xét dựa trên các tiêu chí:</p>
          <ul>
            <li>Điểm GPA từ 3.5 trở lên.</li>
            <li>Tham gia tích cực vào các hoạt động ngoại khóa và đóng góp cộng đồng.</li>
            <li>Đạt giải thưởng trong các cuộc thi học thuật hoặc sáng tạo.</li>
          </ul>
          <h3>Danh sách học bổng</h3>
          <p>Danh sách chi tiết sinh viên nhận học bổng được đăng tải trên hệ thống quản lý học tập <a href="https://lms.fpt.edu.vn" target="_blank">LMS</a>. Sinh viên có thể đăng nhập để kiểm tra thông tin.</p>
          <h3>Lễ trao học bổng</h3>
          <ul>
            <li><strong>Thời gian:</strong> 25/04/2025.</li>
            <li><strong>Địa điểm:</strong> Hội trường lớn, Đại học FPT.</li>
          </ul>
          <p>Chúc mừng tất cả các bạn đã đạt được thành tích xuất sắc này!</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/Picture1-1737178819-8506-1737178945.avif"
  },
  {
    id: "6",
    title: "Khám phá cơ hội thực tập tại doanh nghiệp Nhật Bản",
    date: "2025-04-18",
    content: `
          <h2>Khám phá cơ hội thực tập tại doanh nghiệp Nhật Bản</h2>
          <p>Với mong muốn mang đến cơ hội trải nghiệm thực tế và phát triển kỹ năng làm việc trong môi trường quốc tế, Đại học FPT phối hợp cùng các đối tác Nhật Bản tổ chức chương trình thực tập kéo dài 6 tháng dành cho sinh viên năm cuối.</p>
          <h3>Đối tượng tham gia</h3>
          <ul>
            <li>Sinh viên năm cuối chuyên ngành Công nghệ thông tin, Kinh doanh quốc tế và Ngôn ngữ Nhật.</li>
            <li>Điểm trung bình tích lũy từ 3.0 trở lên.</li>
            <li>Có khả năng giao tiếp cơ bản bằng tiếng Nhật (N4 trở lên).</li>
          </ul>
          <h3>Lợi ích chương trình</h3>
          <ul>
            <li>Thực tập tại các công ty hàng đầu Nhật Bản.</li>
            <li>Học hỏi kỹ năng làm việc chuyên nghiệp trong môi trường quốc tế.</li>
            <li>Nhận trợ cấp thực tập từ 20.000 - 30.000 Yên/tháng.</li>
            <li>Cơ hội được tuyển dụng chính thức sau thực tập.</li>
          </ul>
          <p>Hạn đăng ký: 30/04/2025. Sinh viên quan tâm vui lòng gửi hồ sơ về email: <a href="mailto:internship@fpt.edu.vn">internship@fpt.edu.vn</a>.</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/473749584_122134099964474258_5292145693106734610_n.avif"
  },
  {
    id: "7",
    title: "Workshop: Làm chủ kỹ năng thuyết trình trước đám đông",
    date: "2025-04-19",
    content: `
          <h2>Workshop: Làm chủ kỹ năng thuyết trình trước đám đông</h2>
          <p>Thuyết trình là một trong những kỹ năng quan trọng trong học tập và làm việc. Để giúp sinh viên tự tin hơn khi trình bày ý tưởng, Đại học FPT tổ chức workshop chuyên sâu về kỹ năng thuyết trình.</p>
          <h3>Thông tin chi tiết</h3>
          <ul>
            <li><strong>Thời gian:</strong> 10h00 - 12h00, ngày 22/04/2025.</li>
            <li><strong>Địa điểm:</strong> Phòng hội thảo, tầng 2, tòa nhà Alpha.</li>
            <li><strong>Diễn giả:</strong> Anh Nguyễn Văn A, chuyên gia đào tạo kỹ năng mềm.</li>
          </ul>
          <h3>Nội dung chính</h3>
          <ul>
            <li>Nguyên tắc vàng để trình bày ấn tượng.</li>
            <li>Cách sử dụng ngôn ngữ cơ thể hiệu quả.</li>
            <li>Xử lý câu hỏi khó từ khán giả.</li>
          </ul>
          <p>Số lượng chỗ ngồi có hạn, đăng ký ngay tại quầy lễ tân hoặc qua email <a href="mailto:workshop@fpt.edu.vn">workshop@fpt.edu.vn</a>.</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/Truong-Dai-hoc-FPT-la-mot-trong-nhung-don-vi-tien-phong-dua-vo-Vovinam-vao-chuong-trinh-hoc-the-chat-chinh-khoa-1024x685.avif"
  },
  {
    id: "8",
    title: "Khai mạc giải bóng đá FPT Cup 2025",
    date: "2025-04-20",
    content: `
          <h2>Khai mạc giải bóng đá FPT Cup 2025</h2>
          <p>Giải bóng đá sinh viên FPT Cup 2025 đã chính thức khai mạc vào ngày 20/04/2025 tại sân vận động Hòa Lạc. Đây là giải đấu thường niên nhằm tăng cường tinh thần đoàn kết và tạo sân chơi thể thao bổ ích cho các bạn sinh viên trong toàn trường.</p>
          <h3>Thành phần tham gia</h3>
          <p>Giải đấu năm nay thu hút 16 đội bóng đại diện cho các khoa và câu lạc bộ thể thao trong trường. Các đội được chia làm 4 bảng, thi đấu theo thể thức vòng tròn tính điểm để chọn ra 8 đội vào vòng knock-out.</p>
          <h3>Lịch trình giải đấu</h3>
          <ul>
            <li><strong>Vòng bảng:</strong> 20/04 - 27/04/2025.</li>
            <li><strong>Tứ kết:</strong> 29/04/2025.</li>
            <li><strong>Bán kết:</strong> 02/05/2025.</li>
            <li><strong>Chung kết:</strong> 05/05/2025.</li>
          </ul>
          <h3>Giải thưởng hấp dẫn</h3>
          <p>Tổng giá trị giải thưởng lên đến 50 triệu đồng, bao gồm:</p>
          <ul>
            <li>Giải Nhất: 20 triệu đồng + cúp vô địch.</li>
            <li>Giải Nhì: 15 triệu đồng.</li>
            <li>Giải Ba: 10 triệu đồng.</li>
            <li>Các giải cá nhân: Vua phá lưới, Thủ môn xuất sắc nhất.</li>
          </ul>
          <p>Hãy cùng cổ vũ cho các đội bóng và hòa mình vào không khí sôi động của FPT Cup 2025!</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/473815877_1012252167600442_4510454983167684123_n-1-1024x683.avif"
  },
  {
    id: "9",
    title: "FPT University Alumni Day 2025 - Ngày hội ngộ cựu sinh viên",
    date: "2025-04-21",
    content: `
          <h2>FPT University Alumni Day 2025 - Ngày hội ngộ cựu sinh viên</h2>
          <p>Ngày hội Alumni Day 2025, sự kiện thường niên của cộng đồng cựu sinh viên Đại học FPT, sẽ được tổ chức vào ngày 25/04/2025 tại cơ sở Hòa Lạc. Đây là dịp để các thế hệ sinh viên trở về trường, gặp gỡ bạn bè, thầy cô và cùng nhìn lại chặng đường đã qua.</p>
          <h3>Chương trình chính</h3>
          <ul>
            <li>Gặp gỡ và giao lưu giữa các thế hệ sinh viên.</li>
            <li>Chia sẻ câu chuyện thành công từ các cựu sinh viên.</li>
            <li>Tri ân thầy cô và các nhà tài trợ.</li>
            <li>Tiệc tối và chương trình văn nghệ đặc sắc.</li>
          </ul>
          <h3>Đăng ký tham dự</h3>
          <p>Cựu sinh viên có thể đăng ký tham dự sự kiện qua link: <a href="https://alumni.fpt.edu.vn" target="_blank">alumni.fpt.edu.vn</a>. Thời hạn đăng ký đến hết ngày 23/04/2025.</p>
          <p>Đừng bỏ lỡ cơ hội tái ngộ và mở rộng mạng lưới kết nối cùng FPT University Alumni Day 2025!</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/hoi-xuan-2025_019-1024x683.avif"
  },
  {
    id: "10",
    title: "Hội chợ việc làm FPT 2025 - Cầu nối sinh viên và doanh nghiệp",
    date: "2025-04-22",
    content: `
          <h2>Hội chợ việc làm FPT 2025 - Cầu nối sinh viên và doanh nghiệp</h2>
          <p>Hội chợ việc làm FPT 2025 sẽ diễn ra vào ngày 30/04/2025 tại khuôn viên Đại học FPT Hòa Lạc. Đây là sự kiện thường niên được tổ chức nhằm kết nối sinh viên với các doanh nghiệp hàng đầu, mang đến cơ hội nghề nghiệp đa dạng cho các bạn trẻ.</p>
          <h3>Hoạt động tại sự kiện</h3>
          <ul>
            <li>Gian hàng tuyển dụng của hơn 50 doanh nghiệp trong các lĩnh vực Công nghệ thông tin, Marketing, Kế toán và nhiều ngành khác.</li>
            <li>Phỏng vấn trực tiếp với nhà tuyển dụng.</li>
            <li>Hội thảo chia sẻ kinh nghiệm tìm việc và xây dựng sự nghiệp.</li>
            <li>Chụp ảnh CV miễn phí và chỉnh sửa CV chuyên nghiệp.</li>
          </ul>
          <h3>Đối tượng tham gia</h3>
          <p>Sinh viên năm cuối và cựu sinh viên Đại học FPT, cũng như các bạn trẻ đang tìm kiếm cơ hội phát triển sự nghiệp.</p>
          <h3>Đăng ký</h3>
          <p>Vui lòng đăng ký tham gia tại link: <a href="https://careerfair.fpt.edu.vn" target="_blank">careerfair.fpt.edu.vn</a>. Thời hạn đăng ký: 28/04/2025.</p>
          <p>Hội chợ việc làm FPT 2025 hứa hẹn sẽ là một sự kiện đáng nhớ, giúp các bạn sinh viên tiến gần hơn đến ước mơ sự nghiệp của mình!</p>
        `,
    image: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/10/dai-hoc-fpt-16-9-768x512.webp"
  }
];