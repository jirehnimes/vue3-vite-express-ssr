import type { Request } from 'express';
import { describe, expect, test } from 'vitest';

import type { FormType } from '@/types/form.type';

import FormService from './form.service';

const INVALID_ID_MESSAGE = 'Invalid form ID';

const sampleForm: FormType = {
  first_name: 'First name',
  last_name: 'Last name',
  email: 'sample@gmail.com',
  password: 'password',
};

describe('FormService', () => {
  test('findAll is successful', async () => {
    const formService = new FormService();
    const response = await formService.findAll();

    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toEqual(true);
  });

  test('find is successful', async () => {
    const formService = new FormService();
    const response = await formService.find(1);

    expect(response).toBeTruthy();
    expect(Object.keys(sampleForm)).toEqual(Object.keys(response));
  });

  test('find is unsuccessful where ID is invalid', async () => {
    const formService = new FormService();

    await expect(() => formService.find(undefined as any)).rejects.toThrowError(INVALID_ID_MESSAGE);
    await expect(() => formService.find(NaN as any)).rejects.toThrowError(INVALID_ID_MESSAGE);
  });

  test('create is successful', async () => {
    const formService = new FormService();
    const response = await formService.create(sampleForm);

    expect(response).toBeTruthy();
    expect(response).toEqual(sampleForm);
  });

  test('update is successful', async () => {
    const formService = new FormService();
    const response = await formService.update(1, sampleForm);

    expect(response).toBeTruthy();
    expect(response).toEqual(sampleForm);
  });

  test('update is unsuccessful where ID is invalid', async () => {
    const formService = new FormService();

    await expect(() => formService.update(undefined as any, sampleForm)).rejects.toThrowError(INVALID_ID_MESSAGE);
    await expect(() => formService.update(NaN as any, sampleForm)).rejects.toThrowError(INVALID_ID_MESSAGE);
  });

  test('destroy is successful', async () => {
    const formService = new FormService();
    const response = await formService.destroy(1);

    expect(response).toEqual({ id: 1, status: true });
  });

  test('destroy is unsuccessful where ID is invalid', async () => {
    const formService = new FormService();

    await expect(() => formService.destroy(undefined as any)).rejects.toThrowError(INVALID_ID_MESSAGE);
    await expect(() => formService.destroy(NaN as any)).rejects.toThrowError(INVALID_ID_MESSAGE);
  });
});
