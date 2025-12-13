# Những con khỉ A5K60 - Website Documentation

## Giới thiệu

Website "Những con khỉ A5K60" là một hệ thống quản lý thông tin cá nhân cho 46 thành viên nhóm A5K60, với các tính năng đăng nhập, upload ảnh/video, và quản lý mạng xã hội.

## Tính năng chính

### 🔐 Hệ thống đăng nhập
- 46 tài khoản thành viên (01-46)
- 1 tài khoản admin
- Phân quyền: mỗi thành viên chỉ xem được thông tin của chính mình
- Admin có thể xem và quản lý tất cả thành viên

### 📱 Giao diện responsive
- Thiết kế mobile-first
- Hỗ trợ mọi kích thước màn hình
- Animation và hiệu ứng đẹp mắt

### 🖼️ Quản lý media
- Upload ảnh và video cá nhân
- Gallery slider với Splide.js
- Lưu trữ cloud (simulated)

### 🔗 Tích hợp mạng xã hội
- Facebook
- Instagram  
- Locket
- Hiển thị partial links

### 📊 Admin dashboard
- Quản lý toàn bộ thành viên
- Thống kê hoạt động
- Reset mật khẩu thành viên
- Theo dõi dung lượng sử dụng

## Cấu trúc file

```
/mnt/okcomputer/output/
├── login.html          # Trang đăng nhập
├── index.html          # Trang chủ - danh sách thành viên
├── profile.html        # Trang cá nhân
├── admin.html          # Trang quản trị
├── main.js            # Backend simulation & API
└── README.md          # Tài liệu hướng dẫn
```

## Tài khoản mẫu

### Admin
- Username: `admin`
- Password: `admin123`

### Thành viên
- Username: `01` - `46`
- Password: `user01` - `user46`

## Hướng dẫn sử dụng

### 1. Đăng nhập
- Truy cập `login.html`
- Nhập username và password
- Admin sẽ được chuyển đến dashboard
- Thành viên sẽ được chuyển đến trang chủ

### 2. Trang chủ (index.html)
- Hiển thị danh sách 46 thành viên
- Có thể tìm kiếm và lọc thành viên
- Click vào card để xem trang cá nhân

### 3. Trang cá nhân (profile.html)
- Xem thông tin cá nhân
- Upload ảnh/video
- Cập nhật liên kết mạng xã hội
- Chỉ xem được thông tin của chính mình (trừ admin)

### 4. Admin dashboard (admin.html)
- Xem thống kê tổng quan
- Quản lý tất cả thành viên
- Reset mật khẩu thành viên
- Theo dõi hoạt động

## API Integration (Simulated)

### Cloud Storage
```javascript
// Upload file
backend.cloudStorage.upload(file, callback);

// Get user files
backend.cloudStorage.getFiles(userId, callback);

// Delete file
backend.cloudStorage.delete(fileId, callback);
```

### Social Links Management
```javascript
// Save social links
saveSocialLinks(memberId, {
    facebook: 'https://facebook.com/...',
    instagram: 'https://instagram.com/...',
    locket: 'https://locket.com/...'
});

// Get social links
getSocialLinks(memberId);
```

### Admin Functions
```javascript
// Get admin dashboard data
getAdminDashboard();

// Get all members
getAllMembers();

// Reset member password
resetMemberPassword(memberId);
```

## Tích hợp Google Drive API (Hướng dẫn)

Để tích hợp Google Drive API thực tế:

1. **Tạo Google Cloud Project**
   - Truy cập https://console.cloud.google.com
   - Tạo project mới
   - Enable Google Drive API

2. **Tạo OAuth credentials**
   - Go to APIs & Services > Credentials
   - Create OAuth 2.0 Client ID
   - Set redirect URI

3. **Cài đặt Google Drive API**
   ```javascript
   // Example implementation
   function initGoogleDrive() {
       gapi.load('client:auth2', () => {
           gapi.client.init({
               apiKey: 'YOUR_API_KEY',
               clientId: 'YOUR_CLIENT_ID',
               discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
               scope: 'https://www.googleapis.com/auth/drive.file'
           });
       });
   }
   ```

## Tích hợp Facebook API (Hướng dẫn)

Để tích hợp Facebook API:

1. **Tạo Facebook App**
   - Truy cập https://developers.facebook.com
   - Tạo app mới
   - Add Facebook Login product

2. **Lấy Access Token**
   ```javascript
   // Example implementation
   function initFacebookAPI() {
       FB.init({
           appId: 'YOUR_APP_ID',
           cookie: true,
           xfbml: true,
           version: 'v18.0'
       });
   }
   ```

## Responsive Design

Website được thiết kế với:
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1280px
- Touch-friendly interface
- Swipe gestures cho mobile
- Optimized images và lazy loading

## Performance Optimization

- Lazy loading cho images
- CSS và JS minification
- Local storage cho caching
- Optimized animations
- Compressed assets

## Security Features

- Password hashing (simulated)
- Session management
- Role-based access control
- Input validation
- XSS protection

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

## Deployment

### Local Development
```bash
# Serve files locally
python -m http.server 8000
# or
npx serve .
```

### Production Deployment
- Upload all files to web server
- Ensure HTTPS cho Facebook/Google API
- Configure domain và SSL certificate

## Troubleshooting

### Common Issues

1. **Không đăng nhập được**
   - Kiểm tra username/password
   - Clear browser cache
   - Kiểm tra localStorage

2. **Không xem được profile**
   - Kiểm tra quyền truy cập
   - Đảm bảo đã chọn thành viên từ trang chủ

3. **Upload không hoạt động**
   - Kiểm tra file size
   - Đảm bảo file format hợp lệ
   - Check browser permissions

## Future Enhancements

- Real-time chat
- Push notifications
- Advanced search
- Photo editing tools
- Video processing
- Mobile app (React Native)

## Support

Nếu gặp vấn đề hoặc cần hỗ trợ:
- Kiểm tra browser console cho errors
- Review localStorage data
- Check network requests
- Contact development team

## License

© 2024 Những con khỉ A5K60. All rights reserved.