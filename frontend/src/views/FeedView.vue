<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Header -->
    <header class="flex justify-between items-center px-6 py-4 bg-white shadow-sm font-poppins">
      <h1 class="text-xl font-bold">MiniTweet</h1>
      <div class="flex items-center space-x-4">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User Avatar"
          class="w-8 h-8 rounded-full border"
        />
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
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-5 font-poppins">
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
              maxlength="280"
              class="w-full resize-none bg-gray-100 rounded-xl p-3 text-sm focus:outline-none"
            ></textarea>

            <div class="flex justify-between items-center text-xs text-gray-400 mt-2">
              <span>{{ 280 - tweet.length }} characters remaining</span>
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
        :key="post.id"
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
                @click="toggleLike(post)"
                :class="{ 'text-red-500': post.liked }"
                class="flex items-center space-x-1 hover:text-red-500 transition"
              >
                <i :class="post.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const tweet = ref('')
const posts = ref([])

// Set Axios base URL and token
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

// Fetch tweets from backend
const fetchTweets = async () => {
  try {
    const res = await axios.get('/tweets')
    posts.value = res.data.map(tweet => ({
      id: tweet.id,
      name: tweet.user.firstname + ' ' + tweet.user.surname,
      time: new Date(tweet.created_at).toLocaleTimeString(),
      content: tweet.content,
      likes: tweet.likes_count,
      liked: tweet.liked_by_user,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg' 
    }))
  } catch (err) {
    console.error('Error fetching tweets:', err)
  }
}

// Post a new tweet
const postTweet = async () => {
  if (!tweet.value.trim()) return

  try {
    const res = await axios.post('/tweets', { content: tweet.value })
    const newTweet = res.data
    posts.value.unshift({
      id: newTweet.id,
      name: newTweet.user.firstname + ' ' + newTweet.user.surname,
      time: 'Just now',
      content: newTweet.content,
      likes: 0,
      liked: false,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    })
    tweet.value = ''
  } catch (err) {
    console.error('Error posting tweet:', err)
  }
}

// Like / Unlike a tweet
const toggleLike = async (post) => {
  try {
    if (!post.liked) {
      await axios.post(`/tweets/${post.id}/like`)
      post.likes++
      post.liked = true
    } else {
      await axios.delete(`/tweets/${post.id}/like`)
      post.likes--
      post.liked = false
    }
  } catch (err) {
    console.error('Error liking/unliking tweet:', err)
  }
}

// Logout
const logout = async () => {
  try {
    // Optionally tell backend to revoke the token
    await axios.post('/logout')  // see backend step below

    // Clear localStorage
    localStorage.removeItem('token')

    // Redirect to login
    router.replace('/')  // replace prevents going back
  } catch (err) {
    console.error('Logout failed', err)
  }
}

onMounted(() => {
  fetchTweets()
})
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
