/// <reference types="vite/client" />
export declare global {
    interface Window extends Window { 
        $RefreshReg$: () => void,
        $RefreshSig$: () => (type) => type,
        __vite_plugin_react_preamble_installed__: boolean
        isNode: boolean
        __INITIAL_DATA__: any
    }

    type ReturnPromiseType<T> = T extends (data: any) => Promise<infer R> ? R : any

    // typeof globalThis {
    //     __INITIAL_DATA__: any
    // }
}