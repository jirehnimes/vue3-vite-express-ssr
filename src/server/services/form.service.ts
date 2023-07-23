import type { Request } from 'express';

import CRUDService from './_crud.service';

export default class FormService extends CRUDService {
  findAll(): any {
    return 'FORM GET';
  }

  find(id: number): any {}

  create(request: Request): any {
    const form = request.body;

    console.log('FORM REQUEST', form);

    return form;

    // throw new Error('BAD REQUEST');
  }

  update(id: number): any {}

  destroy(id: number): any {}
}
