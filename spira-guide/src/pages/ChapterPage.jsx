import { useParams } from 'react-router-dom'

export default function ChapterPage() {
  const { slug } = useParams()
  return <h1 className="ffx-header">{slug}</h1>
}
