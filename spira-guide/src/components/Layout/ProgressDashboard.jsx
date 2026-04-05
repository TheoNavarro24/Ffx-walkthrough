export default function ProgressDashboard() {
  return (
    <div className="ffx-panel p-3 text-sm flex gap-4">
      <span>Story: <strong className="ffx-header">0%</strong></span>
      <span>Primers: <strong className="ffx-header">0/26</strong></span>
      <span>Celestials: <strong className="ffx-header">0/7</strong></span>
    </div>
  )
}
