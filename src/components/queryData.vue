<template>
  <div>
    <button @click="SetData">Set data</button>

    <button @click="GetData">Get data</button>
    <button @click="Queries">Query Data</button>
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
    async Queries() {
      var citiesRef = await db.collection("cities");
      //Not equal (!=)
      const cityrefs = citiesRef.where("capital", "!=", false);
      console.log(cityrefs);
      console.log(cityrefs.docs[0].data());
      //array-contains
      const cityregrefs = citiesRef.where(
        "regions",
        "array-contains",
        "west_coast"
      );
      console.log(cityregrefs.docs[0].data());

      //in
      const citycountryrefs = citiesRef.where("country", "in", [
        "USA",
        "Japan",
      ]);
      console.log(citycountryrefs.docs[0].data());

      const cityregnsrefs = citiesRef.where("regions", "in", [
        ["west_coast"],
        ["east_coast"],
      ]);
      console.log(cityregnsrefs.docs[0].data());

      //not in
      const countryrefs = citiesRef.where("country", "not-in", [
        "USA",
        "Japan",
      ]);
      console.log(countryrefs.docs[0].data());

      //array-contains-any
      const anycountryrefs = citiesRef.where("regions", "array-contains-any", [
        "west_coast",
        "east_coast",
      ]);
      console.log(anycountryrefs.docs[0].data());
      
      //Use multiple where conditions in a single query
      const q1 = citiesRef
        .where("state", "==", "CO")
        .where("name", "==", "Denver");
      console.log(q1.docs[0].data());

      const q2 = citiesRef
        .where("state", "==", "CA")
        .where("population", "<", 1000000);
      console.log(q2.docs[0].data());
      const q3 = citiesRef
        .where("state", ">=", "CA")
        .where("state", "<=", "IN");
      console.log(q3.docs[0].data());
      const q4 = citiesRef
        .where("state", "==", "CA")
        .where("population", ">", 1000000);
      console.log(q4.docs[0].data());
      const q5 = citiesRef.where("state", ">=", "CA").where("population", ">", 100000);
      console.log(q5.docs[0].data());

      //orderby
      const q6=citiesRef.orderBy("name", "desc").limit(3);
      console.log(q6.docs[0].data())

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
      
      
      