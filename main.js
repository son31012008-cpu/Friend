// A5K60 Backend - Firebase Only (No localStorage for users)
class A5K60Backend {
    constructor() {
        this.setupFirebaseAuth();
        this.setupCloudStorage();
        this.setupEventListeners();
    }

    setupFirebaseAuth() {
        this.currentUser = null;
        this.usersCache = {};
        
        // Load session user
        const sessionUser = localStorage.getItem('currentUser');
        if (sessionUser) {
            this.currentUser = JSON.parse(sessionUser);
        }
    }

    async loadUsersFromFirebase() {
        try {
            const snapshot = await db.ref('users').once('value');
            this.usersCache = snapshot.val() || {};
            return this.usersCache;
        } catch (error) {
            console.error('❌ Lỗi load users:', error);
            return {};
        }
    }

    async login(username, password) {
        if (Object.keys(this.usersCache).length === 0) {
            await this.loadUsersFromFirebase();
        }
        
        const user = this.usersCache[username];
        if (!user || user.password !== password) {
            return { success: false, message: 'Tài khoản hoặc mật khẩu không đúng!' };
        }
        
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

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        return { success: true };
    }

    getCurrentUser() {
        return this.currentUser;
    }

    hasPermission(memberId) {
        if (!this.currentUser) return false;
        return this.currentUser.role === 'admin' || this.currentUser.memberId === memberId;
    }

    setupCloudStorage() {
        this.cloudStorage = {
            upload: (file, callback) => {
                setTimeout(() => callback({
                    success: true,
                    url: URL.createObjectURL(file),
                    fileId: Math.random().toString(36).substr(2, 9)
                }), 1000);
            }
        };
    }

    setupEventListeners() {
        window.uploadFile = (file, callback) => this.cloudStorage.upload(file, callback);
        window.getCurrentUser = () => this.getCurrentUser();
        window.hasPermission = (id) => this.hasPermission(id);
    }

    getMemberData(memberId) {
        const data = localStorage.getItem(`member_${memberId}`);
        return data ? JSON.parse(data) : {
            name: `Thành viên ${memberId}`,
            avatar: '🐵',
            bio: '',
            hobbies: []
        };
    }

    saveMemberData(memberId, data) {
        localStorage.setItem(`member_${memberId}`, JSON.stringify(data));
    }

    static showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('opacity-0', 'translate-x-4');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

const backend = new A5K60Backend();

// Firebase Sync cho members (KHÔNG ĐỘNG VÀO USERS)
if (typeof firebase !== 'undefined') {
    console.log('🔥 Firebase Backend đã sẵn sàng');
    
    class FirebaseSync {
        constructor() {
            this.db = firebase.database();
            this.membersRef = this.db.ref('members');
            this.syncLocalToFirebase();
        }
        
        async syncLocalToFirebase() {
            const hasSynced = localStorage.getItem('firebase_synced_final');
            if (hasSynced) return;
            
            console.log('🔄 Đồng bộ members...');
            
            const updates = {};
            let count = 0;
            
            for (let i = 1; i <= 46; i++) {
                const memberId = i.toString().padStart(2, '0');
                const localData = localStorage.getItem(`member_${memberId}`);
                if (localData) {
                    const snapshot = await this.membersRef.child(memberId).once('value');
                    if (!snapshot.exists()) {
                        updates[`members/${memberId}`] = JSON.parse(localData);
                        count++;
                    }
                }
            }
            
            if (count > 0) await this.db.ref().update(updates);
            localStorage.setItem('firebase_synced_final', 'true');
            console.log(`✅ Đồng bộ ${count} members`);
        }
    }
    
    window.firebaseSync = new FirebaseSync();
}

console.log('🚀 A5K60 Backend đã sẵn sàng!');
