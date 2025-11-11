<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm px-6 py-8 bg-white rounded-2xl shadow-sm">
      <h1 class="text-2xl font-bold text-center text-gray-900">Welcome to MiniTweet</h1>
      <p class="text-center text-gray-500 text-sm mt-2">
        Connect with friends in 20 characters or less
      </p>

      <form class="mt-8 space-y-4">
        <!-- Email / Username -->
        <div>
          <input
            type="text"
            placeholder="Email or Username"
            class="w-full px-4 py-3 rounded-xl bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <!-- Password -->
        <div>
          <input
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 rounded-xl bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <!-- Log In Button -->
        <button
          type="submit"
          class="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Log In
        </button>

        <!-- Create Account -->
        <button
          type="button"
          class="w-full border border-gray-300 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
// You can add login logic here later
</script>
