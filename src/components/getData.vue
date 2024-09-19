<template>
  <div id="app">
    <button @click="SetData">Set data</button>

    <button @click="GetData">Get data</button>
    <button @click="GetMultipleData">GetMultipleData</button>
    <button @click="GetAllData">Get all data</button>
  </div>
</template>
  
    <script>
// import db from "./firebaseinit.js";
import db from "../firebaseinit";
export default {
  name: "App",
  methods: {
    async SetData() {
      var citiesRef = await db.collection("cities");

      citiesRef.doc("SF").set({
        name: "San Francisco",
        state: "CA",
        country: "USA",
        capital: false,
        population: 860000,
        regions: ["west_coast", "norcal"],
      });
      citiesRef.doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        capital: false,
        population: 3900000,
        regions: ["west_coast", "socal"],
      });
      citiesRef.doc("DC").set({
        name: "Washington, D.C.",
        state: null,
        country: "USA",
        capital: true,
        population: 680000,
        regions: ["east_coast"],
      });
      citiesRef.doc("TOK").set({
        name: "Tokyo",
        state: null,
        country: "Japan",
        capital: true,
        population: 9000000,
        regions: ["kanto", "honshu"],
      });
      citiesRef.doc("BJ").set({
        name: "Beijing",
        state: null,
        country: "China",
        capital: true,
        population: 21500000,
        regions: ["jingjinji", "hebei"],
      });
    },
    async GetData() {
      var docRef = await db.collection("cities").doc("SF");

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            console.log('success');

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
    async GetMultipleData() {
      await db.collection("cities")
        .where("capital", "==", true)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log('success');

          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    async GetAllData() {
      await db.collection("cities")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log('success');

          });
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
    
    
    