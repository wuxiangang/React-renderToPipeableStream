import { Suspense, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import SsrConnect from "@/components/SsrConnect"
import SuspenseChild from './suspense'
// import SuspenseChild2 from './suspense2'
import { ReactElement } from "react"

function Name({ data }: SSrProps<typeof Name.dataLoader>): ReactElement {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>My name is React!
        <NavLink to="/">跳转首页{count}</NavLink>
      </div>
      <button onClick={() => setCount((count) => count+1)}>Count++</button>
      {
        data?.list.map((item, i) => {
          return <a key={i}>{i}</a>
        })
      }
      <Outlet />
      <Suspense fallback={<p>Loading.......</p>}>
        <SuspenseChild />
      </Suspense>
    </>
  )
}


// srr data
Name.dataLoader = async (): Promise<{ list: string[] }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: new Array(10).fill('')
      })
    }, 200)
  })
}

export default SsrConnect(Name)
