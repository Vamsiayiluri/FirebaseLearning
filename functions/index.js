/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");

const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

const axios = require("axios");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.addmessage = onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = "TESTING ADDMESSAGE";
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});
exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
  // Grab the current value of what was written to Firestore.
  const original = event.data.data().original;

  // Access the parameter `{documentId}` with `event.params`
  logger.log("Uppercasing", event.params.documentId, original);

  const uppercase = original.toUpperCase();

  // You must return a Promise when performing
  // asynchronous tasks inside a function
  // such as writing to Firestore.
  // Setting an 'uppercase' field in Firestore document returns a Promise.
  return event.data.ref.set({ uppercase }, { merge: true });
});
exports.api = functions.https.onRequest(async (req, res) => {
  switch (req.method) {
    case "GET": {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      console.log(response);
      res.send(response.data);
      break;
    }
    case "POST": {
      const body = req.body;
      console.log(req.body);
      res.send(body);
      break;
    }
    case "DELETE": {
      res.send("It is a delete request");
      break;
    }
    default:
      res.send("It is a default request");
  }
});
exports.userAdded = functions.auth.user().onCreate((user) => {
  console.log("New user created:", user.uid);
  return Promise.resolve();
});
exports.userDeleted = functions.auth.user().onDelete((user) => {
  return Promise.resolve();
});
exports.DocAdded = functions.firestore
  .document("/fruits/{documentId}")
  .onCreate((snapshot, context) => {
    return Promise.resolve();
  });
exports.DocUpdated = functions.firestore
  .document("/fruits/{documentId}")
  .onUpdate((snapshot, context) => {
    return Promise.resolve();
  });
exports.DocDeleted = functions.firestore
  .document("/fruits/{documentId}")
  .onDelete((snapshot, context) => {
    return Promise.resolve();
  });
exports.scheduledFunction = functions.pubsub
  .schedule("* * * * *")
  .onRun((context) => {
    return null;
  });
