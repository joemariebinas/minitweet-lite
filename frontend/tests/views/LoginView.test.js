import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginView from '@/views/LoginView.vue'
import axios from 'axios'
import { createRouter, createMemoryHistory } from 'vue-router'

// Mock axios
vi.mock('axios')

// Mock routes used in LoginView
const routes = [
  { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
  { path: '/register', name: 'Register', component: { template: '<div>Register</div>' } },
  { path: '/feed', name: 'Feed', component: { template: '<div>Feed</div>' } }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

describe('LoginView.vue', () => {
  let wrapper

  beforeEach(async () => {
    // Push to initial route
    router.push('/')
    await router.isReady()

    wrapper = mount(LoginView, {
      global: { plugins: [router] }
    })
  })

  it('renders email and password inputs', () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('renders Log In button and Create Account link', () => {
    expect(wrapper.find('button[type="submit"]').text()).toBe('Log In')
    expect(wrapper.find('a').text()).toBe('Create Account')
  })

  it('displays error message when login fails', async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } }
    })

    await wrapper.find('input[type="text"]').setValue('wrong@example.com')
    await wrapper.find('input[type="password"]').setValue('wrongpass')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text()).toContain('Invalid credentials')
    expect(wrapper.vm.loading).toBe(false)
  })

  it('stores token & user and redirects on successful login', async () => {
    const fakeUser = { id: 1, firstname: 'John', surname: 'Doe', email: 'john@example.com' }
    axios.post.mockResolvedValue({
      data: { token: 'fake-token', user: fakeUser }
    })

    localStorage.clear()

    await wrapper.find('input[type="text"]').setValue('john@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    // Wait for axios and router navigation to complete
    await flushPromises()
    await router.isReady()

    expect(localStorage.getItem('token')).toBe('fake-token')
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(fakeUser)
    expect(wrapper.vm.loading).toBe(false)
    expect(router.currentRoute.value.fullPath).toBe('/feed')
  })
})
