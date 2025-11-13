import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import RegisterView from '@/views/RegisterView.vue'
import axios from 'axios'

// ⚡ Must be at the top before using axios in tests
vi.mock('axios')

describe('RegisterView.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(RegisterView)
    vi.clearAllMocks() // reset mocks before each test
  })

  it('renders all input fields and submit button', () => {
    expect(wrapper.find('input[placeholder="Firstname"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Surname"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Email Address"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('displays success message on successful registration', async () => {
    axios.post.mockResolvedValue({ data: { message: 'User created successfully' } })

    await wrapper.find('input[placeholder="Firstname"]').setValue('John')
    await wrapper.find('input[placeholder="Surname"]').setValue('Doe')
    await wrapper.find('input[placeholder="Email Address"]').setValue('john@example.com')
    await wrapper.find('input[placeholder="Password"]').setValue('password123')

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises() // wait for all async updates

    expect(wrapper.text()).toContain('Account created successfully!')
    expect(wrapper.vm.loading).toBe(false)
  })

  it('displays error message on failed registration', async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: 'Email already exists' } }
    })

    await wrapper.find('input[placeholder="Firstname"]').setValue('Jane')
    await wrapper.find('input[placeholder="Surname"]').setValue('Doe')
    await wrapper.find('input[placeholder="Email Address"]').setValue('jane@example.com')
    await wrapper.find('input[placeholder="Password"]').setValue('password123')

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Email already exists')
    expect(wrapper.vm.loading).toBe(false)
  })

  it('disables submit button while loading', async () => {
    axios.post.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ data: {} }), 100)))

    await wrapper.find('input[placeholder="Firstname"]').setValue('Test')
    await wrapper.find('input[placeholder="Surname"]').setValue('User')
    await wrapper.find('input[placeholder="Email Address"]').setValue('test@example.com')
    await wrapper.find('input[placeholder="Password"]').setValue('password123')

    const button = wrapper.find('button[type="submit"]')
    await wrapper.find('form').trigger('submit.prevent')

    // Button should be disabled immediately during loading
    expect(button.element.disabled).toBe(true)
  })
})
