import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/messaging";
import "firebase/analytics";
import "firebase/performance";
import "firebase/remote-config"; 
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyA9SuuR54iI9cGUJwrkf9iclIkN6ZR2Ykg",
  authDomain: "vuefire2-cc79f.firebaseapp.com",
  databaseURL: "https://vuefire2-cc79f-default-rtdb.firebaseio.com",
  projectId: "vuefire2-cc79f",
  storageBucket: "vuefire2-cc79f.appspot.com",
  messagingSenderId: "421623353489",
  appId: "1:421623353489:web:15ed19436b593c877aef30",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const analytics = firebase.analytics();
const remoteConfig = firebase.remoteConfig();
// remoteConfig.defaultConfig = {
//   'welcome_message': 'Welcome to our app!',
//   'feature_flag': 'true',
// };
remoteConfig.settings = {
  minimumFetchIntervalMillis: 0, // Allow immediate fetch for development
};
const perf = firebase.performance();
const trace = perf.trace("loadDataTrace");
trace.start();

// Simulate a data load or a specific task
function loadData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Data loaded");
      resolve();
    }, 2000); // Simulate 2-second data load
  });
}

// Call the loadData function and stop the trace when done
loadData().then(() => {

  trace.stop(); // Stop the custom trace when data load is complete
});
// analytics.logEvent("select_content", {
//   content_type: "image",
//   content_id: "P12453",
//   items: [{ name: "Kittens" }],
// });

// Request permission for notifications
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    console.log("Notification permission granted.");

    // Get FCM token
    messaging
      .getToken({
        vapidKey:
          "BKl6uOWH3BNrwODJyIIVXaymLc-BuFQ-C7xurerS0Fv4vjOlX4nVWw3BBIsO3W9AJvw_ReYwQmBki44mIX3HfBI",
      })
      .then((currentToken) => {
        if (currentToken) {
          console.log("FCM Token:", currentToken);
          // Send the token to the server or use it for sending notifications
        } else {
          console.log("No registration token available.");
        }
      })
      .catch((err) => {
        console.error("An error occurred while retrieving token.", err);
      });
  } else {
    console.log("Unable to get permission to notify.");
  }
});

// Check if the browser supports service workers and Firebase messaging
// if ("serviceWorker" in navigator && firebase.messaging.isSupported()) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js") // Ensure this is the correct path to your service worker
//     .then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);

//       // Initialize Firebase messaging and use the registered service worker
//       const messaging = firebase.messaging();

//       // Use the registered service worker for FCM
//       messaging.useServiceWorker(registration);

//       // Request FCM token
//       messaging
//         .getToken({
//           vapidKey:
//             "BH7hrqIubMGz8HLw7cmYF_v1zuRrMKeO79LGmzuzabf68yMBlQXQ_W5gik6VO0pnKLu6K7GTDrBkbGNiv6x",
//         }) // Replace with your VAPID key from Firebase
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log("FCM Token:", currentToken);
//             // Send the token to your server or use it to send notifications
//           } else {
//             console.log(
//               "No registration token available. Request permission to generate one."
//             );
//           }
//         })
//         .catch((err) => {
//           console.error("An error occurred while retrieving token. ", err);
//         });
//     })
//     .catch((err) => {
//       console.error("Service Worker registration failed:", err);
//     });
// }

// messaging.onMessage((payload) => {
//   console.log("Message received. ", payload);

//   // Display notification or update UI in foreground
//   alert(
//     `Notification received: ${payload.notification.title} - ${payload.notification.body}`
//   );
// });

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const database = firebase.database();
// const googleProvider = new firebase.auth.GoogleAuthProvider();

export { db, database, messaging, analytics, perf,remoteConfig };
