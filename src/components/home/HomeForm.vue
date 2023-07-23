import FormInputEmail from '../FormInputEmail/index'; import FormInputPassword from '../FormInputPassword copy/index';
<template>
  <form
    class="form"
    @submit.prevent="() => handleSubmit(form)"
  >
    <FormInput
      label="First Name"
      v-model="form.first_name.$model"
      :message="formatFormInputErrors(form.first_name.$errors)"
    />

    <FormInput
      label="Last Name"
      v-model="form.last_name.$model"
      :message="formatFormInputErrors(form.last_name.$errors)"
    />

    <FormInputEmail v-model="form.email.$model" />

    <FormInputPassword v-model="form.password.$model" />

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
import { onMounted, ref } from 'vue';

type FormType = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  password: string | null;
};

const FORM_INITIAL: FormType = {
  first_name: null,
  last_name: null,
  email: null,
  password: null,
};

const formState = ref<FormType>({ ...FORM_INITIAL });

const formRules: Record<keyof FormType, any> = {
  first_name: { required },
  last_name: { required },
  email: { required },
  password: { required, email },
};

const form = useVuelidate<FormType>(formRules, formState);

const formatFormInputErrors = (errors: any[]): string[] => {
  return errors.map((_error: any) => _error.$message);
};

const handleReset = () => {
  formState.value = { ...FORM_INITIAL };
  form.value.$reset();
};

const handleSubmit = async (_form: Validation) => {
  const isFormValid = await _form.$validate();

  console.log('HANDLE SUBMIT', isFormValid);

  if (isFormValid === false) {
    console.error('FORM FAILED');

    return;
  }

  console.log('PROCEED WITH FORM');
};

onMounted(() => {
  handleReset();
});
</script>

<style scoped lang="sass">
.button-group
  display: flex
  flex-direction: column
  gap: 12px
</style>
