// Import Firebase scripts (specifically for service workers)
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyA9SuuR54iI9cGUJwrkf9iclIkN6ZR2Ykg",
  authDomain: "vuefire2-cc79f.firebaseapp.com",
  databaseURL: "https://vuefire2-cc79f-default-rtdb.firebaseio.com",
  projectId: "vuefire2-cc79f",
  storageBucket: "vuefire2-cc79f.appspot.com",
  messagingSenderId: "421623353489",
  appId: "1:421623353489:web:15ed19436b593c877aef30",
});

// Retrieve an instance of Firebase Messaging to handle background messages
const messaging = firebase.messaging();

// Handle background notification messages
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Path to your custom icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
