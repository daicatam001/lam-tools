<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ConfigProvider } from 'ant-design-vue';
</script>

<template>
  <a-config-provider :theme="{
    token: {
      fontSize: 16,
    },
  }">
    <header class="bg-slate-100 border-b py-4">
      <div class="app-container">
        <h1 class="text-4xl font-bold text-red-500">&#10084; Hello Darling!!! &#10084;</h1>
      </div>
    </header>
    <main class="app-container">
      <RouterView />
    </main>
  </a-config-provider>
</template>

<style scoped></style>
