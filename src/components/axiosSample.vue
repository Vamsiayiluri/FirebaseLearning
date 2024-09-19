<template>
    <div id="app">
      <h1>Vue Axios Retry Example</h1>
      <button @click="makeRequest">Make Request</button>
      <div v-if="response">
        <h2>Response:</h2>
        <pre>{{ response }}</pre>
      </div>
      <div v-if="error">
        <h2>Error:</h2>
        <pre>{{ error }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import axiosRetry from 'axios-retry';
  
  export default {
    data() {
      return {
        response: null,
        error: null,
      };
    },
    methods: {
      async makeRequest() {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
          this.response = response.data;
          this.error = null;
        } catch (error) {
          this.response = null;
          this.error = error.message;
        }
      },
    },
    mounted() {
        console.log('hi')
      // Adding axios-retry to Axios instance
      axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
      console.log('bye')
    },
  };
  </script>
  
  <style>
  #app {
    text-align: center;
    margin-top: 60px;
  }
  
  button {
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
  }
  </style>
  