import { ReactElement, Suspense } from "react"
import Spinner from "@/components/Spinner"
import useHydrate from '@/hooks/useHydrate'
import HydrateDetail from './detail'

const dataLoader = async (): Promise<{ words: string[] }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        words: [
          'Yeah-eh-heah',
          'You are my fire',
          'The one desire',
          'Believe when I say',
          '... ...',
          'That I want it that way'
        ]
      })
    }, 1000)
  })
}


function HydrateWords(): ReactElement {
  const data = useHydrate(dataLoader).read()

  return (
    <div>
      <div className="pl-16">
        {
          data?.words.map((word, i) => {
            return <p key={i}>{word}</p>
          })
        }
      </div>
      <h1>Hydrate Detail：</h1>
      <Suspense fallback={<Spinner content="Hydrating Detail......." />}>
        <HydrateDetail />
      </Suspense>
    </div>
  )
}

export default HydrateWords
