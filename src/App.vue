<template>
  <div id="app">
    <!-- <PDFViewer /> -->
    <compound-queries />
    <real-time-database-sample/>
    <fire-authentication />
  </div>
</template>

<script>
import CompoundQueries from './components/CompoundQueries.vue';
import RealTimeDatabaseSample from './components/realTimeDatabaseSample.vue';
import FireAuthentication from './fireAuthentication.vue';
// import PDFViewer from './components/PDFViewer.vue';

export default {
  name: 'App',
  components: {
    // PDFViewer,
    CompoundQueries,
    RealTimeDatabaseSample,
    FireAuthentication
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
