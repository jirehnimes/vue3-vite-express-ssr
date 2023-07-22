import { type Router } from 'express';

const form = (router: any) => {
  router.get('', (_: any, response: any) => response.send('FORM GET'));
  router.post('', (_: any, response: any) => response.send('FORM POST'));

  return router;
};

export default form;
