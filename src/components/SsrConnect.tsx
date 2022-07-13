import { ReactElement, useEffect, useState } from "react";
import { useData } from '../provider/data'
interface ComponentProps<T> {
  (value: any): ReactElement;
  dataLoader?: T extends (value?: any) => Promise<any> ? T : (value?: any) => Promise<any>;
  id?: string;
}

function SsrConnect<T>(Component: ComponentProps<T>) {
  Child.dataLoader = Component.dataLoader
  function Child(): ReactElement {
    const _data = useData(Child)
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
