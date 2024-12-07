<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const email = ref("");
const password = ref("");
const role = ref("");
const isRegister = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const router = useRouter();

const submitForm = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  const url = isRegister.value
    ? "http://localhost:3001/auth/register"
    : "http://localhost:3001/auth/login";

  const data = isRegister.value
    ? {email: email.value, password: password.value, role: role.value}
    : {email: email.value, password: password.value};

  try {
    const response = await axios.post(url, data);

    if (isRegister.value) {
      // Если регистрация успешна
      if (response.status === 201) {
        successMessage.value = response.data.message;
        isRegister.value = false; // Переходим на форму входа
      }
    } else {
      // Если вход успешен
      if (response.status === 200) {
        successMessage.value = "Вход выполнен успешно!";
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Перенаправление на /home
        router.push("/");
      }
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Ошибка при выполнении запроса";
  }
};

const toggleMode = () => {
  isRegister.value = !isRegister.value;
  errorMessage.value = "";
  successMessage.value = "";
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <h4 class="text-grey1">{{ isRegister ? "Registration" : "Login" }}</h4>
      <q-form @submit.prevent="submitForm" class="auth-form">
        <q-input
          v-model="email"
          label="Email"
          type="email"
          :rules="['required', 'email']"
          bg-color="white"
          outlined
          dense
          clearable
          class="form-field"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          :rules="['required']"
          bg-color="white"
          outlined
          dense
          clearable
          class="form-field"
        />
        <q-btn
          type="submit"
          label="Sign up"
          color="primary"
          outline
          text-color="white"
          unelevated
          class="submit-btn"
        />
      </q-form>
      <p class="toggle-text text-grey-1">
        {{ isRegister ? "Have an account? " : "Don't have an account?" }}
        <a href="#" @click.prevent="toggleMode" class="toggle-link">
          {{ isRegister ? "Sign in" : "Sign up" }}
        </a>
      </p>
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-text">{{ successMessage }}</p>
    </div>
  </div>
</template>


<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background: #ffffff;
  font-family: "Roboto", sans-serif;
}

.auth-box {
  background: linear-gradient(to bottom, #1F2B6C, #3A4A9D);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #000;
  text-align: center;
  width: 100%;
  max-width: 400px;
  color: white;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-field {
  margin-bottom: 1rem;
}

.submit-btn {
  margin-top: 1rem;
  font-size: 1rem;
}

.toggle-text {
  margin-top: 1rem;
  font-size: 1rem;
  color: #666;
}

.toggle-link {
  color: rgb(0, 149, 246);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.toggle-link:hover {
  text-decoration: underline;
}

.error-text {
  color: #d32f2f;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.success-text {
  color: #49ff51;
  font-size: 0.9rem;
  margin-top: 1rem;
}
</style>
