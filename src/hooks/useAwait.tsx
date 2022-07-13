import { useEffect, useId } from "react";

type Fetcher<T> = {
    (value?: any): T extends Promise<any> ? T : Promise<any>
    uniqueId?: string
}
 
const enum Status {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
}

const isNode = typeof window == 'undefined'
let maps: Record<string, any> = {};
  
  export default function useAwait<T>(p: Fetcher<T>) {
    const id = useId()
    p.uniqueId = p.uniqueId || id;
    const key = p.uniqueId;
    const { status, result } = maps[key] || { status: Status.PENDING };
    maps[key] = { status, result };

  
    const read = (param?: any): ReturnPromiseType<() => T> => {
      const { status } = maps[key];
  
      const isPending = status === Status.PENDING;
  
      if (!isPending) {
        const { result } = maps[key]
        isNode && delete maps[key]
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
      return () => {
        // delete maps[key];
      };
    }, []);
  
    const clear = () => {
      maps = {};
    };
  
    return {
      read,
      clear,
    };
  }