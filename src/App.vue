<template>
  <div id="app">
    <!-- <PDFViewer /> -->
    <compound-queries />
  </div>
</template>

<script>
import CompoundQueries from './components/CompoundQueries.vue';
// import PDFViewer from './components/PDFViewer.vue';

export default {
  name: 'App',
  components: {
    // PDFViewer,
    CompoundQueries
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
