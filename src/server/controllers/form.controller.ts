import { type Request, type Response, type Router } from 'express';

import FormService from '../services/form.service';

/**
 * Creating new instance of FormService on each request.
 * In NestJS, it is called request-scoped injection.
 */
const form = (basePath: string, router: Router) => {
  router.get(basePath, async (_: Request, response: Response) => response.send(await new FormService().findAll()));

  router.get(`${basePath}/:id`, async (request: Request, response: Response) =>
    response.send(await new FormService().find(Number(request.params?.id))),
  );

  router.post(basePath, async (request: Request, response: Response) =>
    response.send(await new FormService().create(request.body)),
  );

  router.patch(`${basePath}/:id`, async (request: Request, response: Response) =>
    response.send(await new FormService().update(Number(request.params?.id), request.body)),
  );

  router.delete(`${basePath}/:id`, async (request: Request, response: Response) =>
    response.send(await new FormService().destroy(Number(request.params?.id))),
  );
};

export default form;
