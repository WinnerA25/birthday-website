import { BirthdayConfig } from '../types.ts';

/**
 * ============================================================================
 * 📸 HƯỚNG DẪN THAY ĐỔI ĐƯỜNG DẪN ẢNH KHI TẢI CODE VỀ MÁY:
 * ============================================================================
 * Cách 1: Thay bằng ảnh cá nhân trong máy tính (Khuyên dùng khi chạy local):
 *   - Bỏ ảnh của bạn vào thư mục: "public/images/"
 *   - Đặt ảnh đại diện: avatar.jpg -> chỉ cần đổi url thành: '/images/avatar.jpg'
 *   - Đặt 16 ảnh album: photo1.jpg, photo2.jpg,... -> chỉ cần đổi thành: '/images/photo1.jpg'
 *
 * Cách 2: Thay bằng link ảnh Online (Google Drive direct link, Facebook, Imgur, v.v.):
 *   - Dán trực tiếp đường link ảnh vào trường `url` bên dưới.
 * ============================================================================
 */

export const DEFAULT_BIRTHDAY_DATA: BirthdayConfig = {
  // Tên người nhận sinh nhật
  recipientName: 'Thúy An',
  nickName: 'Thúy An',
  birthDate: '2006-10-25', // Ngày sinh mặc định: 25/10/2006 (Định dạng YYYY-MM-DD)

  // ẢNH ĐẠI DIỆN TRANG ĐĂNG NHẬP:
  // Khi tải về máy, bạn chỉ cần sửa thành: '/images/avatar.jpg' (nếu bỏ ảnh vào public/images/avatar.jpg)
  loginPhoto: '/images/avatar.jpg',
  loginHint: '',

  senderName: 'Người Luôn Yêu & Ở Cạnh Em ❤️',
  cakeMessage: 'Happy Birthday, Thúy An!',
  letterTitle: 'Gửi Thúy An - Người Con Gái Tuyệt Vời Nhất Của Anh',
  letterSalutation: 'Thúy An yêu dấu của anh,',
  letterBody: [
    'Hôm nay là một ngày vô cùng đặc biệt — ngày mà cả thế giới này được chào đón Thúy An xinh đẹp xuất hiện, mang theo nụ cười toả nắng và sự dịu dàng làm tan chảy trái tim anh.',
    'Cảm ơn Thúy An vì đã đến bên anh, vì những khoảnh khắc cùng nhau cười đùa, những lúc lắng nghe nhau tâm sự và cả những điều giản đơn nhưng ấm áp vô cùng.',
    'Bước sang tuổi mới, anh chúc Thúy An luôn luôn xinh đẹp, rạng rỡ và ngập tràn hạnh phúc. Mong em luôn giữ được nụ cười trong trẻo ấy, luôn mạnh mẽ vượt qua mọi thử thách, và luôn tin rằng dù có bất cứ chuyện gì xảy ra, anh vẫn sẽ luôn ở đây để nắm chặt tay em.',
    'Hãy cứ ước những điều em muốn, vì cả vũ trụ và anh sẽ cùng giúp em biến mọi ước mơ thành hiện thực. Chúc mừng sinh nhật Thúy An của anh! ✨🎂🎉'
  ],
  letterSignOff: 'Mãi yêu Thúy An hơn cả hôm qua, và ít hơn ngày mai!',
  songTitle: 'Hẹn Em Dưới Pháo Hoa',
  songArtist: 'Acoustic Love Melody',
  lyrics: [
    { id: '1', timeSec: 0, text: 'Hẹn em một ngày pháo hoa rực sáng cả bầu trời...', subtext: 'Giữa triệu vì sao anh chỉ muốn ngắm nhìn đôi mắt Thúy An' },
    { id: '2', timeSec: 6, text: 'Ánh sáng lung linh thắp lên những điều ước nhiệm màu...', subtext: 'Nguyện ước tuổi mới của Thúy An luôn đong đầy hạnh phúc' },
    { id: '3', timeSec: 12, text: 'Dưới làn mưa hoa đăng rực rỡ muôn sắc màu...', subtext: 'Nắm chặt bàn tay nhỏ nhắn sưởi ấm mùa đông' },
    { id: '4', timeSec: 18, text: 'Từng nốt nhạc ngân vang thay cho ngàn lời thương nhớ...', subtext: 'Thúy An là món quà tuyệt vời nhất mà cuộc đời trao tặng anh' },
    { id: '5', timeSec: 24, text: 'Dẫu qua bao năm tháng, tình này vẫn vẹn nguyên...', subtext: 'Chúc mừng sinh nhật, Thúy An của anh ❤️' },
  ],
  selectedSongId: 'hen-em-duoi-phao-hoa',
  playlist: [
    {
      id: 'hen-em-duoi-phao-hoa',
      title: 'Hẹn Em Dưới Pháo Hoa',
      artist: 'Acoustic Love Melody',
      tag: 'Lãng mạn & Pháo hoa',
      lyrics: [
        { id: 'h1', timeSec: 0, text: 'Hẹn em một ngày pháo hoa rực sáng cả bầu trời...', subtext: 'Giữa triệu vì sao anh chỉ muốn ngắm nhìn đôi mắt Thúy An' },
        { id: 'h2', timeSec: 6, text: 'Ánh sáng lung linh thắp lên những điều ước nhiệm màu...', subtext: 'Nguyện ước tuổi mới của Thúy An luôn đong đầy hạnh phúc' },
        { id: 'h3', timeSec: 12, text: 'Dưới làn mưa hoa đăng rực rỡ muôn sắc màu...', subtext: 'Nắm chặt bàn tay nhỏ nhắn sưởi ấm mùa đông' },
        { id: 'h4', timeSec: 18, text: 'Từng nốt nhạc ngân vang thay cho ngàn lời thương nhớ...', subtext: 'Thúy An là món quà tuyệt vời nhất mà cuộc đời trao tặng anh' },
        { id: 'h5', timeSec: 24, text: 'Dẫu qua bao năm tháng, tình này vẫn vẹn nguyên...', subtext: 'Chúc mừng sinh nhật, Thúy An của anh ❤️' },
      ],
    },
    {
      id: 'xuan-ha-thu-dong',
      title: 'Xuân Hạ Thu Đông',
      artist: 'Amee & Hứa Kim Tuyền (Acoustic)',
      tag: 'Ngọt ngào 4 mùa',
      lyrics: [
        { id: 'x1', timeSec: 0, text: 'Xuân ghé qua mang theo ngàn vạt nắng ấm dịu dàng...', subtext: 'Nụ cười Thúy An như hoa nở giữa ban mai' },
        { id: 'x2', timeSec: 6, text: 'Hạ rực rỡ cùng những chuyến đi đầy ắp tiếng cười...', subtext: 'Ta bên nhau ngắm hoàng hôn buông trên biển biếc' },
        { id: 'x3', timeSec: 12, text: 'Thu lá vàng rơi khẽ chạm bờ vai em nhỏ bé...', subtext: 'Những buổi chiều cà phê lắng nghe từng tâm sự' },
        { id: 'x4', timeSec: 18, text: 'Đông lạnh có bàn tay anh ôm lấy trái tim em...', subtext: 'Xuân Hạ Thu Đông bốn mùa đều có Thúy An' },
        { id: 'x5', timeSec: 24, text: 'Mừng sinh nhật tuổi mới bình an và ngọt ngào mãi mãi!', subtext: 'Happy Birthday Thúy An, mãi yêu em qua từng mùa tháng năm ✨' },
      ],
    },
    {
      id: 'day-toi-cach-yeu',
      title: 'Dạy Tôi Cách Yêu',
      artist: 'Bùi Trường Linh (Piano Version)',
      tag: 'Chân thành & Sâu lắng',
      lyrics: [
        { id: 'd1', timeSec: 0, text: 'Em dạy tôi biết thế nào là yêu một người chân thành...', subtext: 'Biết lắng lo từng điều giản đơn thường nhật' },
        { id: 'd2', timeSec: 6, text: 'Dạy tôi biết nhớ nhung mỗi khi ánh hoàng hôn dần buông...', subtext: 'Và biết trân trọng từng giây phút bên cạnh Thúy An' },
        { id: 'd3', timeSec: 12, text: 'Cảm ơn em đã bước vào cuộc đời vụng về của tôi...', subtext: 'Tô thêm những gam màu ấm áp và rực rỡ' },
        { id: 'd4', timeSec: 18, text: 'Ngày hôm nay là ngày của riêng thiên thần Thúy An...', subtext: 'Hãy cứ cười tươi và đón nhận mọi điều tốt đẹp nhất' },
        { id: 'd5', timeSec: 24, text: 'Chúc mừng sinh nhật người đã dạy tôi cách yêu trọn vẹn!', subtext: 'Mãi là bến đỗ bình yên của Thúy An nhé ❤️' },
      ],
    },
    {
      id: 'the-gioi-mat-di-nguoi-co-don',
      title: 'Và Thế Giới Đã Mất Đi Người Cô Đơn',
      artist: 'Vũ. (Indie Romantic)',
      tag: 'Tình ca êm dịu',
      lyrics: [
        { id: 'v1', timeSec: 0, text: 'Từ ngày em đến bên đời, mọi góc phố đều nở hoa...', subtext: 'Và thế giới này đã bớt đi một người cô đơn' },
        { id: 'v2', timeSec: 6, text: 'Bởi vì ta đã tìm thấy nhau giữa biển người muôn trùng...', subtext: 'Từng ánh mắt, từng cái nắm tay đều là định mệnh' },
        { id: 'v3', timeSec: 12, text: 'Mỗi sớm mai thức dậy nhìn thấy nụ cười Thúy An...', subtext: 'Mọi giông bão ngoài kia đều dừng sau cánh cửa' },
        { id: 'v4', timeSec: 18, text: 'Tuổi mới chúc Thúy An luôn an yên và ngập tràn niềm vui...', subtext: 'Vì giờ đây em đã luôn có anh kề bên' },
        { id: 'v5', timeSec: 24, text: 'Chúc mừng sinh nhật, tình yêu dịu dàng nhất trần gian!', subtext: 'Cùng nhau đi đến tận cùng thời gian nhé Thúy An ✨' },
      ],
    },
    {
      id: 'bao-loi-con-chua-noi',
      title: 'Bao Lời Con Chưa Nói',
      artist: 'Giai Điệu Tình Thân & Tri Ân',
      tag: 'Ý nghĩa & Xúc động',
      lyrics: [
        { id: 'b1', timeSec: 0, text: 'Bao lời yêu thương sâu kín trong lòng chưa kịp cất lời...', subtext: 'Cảm ơn vì những chăm sóc, hy sinh thầm lặng suốt bao năm' },
        { id: 'b2', timeSec: 6, text: 'Thời gian trôi nhanh quá, chỉ mong người luôn bình an...', subtext: 'Sức khỏe dồi dào và nụ cười luôn rạng ngời trên môi' },
        { id: 'b3', timeSec: 12, text: 'Mỗi ngọn nến thắp lên là một lời cầu chúc tốt lành...', subtext: 'Cầu mong mọi điều may mắn, an khang sẽ tìm về' },
        { id: 'b4', timeSec: 18, text: 'Cảm ơn cuộc đời đã cho chúng con có một điểm tựa ấm êm...', subtext: 'Tình yêu thương này lớn lao hơn bất cứ điều gì' },
        { id: 'b5', timeSec: 24, text: 'Chúc mừng sinh nhật! Chúc một đời an nhiên và hạnh phúc! 🌸', subtext: 'Mãi mãi yêu thương và tự hào vô bờ bến' },
      ],
    },
    {
      id: 'the-gioi-cua-anh',
      title: 'Thế Giới Của Anh',
      artist: 'Acoustic Sweet Love',
      tag: 'Ngọt ngào & Say đắm',
      lyrics: [
        { id: 't1', timeSec: 0, text: 'Thúy An chính là cả thế giới nhỏ bé nhưng to lớn nhất của anh...', subtext: 'Mỗi nhịp thở, mỗi ước mơ đều có hình bóng em' },
        { id: 't2', timeSec: 6, text: 'Chỉ cần nhìn thấy nụ cười Thúy An toả nắng rạng rỡ...', subtext: 'Là mọi mệt mỏi, lo toan đều tan biến không còn' },
        { id: 't3', timeSec: 12, text: 'Dẫu thế gian ngoài kia có muôn vàn đổi thay...', subtext: 'Vòng tay này vẫn luôn là nơi bình yên đón Thúy An về' },
        { id: 't4', timeSec: 18, text: 'Tuổi mới thêm xinh đẹp, rực rỡ và luôn được cưng chiều...', subtext: 'Cả vũ trụ sẽ luôn ưu ái dành trọn điều tốt nhất cho em' },
        { id: 't5', timeSec: 24, text: 'Happy Birthday, cô gái là cả thế giới của anh! 💖🎂', subtext: 'Yêu Thúy An nhiều hơn bất cứ lời hát nào có thể diễn tả' },
      ],
    },
    {
      id: 'happy-birthday-acoustic',
      title: 'Khúc Hát Mừng Sinh Nhật',
      artist: 'Acoustic Piano & Music Box',
      tag: 'Kinh điển & Bất hủ',
      lyrics: [
        { id: 'hbd1', timeSec: 0, text: 'Ánh nến lung linh trong đêm dịu êm...', subtext: 'Từng giọt sương mai đọng trên cánh hoa' },
        { id: 'hbd2', timeSec: 5, text: 'Hôm nay một vì sao sáng nhất đã ra đời mang tên Thúy An...', subtext: 'Mang theo nụ cười làm say đắm lòng ai' },
        { id: 'hbd3', timeSec: 10, text: 'Happy Birthday to you, my love Thúy An...', subtext: 'Chúc em tuổi mới ngập tràn niềm vui' },
        { id: 'hbd4', timeSec: 16, text: 'Hãy nhắm mắt lại và ước nguyện thật sâu...', subtext: 'Mọi điều kỳ diệu sẽ đến bên em' },
        { id: 'hbd5', timeSec: 22, text: 'Thổi tắt nến đi và ôm lấy những nụ cười...', subtext: 'Anh sẽ luôn ở đây bên Thúy An suốt bốn mùa' },
        { id: 'hbd6', timeSec: 28, text: 'Chúc mừng sinh nhật, Thúy An tuyệt vời nhất!', subtext: 'Happy Birthday to you, forever & always ❤️' },
      ],
    },
  ],
  questions: [
    {
      id: 'q1',
      question: 'Hôm nay đố Thúy An biết là ngày gì đặc biệt nhất nào?',
      subtitle: 'Chọn câu trả lời trong tim em nhé ✨',
      options: [
        { text: 'Chỉ là một ngày bình thường thôi à?', reaction: 'Ôi sai bét rồi! Hôm nay là ngày siêu trọng đại của Thúy An đó nhen! 😜' },
        { text: 'Ngày sinh nhật của Thúy An - người xinh đẹp nhất quả đất!', reaction: 'Chuẩn 1000 điểm luôn! Chính là sinh nhật của Thúy An đó! 🎉', isSuperSweet: true },
        { text: 'Ngày anh yêu Thúy An nhiều hơn hôm qua', reaction: 'Cũng đúng lắm nè, nhưng còn một điều kỳ diệu hơn nữa! ❤️', isSuperSweet: true }
      ]
    },
    {
      id: 'q2',
      question: 'Ai là người sở hữu nụ cười toả nắng làm tim anh đập rộn ràng nhất?',
      subtitle: 'Nghĩ kỹ xem nào cô nương ơi...',
      options: [
        { text: 'Chính là Thúy An chứ còn ai vào đây nữa!', reaction: 'Chính xác! Nụ cười của Thúy An là ánh sáng của đời anh! 💖', isSuperSweet: true },
        { text: 'Chắc là một hoa hậu phương nào đó?', reaction: 'Hoa hậu cũng phải chào thua nụ cười của Thúy An nha! 🌸' },
        { text: 'Cô gái tên Thúy An đang đọc những dòng này nè', reaction: 'Bingo! Đáng yêu không lối thoát luôn! 🥰', isSuperSweet: true }
      ]
    },
    {
      id: 'q3',
      question: 'Ước nguyện lớn nhất của Thúy An trong tuổi mới này là gì?',
      subtitle: 'Vũ trụ đang lắng nghe tâm tư của em đó...',
      options: [
        { text: 'Luôn luôn bình an, vui vẻ và rực rỡ', reaction: 'Chắc chắn vũ trụ và anh sẽ luôn chở che cho Thúy An! ✨', isSuperSweet: true },
        { text: 'Ăn mãi không mập, shopping thả ga!', reaction: 'Haha duyệt liền! Anh tài trợ tinh thần hết mình! 🛍️' },
        { text: 'Bên nhau thật lâu và cùng đi khắp thế gian', reaction: 'Lời ước này anh xin được thực hiện cả đời cùng Thúy An! 💍', isSuperSweet: true }
      ]
    },
    {
      id: 'q4',
      question: 'Thúy An đã sẵn sàng bước vào thế giới ngập tràn pháo hoa & quà sinh nhật chưa?',
      subtitle: 'Hít một hơi thật sâu nào!',
      options: [
        { text: 'Dạ sẵn sàng 100%! Mở ra ngay đi ạ! 🚀', reaction: 'Đi thôi nào! Cánh cổng sinh nhật chính thức khai mở! 🎆', isSuperSweet: true },
        { text: 'Hồi hộp quá, không biết có bất ngờ gì ta?', reaction: 'Bật mí là ngọt ngào đến tan chảy luôn! Bắt đầu nào! 🎁', isSuperSweet: true }
      ]
    }
  ],

  // ==========================================================================
  // 📸 DANH SÁCH ẢNH KỶ NIỆM (16 ẢNH):
  // Khi bạn tải code về máy tính, chỉ cần thay link bên dưới thành:
  // url: '/images/photo1.jpg', url: '/images/photo2.jpg', v.v...
  // (Nhớ bỏ file ảnh vào thư mục public/images/)
  // ==========================================================================
  photos: [
    {
      id: 'p1',
      // Thay ảnh 1 tại đây (VD: '/images/photo1.jpg' hoặc link online)
      url: '/images/photo1.jpg',
      caption: 'Nụ cười thiên thần làm sáng bừng cả góc trời ✨',
      date: 'Khoảnh khắc đầu tiên',
      tag: 'Nụ cười'
    },
    {
      id: 'p2',
      // Thay ảnh 2 tại đây (VD: '/images/photo2.jpg')
     url: '/images/photo2.jpg',
     caption: 'Đôi mắt biết nói và nét dịu dàng khó phai của Thúy An',
      date: 'Mùa thu dịu êm',
      tag: 'Kỷ niệm'
    },
    {
      id: 'p3',
      // Thay ảnh 3 tại đây (VD: '/images/photo3.jpg')
      url: '/images/photo3.jpg',
      caption: 'Những ngày cùng nhau dạo phố dưới hoàng hôn rực rỡ',
      date: 'Buổi chiều hoàng hôn',
      tag: 'Hẹn hò'
    },
    {
      id: 'p4',
      // Thay ảnh 4 tại đây (VD: '/images/photo4.jpg')
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
      caption: 'Rực rỡ và kiêu sa như đóa hướng dương đón nắng',
      date: 'Ngày đầy nắng',
      tag: 'Nụ cười'
    },
    {
      id: 'p5',
      // Thay ảnh 5 tại đây (VD: '/images/photo5.jpg')
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      caption: 'Nét đáng yêu ngây ngô mỗi khi giận dỗi vu vơ',
      date: 'Cà phê cuối tuần',
      tag: 'Đáng yêu'
    },
    {
      id: 'p6',
      // Thay ảnh 6 tại đây (VD: '/images/photo6.jpg')
      url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      caption: 'Dù ở góc chụp nào thì Thúy An vẫn luôn là tuyệt nhất!',
      date: 'Chuyến đi xa',
      tag: 'Du lịch'
    },
    {
      id: 'p7',
      // Thay ảnh 7 tại đây (VD: '/images/photo7.jpg')
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      caption: 'Bàn tay nhỏ xinh luôn cần anh sưởi ấm mùa đông',
      date: 'Mùa đông ấm áp',
      tag: 'Kỷ niệm'
    },
    {
      id: 'p8',
      // Thay ảnh 8 tại đây (VD: '/images/photo8.jpg')
      url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      caption: 'Ánh mắt long lanh chứa cả dải ngân hà',
      date: 'Đêm ngắm sao',
      tag: 'Lãng mạn'
    },
    {
      id: 'p9',
      // Thay ảnh 9 tại đây (VD: '/images/photo9.jpg')
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      caption: 'Bữa tiệc sinh nhật ngập tràn ánh đèn lung linh',
      date: 'Bữa tiệc ấm áp',
      tag: 'Sinh nhật'
    },
    {
      id: 'p10',
      // Thay ảnh 10 tại đây (VD: '/images/photo10.jpg')
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      caption: 'Bóng bay sắc màu mang theo triệu điều ước tốt lành',
      date: 'Ước nguyện',
      tag: 'Sinh nhật'
    },
    {
      id: 'p11',
      // Thay ảnh 11 tại đây (VD: '/images/photo11.jpg')
      url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
      caption: 'Khoảnh khắc nâng ly chúc mừng tuổi mới an lành',
      date: 'Cheers to life',
      tag: 'Kỷ niệm'
    },
    {
      id: 'p12',
      // Thay ảnh 12 tại đây (VD: '/images/photo12.jpg')
      url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
      caption: 'Bánh kem ngọt ngào cũng không bằng nụ cười của Thúy An',
      date: 'Bánh kem xinh',
      tag: 'Sinh nhật'
    },
    {
      id: 'p13',
      // Thay ảnh 13 tại đây (VD: '/images/photo13.jpg')
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'Bó hoa tươi thắm dành riêng cho Thúy An hôm nay',
      date: 'Hoa tặng em',
      tag: 'Lãng mạn'
    },
    {
      id: 'p14',
      // Thay ảnh 14 tại đây (VD: '/images/photo14.jpg')
      url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80',
      caption: 'Chuyến đi ngắm biển bình minh cùng em',
      date: 'Bình minh bên bờ biển',
      tag: 'Du lịch'
    },
    {
      id: 'p15',
      // Thay ảnh 15 tại đây (VD: '/images/photo15.jpg')
      url: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&w=800&q=80',
      caption: 'Bờ cát trắng và những bước chân in hình đôi lứa',
      date: 'Dấu chân kỷ niệm',
      tag: 'Kỷ niệm'
    },
    {
      id: 'p16',
      // Thay ảnh 16 tại đây (VD: '/images/photo16.jpg')
      url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      caption: 'Cùng nhau bước qua từng mùa thanh xuân rực rỡ',
      date: 'Thanh xuân có nhau',
      tag: 'Lãng mạn'
    }
  ]
};
