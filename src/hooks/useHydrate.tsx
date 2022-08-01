import { useEffect, useId } from "react";
import { useLocation } from 'react-router-dom'

type Fetcher<T> = {
    (value?: any): T extends Promise<any> ? T : Promise<any>
    uniqueId?: string
}

type OptionProps = {
  flush: boolean
}
 
const enum Status {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
}

const isNode = typeof window == 'undefined'

let maps: Record<string, any> = {};

let routes: Record<string, string> = {};

let StrictLoading = false
  
  export default function useHydrate<T>(p: Fetcher<T>, options?: OptionProps) {
    // 观察路由是否销毁，promise有滞后性
    const routeKey = useLocation().key

    const id = useId()
    p.uniqueId = p.uniqueId || id;
    const key = p.uniqueId
    // 当前组件所在上一个路由key
    const _preKey =  routes[key] || routeKey
    // 当前路由key
    routes[key] = routeKey

    const { status, result } = maps[key] || { status: Status.PENDING };
    maps[key] = { status, result };
  
    const read = (param?: any): ReturnPromiseType<() => T> => {
      const { status } = maps[key];
  
      const isPending = status === Status.PENDING;

      if (!isPending && _preKey === routeKey) {
        const { result } = maps[key];
        (isNode || options?.flush) && delete maps[key]
        return result;
      } 

        const task = p(param);
        task
          .then((res) => {
            // 路由失活，拦截异常返回操作，清除缓存
            if (!routes[key] || _preKey !== routeKey) {
              delete maps[key]
              return
            }

            if (!maps[key]) return;
            maps[key].result = res;
          }).finally(() => {

            if (!maps[key]) return
            maps[key].status = Status.COMPLETE;
          })
    
        throw task;
    };


    useEffect(() => {
      StrictLoading = true
      return () => {
        // StrictLoading is used to prevent useEffect under StrictMode run towice
        // it will refresh suspense by component re-render
        if (import.meta.env.DEV) {
          setTimeout(() => {
            StrictLoading = false
          }, 10)
          
          if (StrictLoading) return
        }
        delete maps[key];

        // 路由失活状态，销毁
        delete routes[key]
      }
    }, []);
  
    const clear = () => {
      maps = {};
    };
  
    return {
      read,
      clear,
    };
  }
  