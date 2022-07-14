import { ReactElement, useState } from "react"
import useHydrate from '@/hooks/useHydrate'

const dataLoader = async (): Promise<{ content: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: 'Backstreet Boys (often abbreviated as BSB) are an American vocal group consisting of Nick Carter, Howie Dorough, AJ McLean, and cousins Brian Littrell and ...'
      })
    }, 1000)
  })
}

function HydrateDetail(): ReactElement {
  const data = useHydrate(dataLoader).read()

  return (
    <>
      <div className="pl-16 pb-32">
        <p>{data?.content}</p>
      </div>
    </>
  )
}

export default HydrateDetail
