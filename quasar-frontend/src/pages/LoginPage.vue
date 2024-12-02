<script setup>
import {ref} from 'vue';

const isLogin = ref(true);
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value // Переключаем режим
}

const handleSubmit = () => {
  if (isLogin.value) {
    console.log('Log in:', {email: email.value, password: password.value})
  } else {
    console.log('Register:', {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    })
  }
}
</script>

<template>
  <div class="auth-wrapper">
    <form @submit.prevent="handleSubmit" class="auth-form">
      <h2>{{ isLogin ? 'Sign in' : 'Sign up' }}</h2>

      <transition name="fade">
        <div v-if="!isLogin" class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Your name"
            required
          >
        </div>
      </transition>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Your email"
          required
        >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Your password"
          required
        >
      </div>

      <transition name="fade">
        <div v-if="!isLogin" class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
          >
        </div>
      </transition>

      <div class="switch-link">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
        <a href="#" @click.prevent="toggleAuthMode">
          {{ isLogin ? 'Sign up' : 'Sign in' }}
        </a>
      </div>

      <button type="submit">
        {{ isLogin ? 'Log in' : 'Register' }}
      </button>
    </form>
  </div>
</template>


<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 4rem;
  margin-top: -5rem;
  background-color: #ffffff;
  box-sizing: border-box;
}

.auth-form {
  background-color: #1F2B6C;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

h2 {
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: rgba(255, 255, 255, 0.5);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.switch-link {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  text-align: center;
}

a {
  color: white;
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  opacity: 0.8;
}

button {
  width: 100%;
  padding: 1rem;
  background: white;
  border: none;
  border-radius: 8px;
  color: #2196F3;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background: rgba(255, 255, 255, 0.9);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
