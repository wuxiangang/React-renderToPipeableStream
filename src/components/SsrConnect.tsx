import { ReactElement, useId, useContext, useEffect, useState } from "react";
import { useData } from '../provider/data'
interface ComponentProps<T> {
  (value: any): ReactElement;
  dataLoader?: T extends (value?: any) => Promise<any> ? T : (value?: any) => Promise<any>;
  id?: string;
}

function SsrConnect<T>(Component: ComponentProps<T>) {
  Child.dataLoader = Component.dataLoader
  Child.id = 1
  function Child(): ReactElement {
    console.log('Component.id:', Component.id)
    Child.id = useId()
    const _data = useData(Child)
    console.log('----:', _data, Child.id)
    const [data, setData] = useState<ReturnPromiseType<T>>(_data)
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        if (!data) {
          setLoading(true)
          Component?.dataLoader?.()
            .then((res) => {
              setData(res)
            })
            .finally(() => {
              setLoading(false)
            })
        }
    }, [])

    return <Component loading={loading} data={data}/ >
  }

  return Child
}
export default SsrConnect
