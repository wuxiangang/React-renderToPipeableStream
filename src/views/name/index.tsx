import { NavLink, Outlet } from "react-router-dom"
import { useData } from "@/provider/data"

function Name() {
  const { data } = useData(Name as any)

  return (
    <>
      <div>My name is React!
        <NavLink to="/">跳转首页<Outlet /></NavLink>
      </div>
      {
        data?.list.map((item, i) => {
          return <a key={i}>{i}</a>
        })
      }
    </>
  )
}


// srr data
Name.dataLoader = async (): Promise<{ list: string[] }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: new Array(10).fill('')
      })
    }, 200)
  })
}

export default Name
