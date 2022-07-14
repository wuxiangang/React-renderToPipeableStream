import SsrConnect from "@/components/SsrConnect"
import { ReactElement } from "react"
import avatar from '@/assets/music.jpeg'

function Info({ data }: SSrProps<typeof Info.dataLoader>): ReactElement {
  return (
    <>
      <h1>SSR Data：</h1>
      <div className="pl-16 u-music-info">
        <div>
          <p>歌手：{ data?.name }</p>
          <p>专辑：{ data?.card }</p>
        </div>
        <img src={ data?.avatar } alt={ data?.name } />
      </div>
    </>
  )
}


// srr data
Info.dataLoader = async (): Promise<{ name: string, card: string, avatar: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'Backstreet Boys',
        card: 'I Want It That Way',
        avatar
      })
    }, 200)
  })
}

export default SsrConnect(Info)
