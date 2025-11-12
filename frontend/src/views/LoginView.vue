<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 font-poppins">
    <div class="w-full max-w-sm px-3 py-4 rounded-2xl">
      <h1 class="text-2xl font-bold text-center text-gray-900">Welcome to MiniTweet</h1>
      <p class="text-center text-gray-500 text-sm mt-2">
        Connect with friends in 20 characters or less
      </p>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-4">
        <!-- Email / Username -->
        <div>
          <input
            v-model="form.email"
            type="text"
            placeholder="Email or Username"
            class="w-full px-4 py-3 rounded-xl bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <!-- Password -->
        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 rounded-xl bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <!-- Log In Button -->
        <button
          type="submit"
          class="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Log In' }}
        </button>

        <!-- Create Account -->
        <router-link
          to="/register"
          class="block w-full border border-gray-300 text-center text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
        >
          Create Account
        </router-link>

        <!-- Error Message -->
        <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

// handle login
const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await axios.post("http://localhost:8000/api/login", form.value);

    // Assuming Laravel returns: { token: "...", user: {...} }
    const { token, user } = response.data;

    // Store token in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to feed page
    router.push("/feed");
  } catch (err) {
    if (err.response && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = "Login failed. Please check your credentials.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
