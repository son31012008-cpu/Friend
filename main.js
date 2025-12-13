// A5K60 Website - Main JavaScript File
// Backend simulation and API integration

class A5K60Backend {
    constructor() {
        this.initializeDatabase();
        this.setupEventListeners();
        this.initializeCloudStorage();
    }
    
    // Initialize mock database
    initializeDatabase() {
        // Users database (46 members + admin)
        this.users = {
            'admin': {
                password: 'admin123',
                role: 'admin',
                memberId: 'admin',
                name: 'Administrator',
                avatar: '👨‍💼'
            }
        };
        
        // Create 46 member accounts
        for (let i = 1; i <= 46; i++) {
            const memberId = i.toString().padStart(2, '0');
            this.users[memberId] = {
                password: `user${memberId}`,
                role: 'member',
                memberId: memberId,
                name: this.generateMemberName(i),
                avatar: this.generateAvatar()
            };
        }
        
        // Store in localStorage
        localStorage.setItem('a5k60_users', JSON.stringify(this.users));
    }
    
    // Generate member names
    generateMemberName(index) {
        const names = [
            'Anh Khôi', 'Bảo Anh', 'Công Minh', 'Đức Huy', 'Gia Bảo',
            'Hoàng Long', 'Khánh Linh', 'Lê Nam', 'Minh Anh', 'Ngọc Hà',
            'Phương Linh', 'Quang Huy', 'Thanh Tùng', 'Tuấn Kiệt', 'Văn Dũng',
            'Bích Ngọc', 'Đình Phong', 'Hải Yến', 'Kim Oanh', 'Mai Lan',
            'Nguyễn Văn A', 'Phan Thị B', 'Trần Văn C', 'Lê Thị D', 'Hoàng Văn E',
            'Vũ Thị F', 'Đặng Văn G', 'Ngô Thị H', 'Bùi Văn I', 'Đỗ Thị K',
            'Hồ Văn L', 'Nguyễn Thị M', 'Phạm Văn N', 'Trịnh Thị O', 'Lý Văn P',
            'Tạ Thị Q', 'Đinh Văn R', 'Hà Thị S', 'Vương Văn T', 'Lưu Thị U',
            'Tôn Văn V', 'Triệu Thị W', 'Quách Văn X', 'Dương Thị Y', 'Lâm Văn Z',
            'Tất Thị AA'
        ];
        return names[index - 1] || `Thành viên ${index.toString().padStart(2, '0')}`;
    }
    
    // Generate avatar
    generateAvatar() {
        const emojis = ['🐵', '🙈', '🙉', '🙊', '🦍', '🐒'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
    
    // Initialize cloud storage simulation
    initializeCloudStorage() {
        // Simulate Google Drive/OneDrive integration
        this.cloudStorage = {
            upload: (file, callback) => {
                // Simulate upload delay
                setTimeout(() => {
                    const fileUrl = URL.createObjectURL(file);
                    callback({
                        success: true,
                        url: fileUrl,
                        fileId: this.generateFileId(),
                        timestamp: new Date().toISOString()
                    });
                }, 1000);
            },
            
            delete: (fileId, callback) => {
                // Simulate delete
                setTimeout(() => {
                    callback({ success: true });
                }, 500);
            },
            
            getFiles: (userId, callback) => {
                // Simulate fetching user files
                setTimeout(() => {
                    const mockFiles = this.getUserFiles(userId);
                    callback({ success: true, files: mockFiles });
                }, 500);
            }
        };
    }
    
    // Generate file ID
    generateFileId() {
        return 'file_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Get user files (mock data)
    getUserFiles(userId) {
        const baseFiles = [
            {
                id: 'file_1',
                name: 'profile_picture.jpg',
                type: 'image',
                url: 'https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Profile',
                uploadDate: '2024-01-15'
            },
            {
                id: 'file_2',
                name: 'memory_1.jpg',
                type: 'image',
                url: 'https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Memory+1',
                uploadDate: '2024-02-20'
            }
        ];
        
        // Add more files based on user ID
        const additionalFiles = [];
        for (let i = 3; i <= Math.floor(Math.random() * 5) + 3; i++) {
            additionalFiles.push({
                id: `file_${i}`,
                name: `photo_${i}.jpg`,
                type: 'image',
                url: `https://via.placeholder.com/400x300/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=Photo+${i}`,
                uploadDate: `2024-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`
            });
        }
        
        return [...baseFiles, ...additionalFiles];
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Authentication
        this.setupAuth();
        
        // File upload
        this.setupFileUpload();
        
        // Social links management
        this.setupSocialLinks();
        
        // Admin features
        this.setupAdminFeatures();
    }
    
    // Authentication system
    setupAuth() {
        // Check if user is logged in
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            this.currentUser = JSON.parse(currentUser);
        }
    }
    
    // Login function
    login(username, password) {
        const users = JSON.parse(localStorage.getItem('a5k60_users') || '{}');
        
        if (users[username] && users[username].password === password) {
            const user = users[username];
            this.currentUser = {
                username: username,
                role: user.role,
                memberId: user.memberId,
                name: user.name,
                avatar: user.avatar
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return { success: true, user: this.currentUser };
        }
        
        return { success: false, message: 'Tài khoản hoặc mật khẩu không đúng!' };
    }
    
    // Logout function
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        return { success: true };
    }
    
    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }
    
    // Check permissions
    hasPermission(memberId) {
        if (!this.currentUser) return false;
        return this.currentUser.role === 'admin' || this.currentUser.memberId === memberId;
    }
    
    // File upload setup
    setupFileUpload() {
        // This will be called from profile.html
        window.uploadFile = (file, callback) => {
            this.cloudStorage.upload(file, callback);
        };
        
        window.getUserFiles = (userId, callback) => {
            this.cloudStorage.getFiles(userId, callback);
        };
    }
    
    // Social links management
    setupSocialLinks() {
        window.saveSocialLinks = (memberId, links) => {
            if (!this.hasPermission(memberId)) {
                return { success: false, message: 'Bạn không có quyền cập nhật!' };
            }
            
            const memberData = this.getMemberData(memberId);
            memberData.socialLinks = { ...memberData.socialLinks, ...links };
            this.saveMemberData(memberId, memberData);
            
            return { success: true };
        };
        
        window.getSocialLinks = (memberId) => {
            const memberData = this.getMemberData(memberId);
            return memberData.socialLinks || {};
        };
    }
    
    // Get member data
    getMemberData(memberId) {
        const data = localStorage.getItem(`member_${memberId}`);
        if (data) {
            return JSON.parse(data);
        }
        
        // Return default data
        return {
            id: memberId,
            name: this.users[memberId]?.name || `Thành viên ${memberId}`,
            avatar: this.users[memberId]?.avatar || '🐵',
            avatarUrl: null,
            bio: `Thành viên số ${memberId} của nhóm A5K60`,
            joinDate: `2024-${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}`,
            personalInfo: 'Thành viên tuyệt vờ của nhóm A5K60. Luôn mang đến năng lượng tích cực và niềm vui cho mọi ngườ xung quanh.',
            hobbies: ['Âm nhạc', 'Du lịch', 'Nhiếp ảnh'],
            favoriteQuote: '"Life is what happens when you\'re busy making other plans."',
            socialLinks: {
                facebook: '',
                instagram: '',
                locket: ''
            },
            media: [],
            groups: []
        };
    }
    
    // Save member data
    saveMemberData(memberId, data) {
        localStorage.setItem(`member_${memberId}`, JSON.stringify(data));
    }
    
    // Admin features
    setupAdminFeatures() {
        // Admin dashboard data
        window.getAdminDashboard = () => {
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                return { success: false, message: 'Bạn không có quyền truy cập!' };
            }
            
            const users = JSON.parse(localStorage.getItem('a5k60_users') || '{}');
            const totalUsers = Object.keys(users).length;
            const memberCount = totalUsers - 1; // Exclude admin
            
            // Calculate storage usage (mock)
            const storageUsed = Math.floor(Math.random() * 500) + 100; // MB
            const storageLimit = 1000; // MB
            
            // Get recent activity
            const recentActivity = this.getRecentActivity();
            
            return {
                success: true,
                data: {
                    totalUsers,
                    memberCount,
                    storageUsed,
                    storageLimit,
                    recentActivity
                }
            };
        };
        
        // Get all members
        window.getAllMembers = () => {
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                return { success: false, message: 'Bạn không có quyền truy cập!' };
            }
            
            const users = JSON.parse(localStorage.getItem('a5k60_users') || '{}');
            const members = Object.keys(users)
                .filter(username => username !== 'admin')
                .map(username => ({
                    id: users[username].memberId,
                    name: users[username].name,
                    avatar: users[username].avatar,
                    username: username
                }));
            
            return { success: true, members };
        };
        
        // Reset member password
        window.resetMemberPassword = (memberId) => {
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                return { success: false, message: 'Bạn không có quyền thực hiện!' };
            }
            
            const users = JSON.parse(localStorage.getItem('a5k60_users') || '{}');
            if (users[memberId]) {
                users[memberId].password = `user${memberId}`;
                localStorage.setItem('a5k60_users', JSON.stringify(users));
                return { success: true, message: `Đã reset mật khẩu cho member ${memberId}` };
            }
            
            return { success: false, message: 'Không tìm thấy thành viên!' };
        };
        
        // Get all member data (for admin)
        window.getAllMemberData = () => {
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                return { success: false, message: 'Bạn không có quyền truy cập!' };
            }
            
            const allData = {};
            for (let i = 1; i <= 46; i++) {
                const memberId = i.toString().padStart(2, '0');
                allData[memberId] = this.getMemberData(memberId);
            }
            
            return { success: true, data: allData };
        };
        
        // Get member media (for admin)
        window.getMemberMedia = (memberId) => {
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                return { success: false, message: 'Bạn không có quyền truy cập!' };
            }
            
            const memberData = this.getMemberData(memberId);
            return { success: true, media: memberData.media || [] };
        };
    }
    
    // Get recent activity (mock)
    getRecentActivity() {
        const activities = [
            'Member 01 đã upload ảnh mới',
            'Member 15 đã cập nhật thông tin',
            'Member 23 đã đăng nhập',
            'Member 07 đã upload video',
            'Member 42 đã cập nhật liên kết'
        ];
        
        return activities.slice(0, Math.floor(Math.random() * 3) + 3);
    }
    
    // Avatar management
    setupAvatarManagement() {
        window.uploadAvatar = (memberId, file, callback) => {
            if (!this.hasPermission(memberId)) {
                callback({ success: false, message: 'Bạn không có quyền cập nhật!' });
                return;
            }
            
            this.cloudStorage.upload(file, (result) => {
                if (result.success) {
                    const memberData = this.getMemberData(memberId);
                    memberData.avatarUrl = result.url;
                    this.saveMemberData(memberId, memberData);
                }
                callback(result);
            });
        };
        
        window.getAvatar = (memberId) => {
            const memberData = this.getMemberData(memberId);
            return memberData.avatarUrl || null;
        };
    }
    
    // Group management
    setupGroupManagement() {
        window.createGroup = (groupData, callback) => {
            const { name, description, members, creatorId } = groupData;
            
            if (!this.hasPermission(creatorId)) {
                callback({ success: false, message: 'Bạn không có quyền tạo nhóm!' });
                return;
            }
            
            const groupId = this.generateId();
            const group = {
                id: groupId,
                name,
                description,
                members: [creatorId, ...members],
                creatorId,
                createdAt: new Date().toISOString(),
                media: []
            };
            
            // Save group
            const groups = JSON.parse(localStorage.getItem('a5k60_groups') || '[]');
            groups.push(group);
            localStorage.setItem('a5k60_groups', JSON.stringify(groups));
            
            // Add group to member data
            members.forEach(memberId => {
                const memberData = this.getMemberData(memberId);
                if (!memberData.groups) memberData.groups = [];
                memberData.groups.push({
                    id: groupId,
                    name,
                    joinedAt: new Date().toISOString()
                });
                this.saveMemberData(memberId, memberData);
            });
            
            callback({ success: true, group });
        };
        
        window.getMemberGroups = (memberId) => {
            const memberData = this.getMemberData(memberId);
            return memberData.groups || [];
        };
        
        window.getGroupById = (groupId) => {
            const groups = JSON.parse(localStorage.getItem('a5k60_groups') || '[]');
            return groups.find(g => g.id === groupId);
        };
        
        window.uploadGroupMedia = (groupId, file, uploaderId, callback) => {
            if (!this.hasPermission(uploaderId)) {
                callback({ success: false, message: 'Bạn không có quyền upload!' });
                return;
            }
            
            this.cloudStorage.upload(file, (result) => {
                if (result.success) {
                    const groups = JSON.parse(localStorage.getItem('a5k60_groups') || '[]');
                    const groupIndex = groups.findIndex(g => g.id === groupId);
                    
                    if (groupIndex !== -1) {
                        if (!groups[groupIndex].media) groups[groupIndex].media = [];
                        groups[groupIndex].media.push({
                            id: this.generateId(),
                            url: result.url,
                            type: file.type.startsWith('image/') ? 'image' : 'video',
                            uploaderId,
                            uploadedAt: new Date().toISOString()
                        });
                        
                        localStorage.setItem('a5k60_groups', JSON.stringify(groups));
                    }
                }
                callback(result);
            });
        };
    }
    
    // Centralized storage for admin access
    setupCentralizedStorage() {
        // Store all media in a central location for admin access
        window.storeMediaCentrally = (memberId, mediaItem) => {
            const centralMedia = JSON.parse(localStorage.getItem('a5k60_central_media') || '[]');
            centralMedia.push({
                ...mediaItem,
                memberId,
                storedAt: new Date().toISOString()
            });
            localStorage.setItem('a5k60_central_media', JSON.stringify(centralMedia));
        };
        
        window.getCentralMedia = () => {
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                return { success: false, message: 'Bạn không có quyền truy cập!' };
            }
            
            const centralMedia = JSON.parse(localStorage.getItem('a5k60_central_media') || '[]');
            return { success: true, media: centralMedia };
        };
        
        // Override upload to store centrally
        const originalUpload = this.cloudStorage.upload;
        this.cloudStorage.upload = (file, callback) => {
            originalUpload.call(this.cloudStorage, file, (result) => {
                if (result.success && this.currentUser) {
                    // Store in central storage
                    const mediaItem = {
                        id: this.generateId(),
                        url: result.url,
                        type: file.type.startsWith('image/') ? 'image' : 'video',
                        name: file.name,
                        size: file.size
                    };
                    storeMediaCentrally(this.currentUser.memberId, mediaItem);
                }
                callback(result);
            });
        };
    }
    
    // Facebook API integration (mock)
    setupFacebookAPI() {
        window.facebookAPI = {
            getProfile: (userId, callback) => {
                // Simulate Facebook API call
                setTimeout(() => {
                    callback({
                        success: true,
                        data: {
                            name: 'Facebook User',
                            profilePicture: 'https://via.placeholder.com/100x100/1877F2/FFFFFF?text=FB',
                            link: 'https://facebook.com/user'
                        }
                    });
                }, 1000);
            }
        };
    }
    
    // Utility functions
    static showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuad',
                complete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 3000);
    }
    
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
    
    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

// Initialize backend
const backend = new A5K60Backend();

// Export for use in other files
window.A5K60Backend = A5K60Backend;
window.backend = backend;