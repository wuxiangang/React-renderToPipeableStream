import { createContext, useState, useEffect, useContext, ReactNode, useId, ReactElement } from "react";

type Data = unknown | null

export const DataContext = createContext<any>(null);

export function DataProvider({children, data}: { children: ReactNode, data: Data }) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData(_ReactElement: any) {
    const _data = useContext(DataContext)
    console.log('_data:', _data)

    return _data?.[_ReactElement.id]
}