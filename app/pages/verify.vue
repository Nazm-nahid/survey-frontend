<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const auth = useAuthStore();
const code = ref("");
const email = ref("");

async function verify() {
  
  await auth.verify(code.value, email.value);
  // keep your navigation call as-is (nuxt's navigateTo or router push)
  try { navigateTo("/login"); } catch (e) { /* ignore if not in Nuxt */ }
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

      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-6">Verify Email</h2>

      <form @submit.prevent="verify" class="space-y-5">
        <div>
          <label class="block text-sm text-gray-700 mb-2">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            v-model="email"
            placeholder="example@email.com"
            required
            class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300
                   shadow-[inset_0_1px_0_rgba(16,24,40,0.03)] transition"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-2">
            Verification Code <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            v-model="code"
            placeholder="*****"
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
          Verify
        </button>
      </form>

      <p class="text-center text-gray-500 text-sm mt-5">
        Already Verified?
        <a href="/login" class="text-teal-600 font-medium hover:underline ml-1">Sign in</a>
      </p>
    </div>
  </div>
</template>