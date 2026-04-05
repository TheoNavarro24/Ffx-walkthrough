import { Link } from 'react-router-dom'
import ProgressDashboard from '../components/Layout/ProgressDashboard'
import { useLastVisited, useNextIncomplete } from '../hooks/useNavigation'

export default function LandingPage() {
  const { lastVisited } = useLastVisited()
  const nextIncomplete = useNextIncomplete()

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="ffx-panel p-8 text-center">
        <h1 className="ffx-header text-3xl mb-2">Spira Guide</h1>
        <p className="text-sm opacity-75">FFX HD Remaster Companion</p>
      </div>

      <ProgressDashboard />

      <div className="flex gap-4">
        <Link to={`/chapter/${lastVisited}`} className="ffx-button px-6 py-3">
          Continue
        </Link>
        <Link to={`/chapter/${nextIncomplete}`} className="ffx-button px-6 py-3">
          Next Incomplete
        </Link>
      </div>

      <div className="flex gap-4">
        <Link to="/collectibles" className="ffx-button px-4 py-2 text-sm">
          Collectibles Hub
        </Link>
        <Link to="/settings" className="ffx-button px-4 py-2 text-sm">
          Settings
        </Link>
      </div>
    </div>
  )
}
