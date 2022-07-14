/// <reference types="vite/client" />
export declare global {
    interface Window extends Window { 
        $RefreshReg$: () => void,
        $RefreshSig$: () => (type) => type,
        __vite_plugin_react_preamble_installed__: boolean
        isNode: boolean
        __INITIAL_DATA__: any
    }

    type ReturnPromiseType<T> = T extends (...args) => Promise<infer R> ? R : any

    type ElementLoader = ReactNode & {type: { dataLoader: () => Promise<unknown>, id: string }}
    interface SSrProps<T> {
        data?: ReturnPromiseType<T>,
        loading?: boolean
    }

    type Fn = (...args) => void
}