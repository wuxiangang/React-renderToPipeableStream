import { Suspense } from "react"
import { NavLink, Outlet } from "react-router-dom"
import SsrConnect from "@/components/SsrConnect"
import Spinner from "@/components/Spinner"
import HydrateWords from './words'
import { ReactElement } from "react"

function Music({ data }: SSrProps<typeof Music.dataLoader>): ReactElement {
  return (
    <div className="u-music">
      <h1>
        <NavLink to="/">&lt;</NavLink>
        <span className="ml-32">歌单</span>
      </h1>
      <div className="pl-16">
        <span>关键词：</span>
        {
          data?.list.map((item, i) => {
            return <a className="u-tag" key={i}>{item}</a>
          })
      } 
      </div>
      <Outlet />
      <h1>Hydrate Words：</h1>
      <Suspense fallback={<Spinner content="Hydrating Words......." />}>
        <HydrateWords />
      </Suspense>
    </div>
  )
}


// srr data
Music.dataLoader = async (): Promise<{ list: string[] }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: ['Backstreet Boys', 'Jay ZHou', 'Justin Biber']
      })
    }, 200)
  })
}

export default SsrConnect(Music)
