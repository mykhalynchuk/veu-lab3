<script setup lang="ts">
import Users from './components/Users.vue';
</script>

<template>
  <main class="app-container">
    <Users />
  </main>
</template>

<style>
body {
  background-color: #f9fafb;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.app-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
</style>
