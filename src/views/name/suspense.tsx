import { ReactElement, useState, Suspense } from "react"
import useAwait from '../../hooks/useAwait'
import SuspenseChild2 from './suspense2'

const dataLoader = async (): Promise<{ content: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: 'suspense will wait this ajax'
      })
    }, 1000)
  })
}


function SuspenseChild(): ReactElement {
  const [count, setCount] = useState(0)

  const data = useAwait(dataLoader).read()

  return (
    <div>
      <h1>Suspense Child Component11：{count}</h1>
      <button onClick={setCount.bind(null, 2)}>Count++</button>
      <div>
        <p>{data?.content}</p>
      </div>
      <Suspense fallback={<p>SuspenseChild2 Loading.......</p>}>
        <SuspenseChild2 />
      </Suspense>
    </div>
  )
}

export default SuspenseChild
