<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm px-3 py-4 rounded-2xl">
      <!-- Title -->
      <h1 class="text-2xl font-bold text-center text-gray-900">
        Sign up with Email
      </h1>

      <!-- Form -->
      <form @submit.prevent="registerUser" class="mt-8 space-y-4">
        <!-- Firstname and Surname -->
        <div class="flex space-x-2">
          <input
            type="text"
            placeholder="Firstname"
            v-model="form.firstname"
            class="w-1/2 px-4 py-3 rounded-xl bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
            required
          />
          <input
            type="text"
            placeholder="Surname"
            v-model="form.surname"
            class="w-1/2 px-4 py-3 rounded-xl bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <input
            type="email"
            placeholder="Email Address"
            v-model="form.email"
            class="w-full px-4 py-3 rounded-xl bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <input
            type="password"
            placeholder="Password"
            v-model="form.password"
            class="w-full px-4 py-3 rounded-xl bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
            required
          />
        </div>

        <!-- Create Account Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Create Account</span>
          <span v-else>Creating...</span>
        </button>

        <!-- Terms -->
        <p class="text-center text-gray-500 text-sm mt-3">
          By signing up, you agree to our
          <a href="#" class="text-gray-800 font-medium hover:underline">
            Terms &amp; Conditions.
          </a>
        </p>

        <!-- Already have an account -->
        <p class="text-center text-gray-500 text-sm">
          Have an account already?
          <router-link to="/" class="text-gray-800 font-medium hover:underline">
            Log in
          </router-link>
        </p>
      </form>

      <!-- Success or Error Message -->
      <p v-if="successMessage" class="text-green-600 text-center mt-4">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-600 text-center mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  firstname: '',
  surname: '',
  email: '',
  password: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// 🧠 API URL (adjust this to match your Laravel backend)
const API_URL = 'http://127.0.0.1:8000/api/register'

const registerUser = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await axios.post(API_URL, {
      firstname: form.value.firstname,
      surname: form.value.surname,
      email: form.value.email,
      password: form.value.password
    })

    // handle success
    successMessage.value = 'Account created successfully!'
    console.log('✅ Response:', response.data)

    // optionally redirect after 2s
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  } catch (error) {
    console.error('❌ Error:', error)
    errorMessage.value =
      error.response?.data?.message || 'Failed to create account. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
