import SsrConnect from "@/components/SsrConnect"
import { ReactElement } from "react"

function Name({ data }: SSrProps<typeof Name.dataLoader>): ReactElement {
  return (
    <>
      <h1>SSR Child Component：</h1>
      <div>
        <p>来自服务端数据：</p>
        <p>歌手：{ data?.name }</p>
        <p>专辑：{ data?.card }</p>
      </div>
    </>
  )
}


// srr data
Name.dataLoader = async (): Promise<{ name: string, card: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: '周杰伦',
        card: '半兽人'
      })
    }, 200)
  })
}

export default SsrConnect(Name)
