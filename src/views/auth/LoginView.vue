<template>
  <div class="login">
    <h1>Login Page</h1>
    <form @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required/>
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" required/>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = () => {
  if (email.value && password.value) {
    localStorage.setItem('token', 'demoToken')
    router.push('/')
  } else {
    alert('Please enter credentials')
  }
}
</script>
