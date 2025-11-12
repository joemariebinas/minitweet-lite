<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Header -->
    <header class="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h1 class="text-xl font-bold">MiniTweet</h1>

      <div class="flex items-center space-x-4">
        <!-- User Avatar -->
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User Avatar"
          class="w-8 h-8 rounded-full border"
        />

        <!-- Logout Button -->
        <button
          @click="logout"
          class="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
        >
          <i class="fa-solid fa-right-from-bracket text-lg"></i>
          <span class="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex flex-col items-center mt-10 space-y-6 px-4">
      <!-- Tweet Box -->
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-5">
        <div class="flex space-x-3">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User Avatar"
            class="w-10 h-10 rounded-full"
          />
          <div class="flex-1">
            <textarea
              v-model="tweet"
              placeholder="What's happening?"
              maxlength="20"
              class="w-full resize-none bg-gray-100 rounded-xl p-3 text-sm focus:outline-none"
            ></textarea>

            <div class="flex justify-between items-center text-xs text-gray-400 mt-2">
              <span>{{ 20 - tweet.length }} characters remaining</span>

              <button
                @click="postTweet"
                class="flex items-center space-x-2 bg-black text-white text-sm px-4 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                <i class="fa-solid fa-paper-plane text-white"></i>
                <span>Tweet</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Feed -->
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-5"
      >
        <div class="flex items-start space-x-3">
          <img
            :src="post.avatar"
            alt="User Avatar"
            class="w-10 h-10 rounded-full"
          />
          <div class="flex-1">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-semibold text-sm">{{ post.name }}</p>
                <p class="text-xs text-gray-400">{{ post.time }}</p>
              </div>
            </div>
            <p class="text-sm text-gray-800 mt-2">{{ post.content }}</p>

            <div class="flex space-x-4 mt-3 text-sm text-gray-500">
              <button
                class="flex items-center space-x-1 hover:text-red-500 transition"
              >
                <i class="fa-regular fa-heart"></i>
                <span>{{ post.likes }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tweet = ref('')

const posts = ref([
  {
    name: 'Hazel Brook',
    time: '2h ago',
    content: 'Just tried the new Gelato shop on Bleecker - Pistachio is a must! 😋✨ #nycfoodie',
    likes: 164,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Jamie F.',
    time: '3h ago',
    content: "Don't miss the new exhibit at the Met! So inspiring! ✨ #artlover",
    likes: 27,
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
  },
  {
    name: 'Jamie F.',
    time: '3h ago',
    content: "Don't miss the new exhibit at the Met! So inspiring! ✨ #artlover",
    likes: 27,
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
  }
])

function postTweet() {
  if (!tweet.value.trim()) return
  posts.value.unshift({
    name: 'You',
    time: 'Just now',
    content: tweet.value,
    likes: 0,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  })
  tweet.value = ''
}

function logout() {
  router.push('/')
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

body {
  font-family: 'Inter', sans-serif;
}
</style>
