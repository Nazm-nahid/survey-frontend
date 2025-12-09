<template>
  <header class="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-50">
    
    <div class="flex items-center space-x-2 cursor-pointer">
      <img src="https://jorip.pathao.com/_next/static/images/logo_white-512-436d564936f348fec27c83f16fa1b70c.png" alt="Logo" class="h-8 w-auto" />
    </div>

    <div class="flex items-center space-x-4">
      
      <div class="flex items-center space-x-2">
        <i class="fas fa-user"></i>
        <span class="font-medium text-gray-700">
          {{ user.name }}
        </span>
      </div>

      <button
        @click="logout"
        class="px-1 py-1 bg-black text-white rounded-md hover:bg-red-600 transition"
      >
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>

  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const user = {
  name: "John Doe", // Example user
}

function logout() {
  auth.logout();
  try { navigateTo("/login"); } catch (e) { /* ignore if not in Nuxt */ }
}
</script>
