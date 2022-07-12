import { createContext, useState, useEffect, useContext, ReactNode, useId, ReactElement } from "react";

type Data = unknown | null

export const DataContext = createContext<any>(null);

export function DataProvider({children, data}: { children: ReactNode, data: Data }) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

type _Elememt = { id: string, dataLoader?: () => Promise<unknown> }

export function useData<T>(_ReactElement: _Elememt) {
    // console.log(_ReactElement)
    if (!_ReactElement.id) _ReactElement.id = useId()
    console.log(_ReactElement.id)
    const _data = useContext(DataContext)
    const [data, setData] = useState<T>(_data?.[_ReactElement.id])

    useEffect(() =>{
        if (!data) {
            _ReactElement?.dataLoader?.().then((res) => {
                setData(res)
            })
        }
    }, [])

    return {
        data
    }
}