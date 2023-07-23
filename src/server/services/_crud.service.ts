import type { FormType } from '@/types/form.type';

export default abstract class CRUDService {
  abstract findAll(): any;

  abstract find(id: number): any;

  abstract create(form: FormType): any;

  abstract update(id: number, form: FormType): any;

  abstract destroy(id: number): any;
}
