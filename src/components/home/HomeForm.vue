import FormInputEmail from '../FormInputEmail/index'; import FormInputPassword from '../FormInputPassword copy/index';
<template>
  <Notification ref="notificationDOM">
    {{ notificationMessage }}
  </Notification>

  <form
    class="form"
    @submit.prevent="() => handleSubmit(form)"
  >
    <FormInput
      label="First Name"
      placeholder="Enter your first name"
      v-model="form.first_name.$model"
      :message="formatFormInputErrors(form.first_name.$errors)"
      :is-error="form.first_name.$errors.length > 0"
    />

    <FormInput
      label="Last Name"
      placeholder="Enter your last name"
      v-model="form.last_name.$model"
      :message="formatFormInputErrors(form.last_name.$errors)"
      :is-error="form.last_name.$errors.length > 0"
    />

    <FormInputEmail
      v-model="form.email.$model"
      :message="formatFormInputErrors(form.email.$errors)"
      :is-error="form.email.$errors.length > 0"
    />

    <FormInputPassword
      v-model="form.password.$model"
      :message="formatFormInputErrors(form.password.$errors)"
      :is-error="form.password.$errors.length > 0"
    />

    <div class="button-group">
      <Button
        class="is-fullwidth is-primary"
        type="submit"
      >
        Submit
      </Button>

      <Button
        class="is-fullwidth is-primary is-outlined"
        @click="handleReset"
      >
        Reset
      </Button>
    </div>

    <div
      v-if="resultDisplay"
      class="card mt-6"
    >
      <div class="card-content">
        <h3 class="title is-5">API Result:</h3>

        <p>First Name: {{ resultState.first_name }}</p>
        <p>Last Name: {{ resultState.last_name }}</p>
        <p>Email: {{ resultState.email }}</p>
        <p>Password: {{ resultState.password }}</p>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate, type Validation } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { onMounted, onUpdated, ref, toRaw } from 'vue';

import { createForm } from '@/api/form.api';
import { type FormType } from '@/types/form.type';

const FORM_INITIAL: FormType = {
  first_name: null,
  last_name: null,
  email: null,
  password: null,
};

const notificationDOM = ref<any>(undefined);
const notificationMessage = ref<string>('');
const formState = ref<FormType>({ ...FORM_INITIAL });
const resultState = ref<FormType>({ ...FORM_INITIAL });
const resultDisplay = ref<boolean>(false);

const formRules: Record<keyof FormType, any> = {
  first_name: { required },
  last_name: { required },
  email: { required, email },
  password: { required },
};

const form = useVuelidate<FormType>(formRules, formState);

const formatFormInputErrors = (errors: any[]): string[] => {
  return errors.map((_error: any) => _error.$message);
};

const resetNotification = () => {
  notificationDOM.value?.hide();
  notificationMessage.value = '';
};

const resetResult = () => {
  resultState.value = { ...FORM_INITIAL };
  resultDisplay.value = false;
};

const handleReset = () => {
  resetNotification();
  resetResult();

  formState.value = { ...FORM_INITIAL };
  form.value.$reset();
};

const handleSubmitRequest = async (_form: FormType) => {
  try {
    const { data } = await createForm(_form);

    resultState.value = data;
    resultDisplay.value = true;

    notificationDOM.value?.show('success');
    notificationMessage.value = 'Form submitted successfully!';
  } catch (e: any) {
    // Catches error thrown by API.
    notificationDOM.value?.show('error');
    notificationMessage.value = 'Something went wrong, please try again.';
  }
};

const handleSubmit = async (_form: Validation) => {
  resetNotification();
  resetResult();

  const isFormValid = await _form.$validate();

  if (isFormValid === false) {
    notificationDOM.value?.show('error');
    notificationMessage.value = 'Please fix all the errors in the form and try again.';

    return;
  }

  handleSubmitRequest(toRaw(formState.value));
};

onMounted(() => {
  // Resets the form when the page is mounted.
  handleReset();
});
</script>

<style scoped lang="sass">
.button-group
  margin-top: 24px

  // Flex
  display: flex
  flex-direction: column
  gap: 12px
</style>
