<script setup>
import {ref} from "vue";
import axios from "axios";


const email = ref("");
const password = ref("");
const role = ref("");
const isRegister = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

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

    if (response.status === 201 && isRegister.value) {
      successMessage.value = response.data.message;
    } else if (!isRegister.value) {
      successMessage.value = "Вход выполнен успешно!";
      const token = response.data.token;
      localStorage.setItem("token", token);
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
      <h2>{{ isRegister ? "Регистрация" : "Вход" }}</h2>
      <q-form @submit.prevent="submitForm" class="auth-form">
        <q-input
          v-model="email"
          label="Email"
          type="email"
          :rules="['required', 'email']"
          outlined
          dense
          clearable
          class="form-field"
        />
        <q-input
          v-model="password"
          label="Пароль"
          type="password"
          :rules="['required']"
          outlined
          dense
          clearable
          class="form-field"
        />
        <div v-if="isRegister">
          <q-select
            v-model="role"
            label="Роль"
            :options="['admin', 'doctor', 'patient']"
            outlined
            dense
            clearable
            class="form-field"
          />
        </div>
        <q-btn
          type="submit"
          :label="isRegister ? 'Зарегистрироваться' : 'Войти'"
          color="primary"
          unelevated
          class="submit-btn"
        />
      </q-form>
      <p class="toggle-text">
        {{ isRegister ? "Уже есть аккаунт?" : "Еще нет аккаунта?" }}
        <a href="#" @click.prevent="toggleMode" class="toggle-link">
          {{ isRegister ? "Войти" : "Зарегистрироваться" }}
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
  min-height: 100vh;
  background: linear-gradient(135deg, #1e88e5, #6ab7ff);
  font-family: "Roboto", sans-serif;
}

.auth-box {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
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
  font-size: 0.9rem;
  color: #666;
}

.toggle-link {
  color: #1e88e5;
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
  color: #388e3c;
  font-size: 0.9rem;
  margin-top: 1rem;
}
</style>
