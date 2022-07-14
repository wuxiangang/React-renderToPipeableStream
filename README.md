#### useHydrate
配合Suspense进行水合。
```javascript
import useHydrate from '@/hooks/useHydrate'

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
  
  // if component re-render, data will not re-fetch
  const data = useHydrate(dataLoader).read()
  
  // if component re-render, data will re-fetch like this
  // const data = useHydrate(dataLoader, { flush: true }).read()

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
```