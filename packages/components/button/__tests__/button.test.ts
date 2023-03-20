import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'
import { describe, expect, bench, assert, test } from 'vitest'
import { h } from 'vue'
describe('Button.vue', () => {
  test('slots', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'hello word'
      }
    })
    expect(wrapper.text()).toContain('hello word')
  })
  test('size', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'small'
      }
    })
    expect(wrapper.classes()).toContain('x-button--small')
  })
  test('type', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('x-button--primary')
  })
  test('plain', () => {
    const wrapper = mount(Button, {
      props: {
        plain: true
      }
    })
    expect(wrapper.classes()).toContain('is-plain')
  })
  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
  test('handle click', () => {
    const wrapper = mount(Button)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  test('handle click inside', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => h('span', 'hello')
      }
    })
    wrapper.find('span').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
