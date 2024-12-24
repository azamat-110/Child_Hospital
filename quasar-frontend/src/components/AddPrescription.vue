<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:model-value"]);
const internalModal = ref(props.modelValue);
const formRef = ref(null);
const form = ref({
  fullName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
});

const resetForm = () => {
  form.value = {
    email: "",
  };
};

watch(
  () => props.modelValue,
  (newVal) => {
    internalModal.value = newVal;
  }
);

watch(
  () => internalModal.value,
  (newVal) => {
    emit("update:model-value", newVal);
  }
);

const addPrescription = () => {};
</script>

<template>
  <div class="dialog">
    <q-dialog
      v-model="internalModal"
      backdrop-filter="brightness(60%)"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h5 text-bold text-center text-primary">
            Add prescription
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-px-lg" ref="formRef" style="min-width: 472px">
            <div class="row q-col-gutter-md">
              <!-- Левая колонка -->
              <div class="col-6">
                <q-select
                  v-model="form.gender"
                  label="Доктор"
                  :options="[
                    { label: 'Мужской', value: 'Мужской' },
                    { label: 'Женский', value: 'Женский' },
                  ]"
                  outlined
                  class="q-mb-md"
                  :rules="[(val) => !!val || 'Поле обязательно для заполнения']"
                />
                <q-select
                  v-model="form.gender"
                  label="Пациент"
                  :options="[
                    { label: 'Мужской', value: 'Мужской' },
                    { label: 'Женский', value: 'Женский' },
                  ]"
                  outlined
                  class="q-mb-md"
                  :rules="[(val) => !!val || 'Поле обязательно для заполнения']"
                />

                <q-input
                  v-model="form.fullName"
                  label="Полное имя"
                  outlined
                  class="q-mb-md"
                  :rules="[(val) => !!val || 'Поле обязательно для заполнения']"
                />


              </div>

              <!-- Правая колонка -->
              <div class="col-6">
                <q-input
                  v-model="form.dateOfBirth"
                  label="Дата"
                  outlined
                  mask="####-##-##"
                  placeholder="ГГГГ-ММ-ДД"
                  class="q-mb-md"
                  :rules="[
                    (val) => !!val || 'Поле обязательно для заполнения',
                    (val) => {
                      const year = parseInt(val.split('-')[0], 10);
                      return (
                        (year >= 1990 && year <= 2025) ||
                        'Год должен быть между 1990 и 2025'
                      );
                    },
                  ]"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="red" v-close-popup />
          <q-btn
            outline
            label="Confirm"
            color="primary"
            class="q-ma-md"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
