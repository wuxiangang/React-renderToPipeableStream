import { ReactNode, ReactElement } from 'react'
import serialize from 'serialize-javascript'
import { entry, assets } from '../config'

const Html = ({ children, ssrData }: { children?: ReactNode, ssrData?: any}): ReactElement => {
  const isDev = !!import.meta.env.DEV;
  // const data = serialize( ssrData, { isJSON: true }) //|| window.__INITIAL_DATA__
  // console.log(serialize( data, { isJSON: true }))
  // console.log('data:', data)
  return <>
    <head>
      {
        isDev ? <>
          <script type="module" src="/@vite/client"></script>
          <script type="module" src="/src/client"></script>
        </> : <>
          <link rel="stylesheet" href={`/${assets}/${entry}.css`} />
          <script type="module" src={`/${assets}/${entry}.js`}></script>
        </>
      }
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite App</title>
    </head>
    <body>
      <div id="root">{children}</div>
      {
        isDev ? <>
          <script type="module" src="/src/entry-client.tsx"></script>
        </> : null
      }
       <script  dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_DATA__ = ${JSON.stringify(ssrData)}`
          }}>
        </script>
    </body>
  </>
}

export default Html
