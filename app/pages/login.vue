<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const auth = useAuthStore();
const email = ref("");
const password = ref("");

async function login() {
  console.log("Logging in with", email.value, password.value);
  await auth.login(email.value, password.value);
  // keep your navigation call as-is (nuxt's navigateTo or router push)
  try { navigateTo("/surveys"); } catch (e) { /* ignore if not in Nuxt */ }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 relative py-12">
    <!-- top-right moon icon -->
    <div class="absolute top-6 right-6">
      <button aria-label="toggle theme" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </button>
    </div>

    <!-- card -->
    <div
      class="w-full max-w-sm p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgba(2,6,23,0.08)] border border-transparent
             relative"
      style="box-shadow: 0 18px 38px rgba(2,6,23,0.08);"
    >
      <div class="flex justify-center -mt-12 mb-4">
        <!-- small top floating indicator like the example (makes card look elevated) -->
        <img src="https://jorip.pathao.com/_next/static/images/logo_white-512-436d564936f348fec27c83f16fa1b70c.png" class="mb-10 mt-10">
      </div>

      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>

      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="block text-sm text-gray-700 mb-2">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            v-model="email"
            placeholder="test@test.com"
            required
            class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300
                   shadow-[inset_0_1px_0_rgba(16,24,40,0.03)] transition"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-2">
            Password <span class="text-red-500">*</span>
          </label>
          <input
            type="password"
            v-model="password"
            placeholder="••••••••"
            required
            class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300
                   shadow-[inset_0_1px_0_rgba(16,24,40,0.03)] transition"
          />
        </div>

        <button
          type="submit"
          class="w-full .5 rounded-lg border-2 border-teal-400 text-teal-700 font-medium
                 hover:bg-teal-50 transition flex items-center justify-center"
        >
          Sign In
        </button>
      </form>

      <p class="text-center text-gray-500 text-sm mt-5">
        Don't have an account?
        <a href="/register" class="text-teal-600 font-medium hover:underline ml-1">Sign up</a>
      </p>
    </div>
  </div>
</template>

<style>
/* subtle card inner highlight + very soft rounded border like the screenshot */
div[role="presentation"] {}

/* input placeholder color a touch lighter */
input::placeholder {
  color: #cbd5e1; /* tailwind slate-300-ish */
}

/* extra fine-tuning for the card shadow / border radius */
.max-w-sm {
  border-radius: 14px;
}

/* small scale hover to give the floating-card feel */
.max-w-sm:hover {
  transform: translateY(-1px);
  transition: transform 160ms ease;
}

/* tiny focus visual for accessibility */
input:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(56, 178, 172, 0.06);
}
</style>
