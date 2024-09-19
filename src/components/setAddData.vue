<template>
  <div id="app">
    <button @click="setData">set data</button><br>
    <button @click="MergeData">Merge data</button><br>
    <button @click="setnewData">setnewData data</button><br>
    <button @click="AddData">AddData</button><br>
    <button @click="UpdateData">UpdateData</button><br>
    <button @click="UpdateInternalData">UpdateInternalData</button><br>
    <button @click="UpdateField">UpdateField</button>
  </div>
</template>
  
<script>
// import db from "./firebaseinit.js";
import firebase from "../firebaseinit";
export default {
  name: "App",
  methods: {
    async setData() {
      await firebase.firestore().collection("cities")
        .doc("LA")
        .set({
          name: "Los Angeles",
          state: "CA",
          country: "USA",
        })
        .then(() => {
          console.log("Document successfully written!");
          console.log('success');

        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        })
    },
    async MergeData() {
      var cityRef = await firebase.firestore().collection("cities").doc("BJ");

      var setWithMerge = cityRef.set(
        {
          capital: true,
        },
        { merge: true }
      );
      console.log(setWithMerge);
      console.log('success');

    },
    async setnewData() {
      var docData = {
        stringExample: "Hello world!",
        booleanExample: true,
        numberExample: 3.14159265,

        arrayExample: [5, true, "hello"],
        nullExample: null,
        objectExample: {
          a: 5,
          b: {
            nested: "foo",
          },
        },
      };
      await firebase.firestore().collection("data")
        .doc("one")
        .set(docData)
        .then(() => {
          console.log("Document successfully written!");
          console.log('success');

        });
    },
    async AddData() {
      await firebase.firestore().collection("cities")
        .add({
          name: "Tokyo",
          country: "Japan",
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          console.log('success');

        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    async UpdateData() {
      var washingtonRef = await firebase.firestore().collection("cities").doc("DC");

      // Set the "capital" field of the city 'DC'
      return washingtonRef
        .update({
          capital: true,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    async UpdateInternalData() {
      var frankDocRef = await firebase.firestore().collection("users").doc("frank");
      frankDocRef.set({
        name: "Frank",
        favorites: { food: "Pizza", color: "Blue", subject: "recess" },
        age: 12,
      });

      // To update age and favorite color:
      await firebase.firestore().collection("users")
        .doc("frank")
        .update({
          age: 13,
          "favorites.color": "Red",
        })
        .then(() => {
          console.log("Document successfully updated!");
        });
    },
    async UpdateField() {
      await firebase.firestore().collection("users")
        .doc("frank")
        .set({
          name: "Frank",
          favorites: {
            food: "Pizza",
            color: "Blue",
            subject: "Recess",
          },
          age: 12,
        })
        .then(function () {
          console.log("Frank created");
        });

      // Update the doc without using dot notation.
      // Notice the map value for favorites.
      await firebase.firestore().collection("users")
        .doc("frank")
        .update({
          favorites: {
            food: "Ice Cream",
          },
        })
        .then(function () {
          console.log("Frank food updated");
        });
    },
  },
};
</script>
  
  <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
  
  
  