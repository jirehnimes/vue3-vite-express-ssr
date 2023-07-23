/**
 * Reference: https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server
 */

import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import express, { type NextFunction, type Request, type Response } from 'express';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const ROOT_DIR = path.resolve(__dirname, '../..');
const CONTROLLERS_DIR = path.resolve(__dirname, 'controllers');

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  app.use(vite.middlewares);

  /**
   * Creating own API route middleware.
   */

  const apiRouter = express.Router();
  apiRouter.use((_, response: Response, next: NextFunction) => {
    response.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
      // Setting generic response content type to JSON.
      'Content-Type': 'application/json; charset=utf-8',
    });
    next();
  });

  await fs.readdirSync(CONTROLLERS_DIR).forEach(async (controllerFile: string) => {
    const routePath = controllerFile.replace('.controller.ts', '');
    const controller = await import(`${CONTROLLERS_DIR}/${controllerFile}`);
    apiRouter.use(`/${routePath}`, controller.default(apiRouter));

    // Handling unknown routes not existing in the controllers.
    apiRouter.use('*', (_, response: Response) => response.status(404).send('API route not found'));
  });

  // Root API route for health check.
  apiRouter.get('', (_, response: Response) => response.send('API Default'));

  // All api routes will be prefixed with "/api".
  app.use('/api', apiRouter);

  /**
   * End of API route middleware.
   */

  app.use('*', async (request: Request, response: Response, next: NextFunction) => {
    const url = request.originalUrl;

    try {
      // 1. Read index.html depending on app environment.
      //    Reference: https://vitejs.dev/guide/ssr.html#building-for-production
      const templatePath =
        process.env.APP_ENVIRONMENT === 'production'
          ? path.resolve(ROOT_DIR, 'dist/client/index.html')
          : path.resolve(ROOT_DIR, 'index.html');
      let template = fs.readFileSync(templatePath, 'utf-8');

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      //    and also applies HTML transforms from Vite plugins, e.g. global
      //    preambles from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const entryServerPath =
        process.env.APP_ENVIRONMENT === 'production' ? '/dist/server/entry-server.mjs' : '/src/entry-server.ts';
      const { render } = await vite.ssrLoadModule(entryServerPath);

      // 4. render the app HTML. This assumes entry-server.js's exported
      //     `render` function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url);

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // 6. Send the rendered HTML back.
      response.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(process.env.APP_SERVER_PORT || 3000);
}

createServer();
