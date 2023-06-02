const { Gym } = require('../models');

const gymSeeder = async () => {
  try {
    const gyms = [
      {
        name: 'Karina Gym',
        address: 'Ba Đình, Hà Nội',
        location: {
          type: 'Point',
          coordinates: [105.836002, 21.037446],
        },
        phone: '0987654321',
        price: '50000',
        description:
          'Phòng gym Karina là một cơ sở tập luyện hiện đại và đa chức năng. Với không gian rộng rãi và trang thiết bị hiện đại, phòng gym Karina cung cấp một môi trường tập luyện tuyệt vời cho cả người mới tập luyện và những người đã có kinh nghiệm. Đội ngũ huấn luyện viên chuyên nghiệp sẽ hỗ trợ và tư vấn cho bạn trong quá trình đạt được mục tiêu thể chất của mình.',
        facilityTags: ['Pool', 'Massage'],
      },
      {
        name: 'Winter Gym',
        address: 'Thanh Xuân, Hà Nội',
        location: {
          type: 'Point',
          coordinates: [105.811417, 20.993776],
        },
        phone: '0887654321',
        price: '30000',
        description:
          'Với không gian ấm cúng và thiết bị tập luyện chất lượng, phòng gym Winter là nơi lý tưởng để rèn luyện sức khỏe và thể hình. Tại đây, bạn có thể tham gia các lớp tập hợp động, yoga, bài tập cardio và nhiều hoạt động khác. Đội ngũ huấn luyện viên giàu kinh nghiệm sẽ giúp bạn tạo lập kế hoạch tập luyện phù hợp với mục tiêu cá nhân.',
        facilityTags: ['Pool'],
      },
      {
        name: 'Autumn Gym',
        address: 'Hoàn Kiếm, Hà Nội',
        location: {
          type: 'Point',
          coordinates: [105.84713, 21.030653],
        },
        phone: '0787654321',
        price: '40000',
        description:
          'Phòng gym Autumn chuyên tập trung vào các hoạt động tăng cường cơ bắp và nâng cao sức mạnh. Với trang thiết bị hiện đại như tạ, máy kéo và máy chạy bộ, bạn có thể tập luyện để phát triển sức mạnh và cơ bắp. Huấn luyện viên tận tâm sẽ giúp bạn xây dựng chế độ tập luyện cá nhân và theo dõi tiến trình của bạn.',
        facilityTags: ['Massage'],
      },
      {
        name: 'Summer Gym',
        address: 'Hoàn Kiếm, Hà Nội',
        location: {
          type: 'Point',
          coordinates: [105.84713, 21.030653],
        },
        phone: '0687654321',
        price: '10000',
        description:
          'Phòng gym Summer là một trung tâm thể dục toàn diện với nhiều tiện ích. Ngoài các máy tập cardio và trọng lượng, phòng gym Summer còn cung cấp các lớp hướng dẫn như bơi lội, võ thuật và nhảy dây. Bạn cũng có thể tham gia các buổi tập nhóm để tăng cường sức khỏe và rèn luyện.',
        facilityTags: ['Pool', 'Massage'],
      },
      {
        name: 'Spring Gym',
        address: 'Hai Bà Trưng, Hà Nội',
        location: {
          type: 'Point',
          coordinates: [105.860751, 21.009057],
        },
        phone: '0587654321',
        price: '20000',
        description:
          'Phòng gym Spring là một môi trường thân thiện và vui vẻ để tập luyện. Với không gian rộng rãi, âm thanh sống động và ánh sáng tự nhiên, bạn sẽ có một trải nghiệm tập luyện thoải mái. Phòng gym Spring cung cấp các dịch vụ như tập yoga, pilates, bài tập thể dục nhịp điệu và nhiều hoạt động khác để giúp bạn duy trì sức khỏe và sự cân bằng tinh thần.',
        facilityTags: ['Massage'],
      },
    ];

    await Gym.create(gyms);

    console.log('Gym seed data created successfully');
  } catch (err) {
    console.error('Error creating gym seed data:', err);
  }
};

module.exports = gymSeeder;
