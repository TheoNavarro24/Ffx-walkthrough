import { useState } from 'react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../utils/assetUrl'
import ProgressDashboard from '../components/Layout/ProgressDashboard'
import { useLastVisited, useNextIncomplete } from '../hooks/useNavigation'

export default function LandingPage() {
  const { lastVisited } = useLastVisited()
  const nextIncomplete = useNextIncomplete()
  const [imgHidden, setImgHidden] = useState(false)

  return (
    <div
      className="relative flex flex-col h-full min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a1840, #0a0820)' }}
    >
      {/* Cover art hero background */}
      {!imgHidden && (
        <img
          src={assetUrl('img/guide/image_0000_00.jpeg')}
          alt=""
          aria-hidden="true"
          onError={() => setImgHidden(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10,8,32,0.55)', zIndex: 1 }}
      />

      {/* Corner card — centered on small screens, corner-positioned on md+ */}
      <div
        className="relative mx-auto mt-8 md:absolute md:top-4 md:left-4 md:mx-0 md:mt-0 ffx-panel flex flex-col gap-3 p-5 w-[calc(100%-2rem)] max-w-[280px] md:w-auto md:min-w-[200px] md:max-w-[240px]"
        style={{
          background: 'rgba(10,8,32,0.82)',
          backdropFilter: 'blur(8px)',
          zIndex: 2,
        }}
      >
        <div>
          <h1
            className="ffx-header tracking-widest"
            style={{ fontSize: '24px' }}
          >
            FINAL FANTASY X
          </h1>
          <p className="text-xs opacity-50 tracking-wider mt-0.5">HD Remaster Guide</p>
        </div>

        <ProgressDashboard />

        <div className="flex flex-col gap-2 mt-1">
          <Link
            to={`/chapter/${lastVisited ?? 'zanarkand'}`}
            className="ffx-button text-center py-2 text-sm"
            style={{ color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}
          >
            {'\u25B6'} Continue
          </Link>
          <Link
            to={`/chapter/${nextIncomplete ?? 'zanarkand'}`}
            className="ffx-button text-center py-2 text-sm"
          >
            Next Incomplete
          </Link>
          <Link to="/collectibles" className="ffx-button text-center py-1.5 text-xs">
            Collectibles Hub
          </Link>
          <Link to="/superbosses" className="ffx-button text-center py-1.5 text-xs">
            Superbosses
          </Link>
          <Link to="/settings" className="ffx-button text-center py-1.5 text-xs">
            Settings
          </Link>
        </div>
      </div>
    </div>
  )
}
