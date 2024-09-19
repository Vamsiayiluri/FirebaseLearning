<template>
  <div id="app">
    <button @click="deleteData">Delete data</button>
    <button @click="deletefield">Delete field</button>
  </div>
</template>

  <script>
// import db from "./firebaseinit.js";
import db from "../firebaseinit";
import firebase from "firebase";
export default {
  name: "App",
  methods: {
    async deleteData() {
      await db.collection("cities")
        .doc("DC")
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          console.log('success');

        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    async deletefield() {
      var cityRef = await db.collection("cities").doc("BJ");

      // Remove the 'capital' field from the document
      var removeCapital = cityRef.update({
        capital: firebase.firestore.FieldValue.delete(),
      });
      console.log(removeCapital)
      console.log('success');

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
  
  
  