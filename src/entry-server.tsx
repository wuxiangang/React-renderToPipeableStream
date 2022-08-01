import React from "react";
import ReactDOMServer from "react-dom/server";
import { matchRoutes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import type { Response }  from 'express'
import { DataProvider } from "./provider/data";
import routes from "./router";
import Html from './Html'
import App from "./App";
import "./index.css";

function dataLoader(url: string) {
  const _routes = matchRoutes(routes, url);
  const keys: string[] = []
  const top = _routes?.[0].route.path
  const all = _routes?.
    filter(({ route: { element } }) => !!(element as ElementLoader)?.type?.dataLoader)
    .map(({ route: { element, path } }) => {
      const { type } = element as ElementLoader;
      const { dataLoader } = type
      keys.push(path!);
      return dataLoader?.()
    })
  return { keys, fetch: Promise.all(all || []), top }
}

export async function render(url: string, res: Response) {
  const { fetch, keys, top } =  dataLoader(url)
  const data: Record<string, any> = { top };
  (await fetch).forEach((res, i) => {
    data[keys[i]] = res
  });

  let didError = false
  const stream = ReactDOMServer.renderToPipeableStream(
    <React.StrictMode>
      <StaticRouter location={url}>
        <DataProvider data={data}>
          <Html>
            <App />
          </Html>
        </DataProvider>
      </StaticRouter>,
    </React.StrictMode>,
    {
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        stream.pipe(res);
      },
      onShellError(error) {
        // Something errored before we could complete the shell so we emit an alternative shell.
        res.statusCode = 500;
        res.send(
          '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
        );
      },
      onAllReady() {
        // If you don't want streaming, use this instead of onShellReady.
        // This will fire after the entire page content is ready.
        // You can use this for crawlers or static generation.
  
        // res.statusCode = didError ? 500 : 200;
        // res.setHeader('Content-type', 'text/html');
        // stream.pipe(res);
      },
      onError(err) {
        didError = true;
        console.error(err);
      },
    }
  );
}