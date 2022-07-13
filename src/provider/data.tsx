import { createContext, useContext, ReactNode } from "react";
import type { RouteObject } from "react-router-dom";
import routes from '@/router'
type Data = unknown | null

export const DataContext = createContext<any>(null);

export function DataProvider({children, data}: { children: ReactNode, data: Data }) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData(_ReactElement: any) {
    const _data = useContext(DataContext)
    const [topRoute] = routes.filter(({ path }) => path === _data.top )

    if (!topRoute) return null
    function flatRoutes(route: RouteObject, arr: RouteObject[]) {
        arr = [...arr, route]
        if (route.children && route.children.length) {
            route.children.forEach(child => {
                arr = flatRoutes(child, arr)
            })
        }
        return arr
    }

    const arr = flatRoutes(topRoute, [])

    const [currentRoute] = arr.filter(({ element }) => (element as ElementLoader).type === _ReactElement)

    return currentRoute ? _data?.[currentRoute.path!] : null
}