import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import FeedView from '@/views/FeedView.vue'
import axios from 'axios'
import { createRouter, createMemoryHistory } from 'vue-router'

vi.mock('axios')

// Simple router mock for logout
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', name: 'Login' }]
})

describe('FeedView.vue', () => {
  let wrapper

  const mockTweets = [
    {
      id: 1,
      user: { firstname: 'John', surname: 'Doe' },
      content: 'Hello world',
      likes: 2,
      liked: false,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      user: { firstname: 'Jane', surname: 'Smith' },
      content: 'Another tweet',
      likes: 5,
      liked: true,
      created_at: new Date().toISOString()
    }
  ]

  beforeEach(async () => {
    axios.get.mockResolvedValue({ data: mockTweets })
    wrapper = mount(FeedView, {
      global: {
        plugins: [router]
      }
    })
    await flushPromises() // wait for onMounted fetchTweets
  })

  it('fetches and displays tweets on mount', () => {
    const tweetContents = wrapper.findAll('p.text-sm.text-gray-800')
    expect(tweetContents.length).toBe(mockTweets.length)
    expect(tweetContents[0].text()).toBe('Hello world')
    expect(tweetContents[1].text()).toBe('Another tweet')
  })

  it('can post a new tweet', async () => {
    const newTweet = {
      id: 3,
      user: { firstname: 'Test', surname: 'User' },
      content: 'New tweet',
      likes: 0,
      liked: false
    }

    axios.post.mockResolvedValue({ data: newTweet })

    const textarea = wrapper.find('textarea')
    await textarea.setValue('New tweet')
    await wrapper.find('[data-test="tweet-button"]').trigger('click')
    await flushPromises()

    // Verify the new tweet is in posts
    const postedTweet = wrapper.vm.posts.find(p => p.content === 'New tweet')
    expect(postedTweet).toBeTruthy()
    expect(wrapper.vm.tweet).toBe('')
  })

  it('can like a tweet', async () => {
    axios.post.mockResolvedValue({})
    const firstTweet = wrapper.vm.posts[0]
    const initialLikes = firstTweet.likes

    await wrapper.vm.toggleLike(firstTweet)
    expect(firstTweet.liked).toBe(true)
    expect(firstTweet.likes).toBe(initialLikes + 1)
  })

  it('can unlike a tweet', async () => {
    axios.delete.mockResolvedValue({})
    const secondTweet = wrapper.vm.posts[1]
    const initialLikes = secondTweet.likes

    await wrapper.vm.toggleLike(secondTweet)
    expect(secondTweet.liked).toBe(false)
    expect(secondTweet.likes).toBe(initialLikes - 1)
  })

  it('can logout', async () => {
    axios.post.mockResolvedValue({})
    localStorage.setItem('token', 'fake-token')

    await wrapper.vm.logout()
    expect(localStorage.getItem('token')).toBeNull()
  })
})
