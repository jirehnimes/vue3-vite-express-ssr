import type { Request } from 'express';

import type { FormType } from '@/types/form.type';

import CRUDService from './_crud.service';

/**
 * FormService
 * A sample CRUD service class.
 */
export default class FormService extends CRUDService {
  /**
   * Find all forms.
   * @returns Promise<FormType[]> List of forms.
   */
  async findAll(): Promise<FormType[]> {
    return [];
  }

  /**
   * Find a specific form by ID.
   * @param id number Form ID.
   * @returns Promise<FormType> Form data.
   */
  async find(id: number): Promise<FormType> {
    this.validateFormID(id);

    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
  }

  /**
   * Create a form record.
   * @param form FormType Form request data.
   * @returns Promise<FormType> Form data.
   */
  async create(form: FormType): Promise<FormType> {
    return form;
  }

  /**
   * Update a form record by ID.
   * @param id   number   Form ID.
   * @param form FormType Form request data.
   * @returns Promise<FormType> Form data.
   */
  async update(id: number, form: FormType): Promise<FormType> {
    this.validateFormID(id);

    return form;
  }

  /**
   * Delete a form record by ID.
   * @param id number Form ID.
   * @returns Promise<{ id: number; status: boolean }>
   */
  async destroy(id: number): Promise<{ id: number; status: boolean }> {
    this.validateFormID(id);

    return {
      id,
      status: true,
    };
  }

  /**
   * Validates form ID.
   * @param id any Form ID.
   */
  private validateFormID(id: any) {
    if (!!id === false) throw new Error('Invalid form ID');
  }
}
