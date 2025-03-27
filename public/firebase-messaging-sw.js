// firebase-messaging-sw.js – קובץ Service Worker עבור FCM

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');


// קונפיגורציה של Firebase (אותה כמו בקובץ הראשי שלך)
firebase.initializeApp({
  apiKey: "AIzaSyBgRjJShNJqWB2nq931kKobLRHUeejW0vo",
  authDomain: "milan-studio-b8b4b.firebaseapp.com",
  projectId: "milan-studio-b8b4b",
  storageBucket: "milan-studio-b8b4b.firebasestorage.app",
  messagingSenderId: "961084768524",
  appId: "1:961084768524:web:2cdbc3a67dc018d8058929",
  measurementId: "G-8XF83E9KQY",
});

const messaging = firebase.messaging();

// טיפול בהתראות כאשר האפליקציה סגורה (background)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] קיבלת הודעת רקע:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png', // אייקון לברירת מחדל – תוכל לשנות
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
