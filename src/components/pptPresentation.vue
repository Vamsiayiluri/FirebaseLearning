<template>
  <div id="app">
    <form @submit.prevent="setData" class="form-container">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="name" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <input id="role" v-model="role" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="id">Id:</label>
        <input id="id" v-model="id" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="image">Upload Image:</label>
        <input type="file" id="image" @change="handleImageUpload" class="form-input" />
      </div>
      <button type="submit" class="form-button">Add</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebaseinit";

export default {
  name: "pptPresentation",
  data() {
    return {
      name: "",
      role: "",
      id: "",
      image: null,
      imageUrl: "",
    };
  },
  methods: {
    handleImageUpload(event) {
      this.image = event.target.files[0];
    },
    async setData() {
      if (!this.image) {
        alert("Please upload an image.");
        return;
      }
      
      try {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(this.image.name);
        const snapshot = await imageRef.put(this.image);
        this.imageUrl = await snapshot.ref.getDownloadURL();

        await db.collection("employees").doc(this.id).set({
          name: this.name,
          role: this.role,
          id: this.id,
          imageUrl: this.imageUrl,
        });

        this.name = "";
        this.role = "";
        this.id = "";
        this.image = null;
        alert("Data successfully added!");
      } catch (error) {
        console.error("Error uploading image or saving data:", error);
        alert("Failed to upload image or save data. Please try again.");
      }
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

.form-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #0056b3;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
