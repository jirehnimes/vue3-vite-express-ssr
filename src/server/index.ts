/**
 * Reference: https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server
 */

import fs from 'fs';
import path from 'path';

// import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';

dotenv.config();

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

  app.use('*', async (request: Request, response: Response, next: NextFunction) => {
    const url = request.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      //    and also applies HTML transforms from Vite plugins, e.g. global
      //    preambles from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { render } = await vite.ssrLoadModule('/src/app-server.ts');

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

  app.listen(process.env.APP_SERVER_PORT);
}

createServer();
