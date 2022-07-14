import { useEffect, useId } from "react";

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

let StrictLoading = false
  
  export default function useHydrate<T>(p: Fetcher<T>, options?: OptionProps) {
    const id = useId()
    p.uniqueId = p.uniqueId || id;
    const key = p.uniqueId
    const { status, result } = maps[key] || { status: Status.PENDING };
    maps[key] = { status, result };
  
    const read = (param?: any): ReturnPromiseType<() => T> => {
      const { status } = maps[key];
  
      const isPending = status === Status.PENDING;

      if (!isPending) {
        const { result } = maps[key];
        (isNode || options?.flush) && delete maps[key]
        return result;
      } 

        const task = p(param);
        task
          .then((res) => {
            if (!maps[key]) return;
            maps[key].result = res;
          }).finally(() => {
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
  