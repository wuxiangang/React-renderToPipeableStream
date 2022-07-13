import { ReactElement, useState } from "react"
import useAwait from '../../hooks/useAwait'

const dataLoader = async (): Promise<{ content: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: 'suspense will wait this ajax2'
      })
    }, 1000)
  })
}


function SuspenseChilds(): ReactElement {
  const [count, setCount] = useState(0)

  const data = useAwait(dataLoader).read()

  return (
    <>
      <h1>Suspense Child Component：{count}</h1>
      <button onClick={setCount.bind(null, 2)}>Count++</button>
      <div>
        <p>{data?.content}</p>
      </div>
    </>
  )
}

export default SuspenseChilds
