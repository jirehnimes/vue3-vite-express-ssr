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
    />

    <FormInputPassword
      v-model="form.password.$model"
      :message="formatFormInputErrors(form.password.$errors)"
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

const handleReset = () => {
  notificationDOM.value?.hide();
  notificationMessage.value = '';
  formState.value = { ...FORM_INITIAL };
  form.value.$reset();
};

const handleSubmitRequest = async (_form: FormType) => {
  try {
    const { data } = await createForm(_form);
    console.log('SUCCESS FORM', data);

    notificationDOM.value?.show('success');
    notificationMessage.value = 'Form submitted successfully!';
  } catch (e: any) {
    // Catches error thrown by API.
    notificationDOM.value?.show('error');
    notificationMessage.value = 'Something went wrong, please try again.';
  }
};

const handleSubmit = async (_form: Validation) => {
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
