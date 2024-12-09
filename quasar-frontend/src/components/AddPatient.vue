<script setup>
import {ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:model-value']);
const internalModal = ref(props.modelValue);
const formRef = ref(null);
const form = ref({
  fullName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: '',
  disabilityStatus: '',
});

watch(() => props.modelValue, (newVal) => {
  internalModal.value = newVal;
});

watch(() => internalModal.value, (newVal) => {
  emit('update:model-value', newVal);
});

const closeDialog = () => {
  internalModal.value = false;
};

const resetForm = () => {
  form.value = {
    email: '',
    fullName: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    disabilityStatus: '',
  };
};

const addPatient = () => {
  formRef.value.validate().then(async (isValid) => {
    if (isValid) {
      try {
        // Преобразуем объекты gender и disabilityStatus в строки
        const payload = {
          ...form.value,
          gender: form.value.gender?.value || '',
          disabilityStatus: form.value.disabilityStatus?.value || '',
        };

        console.log("Добавление пациента:", payload);

        // Отправка данных на сервер
        const response = await axios.post('http://localhost:3001/auth/add-patient', payload);

        console.log("Ответ сервера:", response.data);

        closeDialog();
        resetForm();
        window.location.reload();

      } catch (error) {
        console.error("Ошибка при добавлении пациента:", error);
        alert(error.response?.data?.message || 'Ошибка при добавлении пациента');
      }
    } else {
      console.log("Форма содержит ошибки");
    }
  });
};

</script>

<template>
  <div class="dialog">
    <q-dialog v-model="internalModal" backdrop-filter="brightness(60%)">
      <q-card style="max-width: 800px;">
        <q-card-section>
          <div class="text-h5 text-center q-pt-lg text-primary text-bold" >Добавить пациента</div>
          <div class=" text-center q-mt-sm text-primary">
            Заполните данные для регистрации нового пациента.
          </div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-px-lg" ref="formRef" style="min-width: 472px">
            <div class="row q-col-gutter-md">
              <!-- Левая колонка -->
              <div class="col-6">
                <q-input
                  v-model="form.fullName"
                  label="Полное имя"
                  outlined
                  class="q-mb-md"
                  :rules="[val => !!val || 'Поле обязательно для заполнения']"
                />
                <q-input
                  v-model="form.dateOfBirth"
                  label="Дата рождения"
                  outlined
                  mask="####-##-##"
                  placeholder="ГГГГ-ММ-ДД"
                  class="q-mb-md"
                  :rules="[val => !!val || 'Поле обязательно для заполнения']"
                />
                <q-select
                  v-model="form.gender"
                  label="Пол"
                  :options="[{ label: 'Мужской', value: 'Мужской' }, { label: 'Женский', value: 'Женский' }]"
                  outlined
                  class="q-mb-md"
                  :rules="[val => !!val || 'Поле обязательно для заполнения']"
                />

              </div>

              <!-- Правая колонка -->
              <div class="col-6">
                <q-input
                  v-model="form.phoneNumber"
                  label="Номер телефона"
                  outlined
                  mask="+### ## #######"
                  placeholder="+998 90 1234567"
                  class="q-mb-md"
                  :rules="[val => !!val || 'Поле обязательно для заполнения']"
                />
                <q-input
                  v-model="form.email"
                  label="Email"
                  outlined
                  class="q-mb-md"
                  type="email"
                  :rules="[
                   val => !!val || 'Поле обязательно для заполнения',
                   val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Введите корректный email'
                   ]"
                />
                <q-select
                  v-model="form.disabilityStatus"
                  label="Инвалидность"
                  :options="[
              { label: 'Нет', value: 'Нет' },
              { label: 'ДЦП', value: 'ДЦП' },
              { label: 'Синдром дауна', value: 'Синдром дауна' },
              { label: 'Церебральный паралич', value: 'Церебральный паралич' },
              { label: 'Аутизм', value: 'Аутизм' },
              { label: 'Глухота', value: 'Глухота' },
              { label: 'Потеря зрения', value: 'Потеря зрения' }]"
                  outlined
                  class="q-mb-md"
                  :rules="[val => !!val || 'Поле обязательно для заполнения']"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="q-pr-lg q-pb-lg">
          <q-btn size="1rem" outline label="Закрыть" color="red" @click="closeDialog" class="text-bold"/>
          <q-btn size="1rem" label="Добавить" color="primary" @click="addPatient" outline class="text-bold"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>

</style>
