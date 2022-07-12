import { useState, lazy, Suspense, ReactElement } from 'react'
import { NavLink, useOutlet } from "react-router-dom"
import logo from './logo.svg'
import './index.css'

const delay = (): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(async () => {
      resolve(await import('./Article'))
    }, 10000)
  })
}

const Article = lazy(() => delay())

function Home(): ReactElement {
  const [count, setCount] = useState(0)

  console.log(useOutlet())


  return (
    <div className="App">
      <Suspense fallback={<>loading......</>}><Article /></Suspense>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <NavLink to="/name">跳转name</NavLink>
        </p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default Home
