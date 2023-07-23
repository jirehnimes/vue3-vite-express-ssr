import { type FormType } from '@/types/form.type';

import { httpPost } from './api';

const BASE_PATH = '/form';

export const createForm = (form: FormType) => httpPost(BASE_PATH, form);
