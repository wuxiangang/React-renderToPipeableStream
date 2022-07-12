
import type { Request, Response }  from 'express'
import { resolve } from 'path'
import * as express from 'express'
import { createServer } from 'vite'

async function _createServer(isProd = process.env.NODE_ENV === 'production') {

  const app = express()

  const requestHandler = express.static(resolve("dist/client/assets"));
  app.use(requestHandler);
  app.use("/assets", requestHandler);

  const vite = await createServer({
    server: { middlewareMode: 'ssr' }
  })

  app.use(vite.middlewares)

  app.use('*', async (req: Request, res: Response) => {
    const url = req.originalUrl

    try {

      let render
      if (!isProd) {
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        render = require("./server/entry-server.js").render;
      }

      render(url, res)
      
    } catch (e: any) {
        // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
        vite.ssrFixStacktrace(e)
        console.error(e)
        res.status(500).end(e.message)
    }
  })

  return { app }
}

_createServer().then(({ app }) => {
  const port = process.env.PORT || 3008;
  app.listen(Number(port), "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
});