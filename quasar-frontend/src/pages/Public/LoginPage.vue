<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useQuasar } from "quasar";

const email = ref("");
const password = ref("");
const fullName = ref("");
const isRegister = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const $q = useQuasar();

const isDarkMode = computed(() => $q.dark.isActive);
const router = useRouter();

const submitForm = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  const url = isRegister.value
    ? "http://localhost:3001/auth/register"
    : "http://localhost:3001/auth/login";

  const data = isRegister.value
    ? { email: email.value, password: password.value, fullName: fullName.value }
    : { email: email.value, password: password.value };

  try {
    const response = await axios.post(url, data);

    if (isRegister.value) {
      if (response.status === 201) {
        successMessage.value = response.data.message;
        isRegister.value = false; // Переключаем на форму входа
      }
    } else {
      if (response.status === 200) {
        successMessage.value = "Вход выполнен успешно!";
        const { token, roleId } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("roleId", roleId);

        await router.push("/dashboard/main");
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
  <q-page class="auth-container">
    <div class="auth-box" :class="{ dark__secondary: isDarkMode }">
      <h4 class="text-grey1">{{ isRegister ? "Registration" : "Login" }}</h4>
      <q-form @submit.prevent="submitForm" class="auth-form">
        <q-input
          v-if="isRegister"
          v-model="fullName"
          label="Full Name"
          type="text"
          :rules="['required']"
          bg-color="white"
          outlined
          dense
          clearable
          class="form-field"
        />
        <q-input
          v-model="email"
          label="Email"
          type="email"
          :rules="['required', 'email']"
          :bg-color="isDarkMode ? '' : 'white'"
          clearable
          class="form-field"
          outlined
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          :rules="['required']"
          :bg-color="isDarkMode ? '' : 'white'"
          outlined
          clearable
          class="form-field"
        />
        <q-btn
          type="submit"
          :label="isRegister ? 'Sign Up' : 'Sign In'"
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
  </q-page>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}

.auth-box {
  background: rgba(1, 148, 230, 1);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  width: 100%;
  max-width: 400px;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
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
  color: rgb(0, 49, 246);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.toggle-link:hover {
  text-decoration: underline;
}

.error-text {
  color: #ff0505;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.success-text {
  color: #49ff51;
  font-size: 0.9rem;
  margin-top: 1rem;
}
</style>
