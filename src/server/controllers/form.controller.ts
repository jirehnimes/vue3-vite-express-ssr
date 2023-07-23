import { type Request, type Response, type Router } from 'express';

import FormService from '../services/form.service';

/**
 * Creating new instance of FormService on each request.
 * In NestJS, it is called request-scoped injection.
 */
const form = (basePath: string, router: Router) => {
  router.get(basePath, (_: Request, response: Response) => response.send(new FormService().findAll()));

  router.post(basePath, (request: Request, response: Response) => response.send(new FormService().create(request)));
};

export default form;
