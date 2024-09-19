<template>
  <div id="app">
    <!-- <axios-sample></axios-sample> -->
    <!-- <fire-authentication></fire-authentication> -->
    <!-- <button @click="setData">set data</button>
    <button @click="clickfun">add data</button>
    <button @click="clickget">get data</button>
    <button @click="updateDoc">update data</button>
    <button @click="query">Execute query</button>
    <br>
    <SetAddData></SetAddData>
    <br>
    <delete-data></delete-data>
    <br>
    <QueryData></QueryData>
    <br>
    <get-data></get-data> -->
    <!-- <pptPresentation></pptPresentation> -->
    <fire-authentication></fire-authentication>
        <!-- <set-add-data></set-add-data> -->
<!-- <ppt-presentation></ppt-presentation>  -->
  </div>
</template>

<script>
// import PptPresentation from './components/pptPresentation.vue';
import FireAuthentication from './fireAuthentication.vue';
// import SetAddData from './components/setAddData.vue';
// import AxiosSample from "./components/axiosSample.vue";
// import DeleteData from './components/deleteData.vue';
// import GetData from './components/getData.vue';
// import QueryData from './components/queryData.vue';
// import pptPresentation from "./components/pptPresentation.vue";
// import FireAuthentication from "./fireAuthentication.vue";
import db from "./firebaseinit.js";
export default {
  components: { FireAuthentication    },
  name: "App",

  methods: {
    async clickfun() {
      await db
        .collection("flags")
        .add({
          first: "Alan",
          middle: "Mathison",
          last: "Turing",
          born: 1912,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          4;
          console.log("success");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      alert("success");
    },
    async clickget() {
      await db
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().born}`);
            console.log("success");
          });
        });
    },
    async clickset() {
      // Add a new document in collection "cities"
      await db
        .collection("bugs")
        .doc("LA")
        .set({
          name: "Los Angeles",
          state: "CA",
          country: "USA",
        })
        .then(() => {
          console.log("Document successfully written!");
          console.log("success");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    async clickupdate() {
      // var frankDocRef = db.collection("users").doc("frank");
      // frankDocRef
      //   .set({
      //     name: "Frank",
      //     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
      //     age: 12,
      //   })
      //   .then(() => {
      //     console.log("Document successfully updated!");
      //   });

      // To update age and favorite color:
      await db
        .collection("users")
        .doc("frank")
        .update({
          "favorites.subject": "hvshs",
        })
        .then(() => {
          console.log("Document successfully updated!");
          console.log("success");
        });
    },
    async query() {
      const data1 = await db.collection("icc wc").doc("1st").get();
      const final = data1.data();
      const res = final.middleOrder;
      console.log(res);
      // const firstdown = "iyer";
      const doc = await db
        .collection("icc wc")
        .where("firstdown", "in", "res")
        .get();
      console.log(doc.data());
      console.log("success");
    },
    async addData() {
      let obj = {
        // name: "vamsi",
        // company: "cognine",
        // city: "mylavaram",
        // born: "2001",
        MOM: "",
      };
      await db.collection("icc wc").doc("2st").add(obj);
      console.log("success");
    },
    async setData() {
      let obj = {
        match: "ind vs pak",
        date: "14-10-2023",
        winner: "",
      };
      try {
        await db.collection("icc t20 wc").doc("1st").set(obj);
        console.log("success");
      } catch (e) {
        console.log(e);
      }
    },
    async updateDoc() {
      let indiaPlayers = {
        openers: ["rohit", "gill"],
        firstdown: "kohli",
        middleOrder: ["iyer", "rahul", "pandya"],
      };
      console.log(indiaPlayers);
      await db.collection("icc wc").doc("1st").update(indiaPlayers);
      console.log("success");
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
