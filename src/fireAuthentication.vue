<template>
  <div id="app">
    <input type="checkbox" v-model="checkedItem" value="Option 1" />
    <div v-if="checkedItem" class="auth-container">
      <!-- Display buttons for selecting login or signup form -->
      <div class="auth-buttons">
        <button @click="formType('login')">Login</button>
        <button @click="formType('signup')">Signup</button>
        <button @click="formType('get')">Add data</button>
      </div>

      <!-- Login Form -->
      <div v-if="type === 'login' && !loginSuccess" class="form-container">
        <h2>Login</h2>
        <form @submit.prevent="login" v-if="!emailNotVerified">
          <div class="form-group">
            <label for="login-email">Email:</label>
            <input
              id="login-email"
              v-model="loginEmail"
              type="email"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="login-password">Password:</label>
            <input
              id="login-password"
              v-model="loginPassword"
              type="password"
              required
              class="form-input"
            />
          </div>
          <button type="submit" class="form-button">Login</button>
        </form>
        <p v-if="emailNotVerified" class="error-message">
          Please verify your email before logging in.
        </p>
      </div>

      <!-- Signup Form -->
      <div v-if="type === 'signup' && !loginSuccess" class="form-container">
        <div>
          <h2>Sign Up</h2>
          <form @submit.prevent="signUp" v-if="!emailSent">
            <div class="form-group">
              <label for="signup-email">Email:</label>
              <input
                id="signup-email"
                v-model="signupEmail"
                type="email"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="signup-password">Password:</label>
              <input
                id="signup-password"
                v-model="signupPassword"
                type="password"
                required
                class="form-input"
              />
            </div>

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
              <input
                type="file"
                id="image"
                @change="handleImageUpload"
                class="form-input"
              />
            </div>
            <button type="submit" class="form-button">Sign Up</button>
          </form>
        </div>
        <p v-if="emailSent" class="info-message">
          Verification email sent. Please check your email and verify your
          account.
        </p>
      </div>

      <!-- Welcome Message and Employee Data After Login -->
      <div v-if="loginSuccess && !isRegistering" class="welcome-container">
        <h1>Welcome, {{ employeeData.name }}</h1>
        <h2>Your Role: {{ employeeData.role }}</h2>
        <div class="employee-details">
          <p><strong>EMP ID:</strong> {{ employeeData.id }}</p>
          <img
            :src="employeeData.imageUrl"
            alt="Employee Image"
            v-if="employeeData.imageUrl"
            class="employee-image"
          />
        </div>
        <button @click="logout" class="form-button">Logout</button>
      </div>
    </div>
    <div v-else>
      <div class="login-container">
        <h1>Firebase Auth - Login</h1>
        <button @click="loginWithGoogle" class="login-btn">
          Login with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { db, database } from "./firebaseinit";

export default {
  data() {
    return {
      type: "", // Type of form: 'login' or 'signup'
      loginEmail: "",
      loginPassword: "",
      signupEmail: "",
      signupPassword: "",
      loginSuccess: false, // Indicates if the user is logged in
      isRegistering: false, // Indicates if the user is registering
      name: "",
      role: "",
      id: "",
      image: null,
      imageUrl: "",
      employeeData: {}, // Store employee data after login
      emailNotVerified: false, // Flag to show if email is not verified
      emailSent: false,
      checkedItem: false,
    };
  },
  methods: {
    // Set the form type to login or signup
    async formType(type) {
      this.type = type;
      if (type === "get") {
        database
          .ref("users/user1")
          .set({
            name: "John Doe",
            age: 30,
            country: "USA",
          })
          .then(() => {
            console.log("Data inserted successfully");
          })
          .catch((error) => {
            console.error("Error inserting data: ", error);
          });
      }
    },
    // Handle image upload
    handleImageUpload(event) {
      this.image = event.target.files[0];
    },
    // Login method
    async login() {
      try {
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(this.loginEmail, this.loginPassword);
        console.log("User logged in");

        // Fetch employee data
        const user = userCredential.user;
        if (!user.emailVerified) {
          this.emailNotVerified = true;
          await firebase.auth().signOut();
          return;
        }
        const doc = await db.collection("employees").doc(user.uid).get();
        if (doc.exists) {
          this.employeeData = doc.data();
          this.loginSuccess = true;
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        alert("Invalid credentials");
        console.error("Login error:", error.message);
      }
    },
    async loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider(); // Initialize Google provider
      try {
        console.log('1')
        await firebase.auth().signInWithRedirect(provider); // Trigger the Google redirect
        
        const user = firebase.auth().currentUser
         console.log(user,'checking user')

      } catch (error) {
        console.error("Error during Google sign-in redirect:", error);
      }
    },
    async checkRedirectResult() {
      try {
        console.log('checking')
        // Handle the result after redirect
        const result = await firebase.auth().getRedirectResult();
        console.log(result,'checking')
         const user = firebase.auth().currentUser
         console.log(user,'checking user')
        if (result.user) {
          const user = result.user; // Get user information from result
          console.log("User Info after redirect:", user);
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    },
  },
  // Signup method
  async signUp() {
    this.isRegistering = true;
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.signupEmail, this.signupPassword);
      const user = userCredential.user;
      const actionCodeSettings = {
        url: "http://localhost:8082/", // Your login page or another route
        handleCodeInApp: true, // Ensures the email link opens within your app
      };

      await user.sendEmailVerification(actionCodeSettings);
      this.emailSent = true;
      await this.uploadEmployeeData(user.uid);
      this.isRegistering = false;
      console.log("User signed up");
    } catch (error) {
      console.error("Signup error:", error.message);
      this.isRegistering = false;
    }
  },
  // Upload employee data
  async uploadEmployeeData(uid) {
    if (!this.image) {
      return;
    }
    try {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(this.image.name);
      const snapshot = await imageRef.put(this.image);
      this.imageUrl = await snapshot.ref.getDownloadURL();

      await db.collection("employees").doc(uid).set({
        name: this.name,
        role: this.role,
        id: this.id,
        imageUrl: this.imageUrl,
      });

      this.name = "";
      this.role = "";
      this.id = "";
      this.image = null;
    } catch (error) {
      console.error("Error uploading image or saving data:", error);
      alert("Failed to upload image or save data. Please try again.");
    }
  },
  // Logout method
  async logout() {
    try {
      await firebase.auth().signOut();
      this.loginSuccess = false;
      this.type = "";
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  },

  mounted() {
    // Check if the redirect result is available when the component is mounted
    console.log('cheking')
    this.checkRedirectResult();
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.auth-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.auth-buttons button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.auth-buttons button:hover {
  background-color: #45a049;
}

.form-container {
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus {
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
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: #0056b3;
}

.welcome-container {
  text-align: center;
}

.welcome-container h1,
.welcome-container h2 {
  margin-bottom: 20px;
}

.employee-details {
  text-align: left;
  margin: 20px 0;
}

.employee-details p {
  margin: 5px 0;
}

.employee-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 8px;
}
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.login-btn {
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background-color: #4285f4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #357ae8;
}
</style>
